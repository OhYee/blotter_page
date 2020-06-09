import React, { ComponentProps, Fragment } from 'react';

import {
  Comment as AntdComment,
  Avatar as AntdAvatar,
  List,
  Tooltip,
  Input,
  Form,
  Button,
  Popover,
  Checkbox,
} from 'antd';
import { Icon } from '@ant-design/compatible';

import moment from 'moment';

import { comments, avatar, addComment } from '@/utils/api';
import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';

const adWarning = <b>广告评论，已被屏蔽</b>;
const delWarning = <b>该评论已被删除</b>;
const defaultAvatar = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
const CommentContext = React.createContext({ url: '', callback: () => {} });

function getCommentID(id: string) {
  return `blotter-comment-${id}`;
}

function getOffsetTop(e: HTMLElement): number {
  return e.offsetTop + (e.offsetParent ? getOffsetTop(e.offsetParent as any) : 0);
}

function jumpParent(id: string) {
  const target = document.getElementById(getCommentID(id));
  const top = getOffsetTop(target);
  if (!!target && top > 0) {
    scrollTo(0, top + 10);
  }
}

const Avatar: React.FC<{ avatar: string }> = (props) => {
  const { avatar } = props;
  return <AntdAvatar src={avatar ? avatar : defaultAvatar} />;
};

const Editor: React.FC<{ id: string; closeEditorCallback?: () => void }> = (props) => {
  const [formRef] = Form.useForm();
  const { id, closeEditorCallback } = props;
  const [avatarURL, setAvatarURL] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { url, callback } = React.useContext(CommentContext);
  const allFields = ['email', 'raw', 'recv'];
  const onSubmitClick = async () => {
    var { email, recv, raw } = await formRef.validateFields(allFields);
    setLoading(true);
    addComment({ url, reply: id, email, recv, raw })
      .then((r) => {
        if (ShowNotification(r)) {
          if (!!closeEditorCallback) closeEditorCallback();
          else formRef.resetFields(allFields);
          if (!!callback) callback();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onEmailBlur = () => {
    avatar(formRef.getFieldValue(`email`), (data) => setAvatarURL(data.avatar));
  };

  return (
    <AntdComment
      avatar={<Avatar avatar={avatarURL} />}
      content={
        <Form form={formRef} initialValues={{ recv: true, email: '', content: '' }}>
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
              name="raw"
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
                loading={loading}
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

const Comment: React.FC<{
  comment: Blotter.Comment;
  depth: number;
  quote: boolean;
  parent?: Blotter.Comment;
}> = (props) => {
  const { comment, depth, quote, parent } = props;
  const [reply, setReply] = React.useState(false);
  const time = moment(comment.time);
  const context = React.useContext(Context);
  const childrenAndEditor = () => (
    <Fragment>
      {reply ? <Editor id={comment.id} closeEditorCallback={() => setReply(false)} /> : null}
      <CommentList comments={comment.children} depth={depth + 1} parent={comment} />
    </Fragment>
  );
  var maxDepth = context.big_screen ? 5 : 2;
  var actions: React.ReactNode[];
  if (quote) {
    actions = [
      <span key="comment-nested-reply-to" onClick={() => jumpParent(comment.id)}>
        跳转到该评论
      </span>,
    ];
  } else {
    actions = [
      reply ? (
        <span key="comment-nested-reply-to" onClick={() => setReply(false)}>
          取消回复
          <Icon type="close" />
        </span>
      ) : (
        <span key="comment-nested-reply-to" onClick={() => setReply(true)}>
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
    ];
  }
  return (
    <div id={quote ? '' : getCommentID(comment.id)} className="fullWidth">
      <AntdComment
        style={quote ? { borderLeft: '#ccc 5px solid', paddingLeft: 10 } : {}}
        actions={actions}
        author={comment.email}
        avatar={<Avatar avatar={comment.avatar} />}
        content={
          comment.ad ? (
            adWarning
          ) : comment.show ? (
            <div>
              {!quote && depth != 1 && depth >= maxDepth ? (
                <Comment comment={parent} depth={depth} quote={true} />
              ) : null}
              <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
            </div>
          ) : (
            delWarning
          )
        }
        datetime={
          <Tooltip title={time.format('YYYY-MM-DD HH:mm:ss')}>
            <span>{time.fromNow()}</span>
          </Tooltip>
        }
      >
        {!quote && depth < maxDepth ? childrenAndEditor() : null}
      </AntdComment>
      {!quote && depth >= maxDepth ? childrenAndEditor() : null}
    </div>
  );
};

const CommentList: React.FC<{
  comments: Blotter.Comment[];
  depth: number;
  parent?: Blotter.Comment;
  total?: number;
  loading?: boolean;
}> = (props) => {
  const { comments, depth, parent, total, loading } = props;
  return comments.length || depth == 1 ? (
    <List
      className="comment-list"
      header={!!total ? `共 ${total} 条评论` : null}
      itemLayout="horizontal"
      dataSource={comments}
      split={false}
      renderItem={(comment, idx) => (
        <List.Item key={comment.id} style={{ padding: 0 }}>
          <Comment comment={comment} depth={depth} quote={false} parent={parent} />
        </List.Item>
      )}
      loading={loading === true}
    />
  ) : null;
};

interface CommentPartProps extends ComponentProps<'base'> {
  url: string;
}

interface CommentPartState {
  total: number;
  comments: Blotter.Comment[];
  loading: boolean;
}

class CommentPart extends React.Component<CommentPartProps, CommentPartState> {
  constructor(props: CommentPartProps) {
    super(props);
    this.state = {
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
    comments(this.props.url, (data) => {
      this.setState(() => ({
        total: data.total,
        comments: data.comments.reverse(),
        loading: false,
      }));
    }).finally(() => {
      this.setState({ loading: false });
    });
  };

  render() {
    return (
      <div id="blotter-comment">
        <CommentContext.Provider value={{ url: this.props.url, callback: this.initialComment }}>
          <Editor id="000000000000" />
          <CommentList
            comments={this.state.comments}
            depth={1}
            total={this.state.total}
            loading={this.state.loading}
          />
        </CommentContext.Provider>
      </div>
    );
  }
}

export default CommentPart;
