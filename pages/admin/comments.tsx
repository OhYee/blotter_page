import React from 'react';

import Head from 'next/head';

import Card from '@/components/card';
import Popover, { Tooltip } from '@/components/popover';
import Avatar from '@/components/avatar';
import { CheckBox } from '@/components/input';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import { Flex } from '@/components/container';
import Loading from '@/components/loading';

import { Context } from '@/utils/global';
import { commentDelete, commentsAdmin, commentSet, commentsAvatar } from '@/utils/api';
import moment from '@/utils/moment';
import ShowNotification from '@/utils/notification';

import { concat, ComponentProps } from '@/utils/component';

import textStyles from '@/styles/text.module.scss';

const defaultAvatar = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';

type CommentBooleanKey = {
  [K in keyof Blotter.Comment]: Blotter.Comment[K] extends boolean ? K : never;
}[keyof Blotter.Comment];

interface AdminCommentsProps extends React.ComponentProps<'base'> {}

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

function Comment(
  props: ComponentProps<{ comment: Blotter.Comment & { reply_comment?: Blotter.Comment } }>,
) {
  const { comment, ...restProps } = props;
  const time = moment(comment.time);
  return (
    <Flex {...restProps} subAxis="flex-start" wrap={false}>
      <Flex.Item style={{ flex: '0 0 2em', display: 'flex', justifyContent: 'center' }}>
        <Avatar
          src={comment.avatar ? comment.avatar : defaultAvatar}
          style={{ width: '1.5em', height: '1.5em' }}
        />
      </Flex.Item>
      <Flex.Item style={{ flex: '1 1 auto' }}>
        <Flex mainSize="small" direction="TB" fullWidth>
          <Flex mainAxis="flex-start">
            {comment.email}
            <Tooltip title={time.format('YYYY-MM-DD HH:mm:ss')}>
              <span className={concat(textStyles.secondary, textStyles.em75)}>
                {time.fromNow()}
              </span>
            </Tooltip>
            <span className={concat(textStyles.secondary, textStyles.em75)}>{comment.id}</span>
          </Flex>
          {!!comment.reply_comment && comment.reply_comment.id !== '000000000000000000000000' ? (
            <div style={{ borderLeft: '#ccc 5px solid', paddingLeft: 10 }}>
              <Comment comment={comment.reply_comment} />
            </div>
          ) : null}
          <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
        </Flex>
      </Flex.Item>
    </Flex>
  );
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
    this.setState({ page, size }, this.getData);
  };

  checkboxChange = (checked: boolean, id: string, key: CommentBooleanKey) => {
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

  render() {
    const items: { key: CommentBooleanKey; value: string }[] = [
      { key: 'show', value: '显示' },
      { key: 'ad', value: '广告' },
      { key: 'recv', value: '接收提醒' },
    ];
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <React.Fragment>
              <Head>
                <title>{`评论列表|后台|${context.blog_name}`}</title>
              </Head>

              <Flex fullWidth direction="TB">
                <Flex direction="LR">
                  <p>共 {this.state.total} 条评论</p>
                  <Button
                    neumorphism
                    loading={this.state.loading}
                    onClick={async () => {
                      this.setState({ loading: true });
                      ShowNotification(await commentsAvatar());
                      this.setState({ loading: false });
                    }}
                  >
                    更新头像
                  </Button>
                </Flex>
                <Loading loading={this.state.loading}>
                  {this.state.data.map((comment, idx) => (
                    <Flex key={comment.id} mainAxis="space-between" wrap={!context.big_screen}>
                      <Flex.Item style={{ flex: '1 1 auto' }}>
                        <Comment comment={comment} />
                      </Flex.Item>
                      <Flex.Item style={{ flex: '0 0 auto' }}>
                        <Flex direction="TB" subAxis="flex-end">
                          <a href={comment.url} target="_blank">
                            《{comment.title !== '' ? comment.title : '评论区'}》
                          </a>
                          <Flex>
                            {items.map((item) => (
                              <CheckBox
                                value={comment[item.key]}
                                onChange={(c) =>
                                  this.setState((state) => {
                                    var { data } = state;
                                    data[idx][item.key] = c;
                                    return {
                                      data: [...data],
                                    };
                                  })
                                }
                              >
                                {item.value}
                              </CheckBox>
                            ))}
                          </Flex>
                          <Flex direction="LR">
                            <Popover
                              shadow
                              card
                              trigger={['click']}
                              component={
                                <Card>
                                  <span>真的要删除么？</span>
                                  <Button
                                    onClick={async () => {
                                      if (ShowNotification(await commentDelete(comment.id)))
                                        this.getData();
                                    }}
                                    danger
                                    neumorphism
                                    primary
                                    size="small"
                                  >
                                    删除！
                                  </Button>
                                </Card>
                              }
                            >
                              <Button neumorphism danger>
                                删除
                              </Button>
                            </Popover>

                            <Button
                              neumorphism
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
                          </Flex>
                        </Flex>
                      </Flex.Item>
                    </Flex>
                  ))}
                </Loading>
                <Pagination
                  disabled={this.state.loading}
                  sizeSelect={[5, 10, 20, 50, 100]}
                  page={this.state.page}
                  size={this.state.size}
                  total={this.state.total}
                  onChange={this.onChange}
                />
              </Flex>
            </React.Fragment>
          )}
        </Context.Consumer>
      </Card>
    );
  }
}

export default AdminComments;
