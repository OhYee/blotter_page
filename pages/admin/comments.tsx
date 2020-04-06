import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card, List, Comment, Tooltip, Avatar, Checkbox, Button } from 'antd';

import Container from '@/components/container';

import { Context } from '@/utils/global';
import { commentsAdmin, commentSet } from '@/utils/api';
import moment from 'moment';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import ShowNotification from '@/utils/notification';

const defaultAvatar = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';

type CommentBooleanKey = {
  [K in keyof Blotter.Comment]: Blotter.Comment[K] extends boolean ? K : never;
}[keyof Blotter.Comment];

interface AdminCommentsProps extends ComponentProps<'base'> {}

interface AdminCommentsState {
  loading: boolean;
  total: number;
  data: (Blotter.Comment & {
    reply_comment: Blotter.Comment;
    title: string;
    url: string;
  })[];
  page: number;
  size: number;
}

class AdminComments extends React.Component<AdminCommentsProps, AdminCommentsState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      total: 0,
      data: [],
      page: 1,
      size: 10,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    var r = await commentsAdmin(this.state.page, this.state.size);

    this.setState({ data: r.comments, total: r.total, loading: false });
  };

  onChange = (page: number, size?: number) => {
    if (typeof size === 'undefined') size = this.state.size;
    this.setState({ page, size }, this.getData);
  };

  checkboxChange = (e: CheckboxChangeEvent, id: string, key: CommentBooleanKey) => {
    const checked = e.target.checked;
    this.setState((state) => {
      var { data } = state;
      data.map((item) => {
        if (item.id === id) {
          item[key] = checked;
        }
        return item;
      });
      return { data };
    });
  };

  renderComment = (
    comment: Blotter.Comment & { reply_comment?: Blotter.Comment },
    notReply: boolean,
  ) => {
    const items: { key: CommentBooleanKey; value: string }[] = [
      { key: 'show', value: '显示' },
      { key: 'ad', value: '广告' },
      { key: 'recv', value: '接收提醒' },
    ];
    return (
      <Comment
        style={notReply ? {} : { borderLeft: '#ccc 5px solid', paddingLeft: 10 }}
        actions={
          notReply
            ? items.map((item) => (
                <Checkbox
                  key={item.key}
                  checked={comment[item.key]}
                  onChange={(e) => this.checkboxChange(e, comment.id, item.key)}
                >
                  {item.value}
                </Checkbox>
              ))
            : []
        }
        author={comment.email}
        avatar={<Avatar src={comment.avatar ? comment.avatar : defaultAvatar} />}
        datetime={
          <Tooltip title={moment(comment.time).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(comment.time).fromNow()}</span>
          </Tooltip>
        }
        content={
          <div>
            {notReply && comment.reply_comment.id !== '000000000000000000000000'
              ? this.renderComment(comment.reply_comment, false)
              : null}
            <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
          </div>
        }
      />
    );
  };

  render() {
    var pagination = {
      showSizeChanger: true,
      current: this.state.page,
      pageSize: this.state.size,
      total: this.state.total,
      onChange: this.onChange,
      onShowSizeChange: this.onChange,
    };
    return (
      <Container lg={20} md={20} sm={24} xs={24}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`评论列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <List
            className="comment-list"
            header={`共 ${this.state.total} 条评论`}
            itemLayout="horizontal"
            loading={this.state.loading}
            dataSource={this.state.data}
            renderItem={(comment, idx) => (
              <List.Item key={comment.id}>
                {this.renderComment(comment, true)}
                <div style={{ textAlign: 'right' }}>
                  <p>
                    <a href={comment.url} target="_blank">
                      《{comment.title !== '' ? comment.title : '评论区'}》
                    </a>
                  </p>
                  <p>
                    <Button
                      onClick={async (e) => {
                        const r = await commentSet(
                          comment.id,
                          comment.ad,
                          comment.recv,
                          comment.show,
                        );
                        ShowNotification(r);
                      }}
                    >
                      保存
                    </Button>
                  </p>
                </div>
              </List.Item>
            )}
            pagination={pagination}
          />
        </Card>
      </Container>
    );
  }
}

export default AdminComments;
