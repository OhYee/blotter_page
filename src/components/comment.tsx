import React, { ComponentProps } from 'react';

import {
  Comment as Cm,
  Avatar,
  List,
  Tooltip,
  Input,
  Icon,
  Form,
  Button,
  Popover,
  Checkbox,
  notification,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import moment from 'moment';

import { comments, avatar, addComment } from '@/utils/api';

const adWarning = <b>广告评论，已被屏蔽</b>;
const delWarning = <b>该评论已被删除</b>;
const defaultAvatar = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';

interface CommentPartProps extends FormComponentProps {
  url: string;
}

type CommentPartState = {
  total: number;
  comments: Blotter.Comment[];
  avatar: { [id: string]: string };
  reply: { [id: string]: boolean };
  editor_loading: { [id: string]: boolean };
  loading: boolean;
};

class CommentPart extends React.Component<
  CommentPartProps & ComponentProps<'base'> & FormComponentProps,
  CommentPartState
> {
  constructor(props: CommentPartProps & ComponentProps<'base'> & FormComponentProps) {
    super(props);
    this.state = {
      avatar: {},
      reply: {},
      editor_loading: {},
      total: 0,
      comments: [],
      loading: true,
    };
    this.initialComment();
  }

  initialComment = () => {
    this.setState({ loading: true });
    comments(this.props.url, data => {
      this.setState(() => ({
        total: data.total,
        comments: data.comments.reverse(),
        loading: false,
      }));
    });
  };

  onReplyClick = (id: string, reply: boolean) => {
    this.setState((state: CommentPartState) => {
      state.reply[id] = reply;
      return { reply: state.reply };
    });
  };

  onEmailBlur = (id: string) => {
    console.log(this.props.form.getFieldValue(`email${id}`), id);
    avatar(this.props.form.getFieldValue(`email${id}`), data =>
      this.setState(state => {
        state.avatar[id] = data.avatar;
        return state;
      }),
    );
  };

  onSubmitClick = (id: string) => {
    this.props.form.validateFieldsAndScroll(
      [`email${id}`, `content${id}`, `recv${id}`],
      {},
      (errors, value) => {
        console.log(value);
        if (errors === null) {
          this.setState(state => {
            state.editor_loading[id] = true;
            return state;
          });
          addComment(
            {
              url: this.props.url,
              reply: id,
              email: value[`email${id}`],
              recv: value[`recv${id}`],
              raw: value[`content${id}`],
            },
            data => {
              if (data.success) {
                notification.success({
                  message: data.message,
                });
                this.props.form.resetFields([`email${id}`, `recv${id}`, `content${id}`]);
                this.initialComment();
              } else {
                notification.error({
                  message: data.message,
                });
              }
              this.setState(state => {
                state.editor_loading[id] = false;
                state.reply[id] = !data.success;
                return state;
              });
            },
          );
        }
      },
    );
  };

  render_avatar = (avatar: string) => {
    return <Avatar src={avatar ? avatar : defaultAvatar} />;
  };

  render_editor = (id: string) => {
    var onSubmitClick = () => {
      this.onSubmitClick(id);
    };
    var onEmailBlur = () => {
      this.onEmailBlur(id);
    };
    return (
      <Cm
        avatar={this.render_avatar(this.state.avatar[id])}
        content={
          <Form>
            <Form.Item>
              {this.props.form.getFieldDecorator(`email${id}`, {
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
                  onBlur={onEmailBlur}
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

            <Form.Item>
              {this.props.form.getFieldDecorator(`recv${id}`, {
                initialValue: true,
                valuePropName: 'checked',
              })(<Checkbox>收到回复时使用邮件通知</Checkbox>)}
              <Popover
                title="帮助"
                content={
                  <div>
                    <p>
                      评论支持Markdown，如果有人回复你的评论，会有邮件提醒发送到你的邮箱，如果不想查看，可以取消
                    </p>
                    <p>
                      头像将优先使用邮箱对应Github账户头像,如果获取失败将使用
                      <a href="https://cn.gravatar.com/">Gravatar</a>头像
                    </p>
                    <p>
                      邮箱地址不会在前端渲染，可以避免被扫描工具记录，但仍可能通过头像地址逆推出邮箱
                    </p>
                    <p>评论内容请遵守相应法律法规，并且请不要发布广告</p>
                  </div>
                }
              >
                <Icon type="question-circle" />
              </Popover>
            </Form.Item>

            <Form.Item style={{ float: 'right' }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onSubmitClick}
                loading={this.state.editor_loading[id] === true}
              >
                评论
              </Button>
            </Form.Item>
          </Form>
        }
      />
    );
  };

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
          actions={[
            this.state.reply[comment.id] ? (
              <span key="comment-nested-reply-to" onClick={onCloseClick}>
                取消回复
                <Icon type="close" />
              </span>
            ) : (
              <span key="comment-nested-reply-to" onClick={onReplyClick}>
                回复
              </span>
            ),
            <span key="comment-nested-reply-to">
              {comment.recv ? (
                <Popover content="当你回复该评论，评论者会收到邮件提醒（但是他/她不一定会看邮件）">
                  <Icon type="mail" />
                </Popover>
              ) : (
                <Popover content="当你回复该评论，评论者不会收到邮件提醒（所以你可能无法得到反馈）">
                  <Icon type="disconnect" />
                </Popover>
              )}
            </span>,
          ]}
          author={comment.email}
          avatar={this.render_avatar(comment.avatar)}
          content={
            comment.ad ? (
              adWarning
            ) : comment.show ? (
              <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
            ) : (
              delWarning
            )
          }
          datetime={
            <Tooltip title={moment(comment.time).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(comment.time).fromNow()}</span>
            </Tooltip>
          }
        >
          {this.state.reply[comment.id] ? this.render_editor(comment.id) : null}
          {this.render_comment_list(comment.children, false)}
        </Cm>
      </li>
    );
  };

  render_comment_list = (comments: Blotter.Comment[], root: boolean) => {
    if (comments.length || root) {
      return (
        <List
          className="comment-list"
          header={root ? `共${this.state.total} 条评论` : null}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={this.render_comment}
          loading={this.state.loading}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div id="blotter-comment">
        {this.render_editor('000000000000')}
        {this.render_comment_list(this.state.comments, true)}
      </div>
    );
  }
}

export default Form.create<CommentPartProps>({ name: 'CommentPart' })(CommentPart);
