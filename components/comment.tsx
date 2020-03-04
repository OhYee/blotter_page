import React, { ComponentProps } from 'react';

import { Comment as Cm, Avatar, List, Tooltip, Input, Form, Button, Popover, Checkbox } from 'antd';
import { Icon } from '@ant-design/compatible';
import { FormInstance } from 'antd/lib/form';

import moment from 'moment';

import { comments, avatar, addComment } from '@/utils/api';
import ShowNotification from '@/utils/notification';

const adWarning = <b>广告评论，已被屏蔽</b>;
const delWarning = <b>该评论已被删除</b>;
const defaultAvatar = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';

interface CommentPartProps extends ComponentProps<'base'> {
  url: string;
}

interface CommentPartState {
  total: number;
  comments: Blotter.Comment[];
  avatar: { [id: string]: string };
  reply: { [id: string]: boolean };
  editor_loading: { [id: string]: boolean };
  loading: boolean;
}

class CommentPart extends React.Component<CommentPartProps, CommentPartState> {
  constructor(props: CommentPartProps) {
    super(props);
    this.state = {
      avatar: {},
      reply: {},
      editor_loading: {},
      total: 0,
      comments: [],
      loading: true,
    };
  }

  componentDidMount() {
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

  onEmailBlur = (id: string, formRef: React.RefObject<FormInstance>) => {
    avatar(formRef.current.getFieldValue(`email`), data =>
      this.setState(state => {
        state.avatar[id] = data.avatar;
        return state;
      }),
    );
  };

  onSubmitClick = async (id: string, formRef: React.RefObject<FormInstance>) => {
    var value = await formRef.current.validateFields(['email', 'content', 'recv']);

    this.setState(state => {
      state.editor_loading[id] = true;
      return state;
    });
    var r = await addComment({
      url: this.props.url,
      reply: id,
      email: value['email'],
      recv: value['recv'],
      raw: value['content'],
    });

    if (ShowNotification(r)) {
      //   formRef.current.resetFields(['email', 'recv', 'content']);
      this.initialComment();
    }
    this.setState(state => {
      state.editor_loading[id] = false;
      state.reply[id] = !r.success;
      return state;
    });
  };

  render_avatar = (avatar: string) => {
    return <Avatar src={avatar ? avatar : defaultAvatar} />;
  };

  render_editor = (id: string) => {
    const formRef = React.createRef<FormInstance>();

    var onSubmitClick = () => {
      this.onSubmitClick(id, formRef);
    };
    var onEmailBlur = () => {
      this.onEmailBlur(id, formRef);
    };

    return (
      <Cm
        avatar={this.render_avatar(this.state.avatar[id])}
        content={
          <Form ref={formRef} initialValues={{ recv: true, email: '', content: '' }}>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '邮箱地址不合法',
                },
                {
                  required: true,
                  message: '你需要输入邮箱来表明你的身份',
                },
              ]}
            >
              <Input
                onBlur={onEmailBlur}
                placeholder="输入您的邮箱(仅用于收取有人回复您的通知，不会在前端泄露)"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                    message: '多说两句?',
                  },
                  {
                    min: 5,
                    message: '多说两句?',
                  },
                ]}
              >
                <Input.TextArea autoSize={{ minRows: 3 }} placeholder="礼貌交流，至少5个字符" />
              </Form.Item>
              <Form.Item name="recv" valuePropName="checked" noStyle>
                <Checkbox>收到回复时使用邮件通知</Checkbox>
              </Form.Item>
              <Form.Item noStyle>
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
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={onSubmitClick}
                  loading={this.state.editor_loading[id] === true}
                  style={{ float: 'right' }}
                >
                  评论
                </Button>
              </Form.Item>
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
          header={root ? `共 ${this.state.total} 条评论` : null}
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

export default CommentPart;
