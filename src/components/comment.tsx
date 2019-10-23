import React, { ComponentProps, Props } from 'react';

import { Comment as Cm, Avatar, List, Tooltip, Input, Icon, Form, Button } from 'antd';
import moment from 'moment';
import { FormComponentProps } from 'antd/es/form';
import { requestCallback } from '@/utils/request';
import { withRouter, RouteComponentProps } from 'react-router';

type CommentProps = {} & ComponentProps<'base'> & FormComponentProps & RouteComponentProps;

type CommentState = {
  comments: Blotter.Comment[];
  avatar: string;
  reply: { [keys: number]: boolean };
};

class Comment extends React.Component<CommentProps, CommentState> {
  constructor(props: CommentProps) {
    super(props);
    this.state = { avatar: 'https://secure.gravatar.com/avatar/null', reply: {}, comments: [] };
    requestCallback(
      'get',
      '/api/comment',
      { url: this.props.location.pathname },
      (data: Blotter.Comment[]) => {
        this.setState(() => ({ comments: data }));
      },
    );
  }

  onReplyClick = (id: number, reply: boolean) => {
    this.setState((state: CommentState) => {
      state.reply[id] = reply;
      return { reply: state.reply };
    });
  }

  onEmailBlur = (e: React.FocusEvent) => {
    var email = this.props.form.getFieldValue('email');

    requestCallback('get', '/api/avatar', { email: email }, (data: any) => {
      this.setState(() => ({
        avatar: data,
      }));
    });
  }

  onSubmitClick = (id: number) => {
    this.props.form.validateFieldsAndScroll(
      ['email', `content${id}`],
      {},
      (errors: any, value: any) => {
        if (errors === null) {
          console.log({
            id: id,
            email: value[id],
            avatar: this.state.avatar,
            content: value[`content${id}`],
          });
        }
      },
    );
  }

  render_comment = (comment: Blotter.Comment) => {
    var onReplyClick = () => {
      this.onReplyClick(comment.id, true);
    };
    var onCloseClick = () => {
      this.onReplyClick(comment.id, false);
    };
    return (
      <li>
        <Cm
          actions={
            this.state.reply[comment.id]
              ? [
                  <span key="comment-nested-reply-to" onClick={onCloseClick}>
                    取消回复
                    <Icon type="close" />
                  </span>,
                ]
              : [
                  <span key="comment-nested-reply-to" onClick={onReplyClick}>
                    回复
                  </span>,
                ]
          }
          author={comment.email}
          avatar={<Avatar src={comment.avatar} alt={comment.email} />}
          content={<p>{comment.content}</p>}
          datetime={
            <Tooltip title={moment(comment.date).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(comment.date).fromNow()}</span>
            </Tooltip>
          }
        >
          {this.state.reply[comment.id] ? this.render_editor(comment.id) : null}
          {this.render_comment_list(comment.children, false)}
        </Cm>
      </li>
    );
  }

  render_comment_list = (comments: Blotter.Comment[], root: boolean) => {
    if (comments.length || root) {
      return (
        <List
          className="comment-list"
          header={root ? `${comments.length} 条评论` : null}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={this.render_comment}
        />
      );
    } else {
      return null;
    }
  }

  render_editor = (id: number) => {
    var onSubmitClick = () => {
      this.onSubmitClick(id);
    };
    return (
      <Cm
        avatar={<Avatar src={this.state.avatar} alt={this.props.form.getFieldValue('email')} />}
        content={
          <Form>
            <Form.Item>
              {this.props.form.getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: '邮箱地址不合法',
                  },
                  {
                    required: true,
                    message: '你需要输入邮箱来表明你的身份',
                  },
                ],
              })(
                <Input
                  onBlur={this.onEmailBlur}
                  placeholder="输入您的邮箱(仅用于收取有人回复您的通知，不会在前端泄露)"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {this.props.form.getFieldDecorator(`content${id}`, {
                rules: [
                  {
                    required: true,
                    message: '多说两句?',
                  },
                  {
                    min: 5,
                    message: '多说两句?',
                  },
                ],
              })(<Input.TextArea autoSize={{ minRows: 3 }} placeholder="礼貌交流，至少5个字符" />)}
            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit" onClick={onSubmitClick}>
                评论
              </Button>
            </Form.Item>
          </Form>
        }
      />
    );
  }

  render() {
    return (
      <div id="blotter-comment">
        {this.render_editor(-1)}
        {this.render_comment_list(this.state.comments, true)}
      </div>
    );
  }
}

export default Form.create({ name: 'Comment' })(withRouter(Comment));
