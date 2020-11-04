import React from 'react';

import { Flex } from '@/components/container';
import Loading from '@/components/loading';
import Avatar from '@/components/avatar';
import Popover, { Tooltip } from '@/components/popover';
import { Question, Mail, Disconnect, Close } from '@/components/svg';
import Card from '@/components/card';
import Input, { TextArea, CheckBox, Hint } from '@/components/input';
import Button from '@/components/button';

import moment from '@/utils/moment';
import { concat, ComponentProps } from '@/utils/component';
import { comments, avatar, addComment } from '@/utils/api';
import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';

import shadowStyles from '@/styles/shadow.module.scss';
import textStyles from '@/styles/text.module.scss';
import styles from './comment.module.scss';

const emailRep = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
const adWarning = <b>广告评论，已被屏蔽</b>;
const delWarning = <b>该评论已被删除</b>;
const defaultAvatar = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
const CommentContext = React.createContext({ url: '', callback: () => {} });

function getCommentID(id: string) {
  return `blotter-comment-${id}`;
}

function jumpParent(id: string) {
  const target = document.getElementById(getCommentID(id));
  const top = target.getBoundingClientRect().top + window.pageYOffset;
  if (!!target && top > 0) {
    scrollTo(0, top - 10);
  }
}

const Editor: React.FC<{ id: string; closeEditorCallback?: () => void }> = (props) => {
  const { id, closeEditorCallback } = props;
  const [avatarURL, setAvatarURL] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { url, callback } = React.useContext(CommentContext);
  const [email, setEmail] = React.useState('');
  const [raw, setRaw] = React.useState('');
  const [recv, setRecv] = React.useState(true);

  const onSubmitClick = async () => {
    setLoading(true);
    addComment({ url, reply: id, email, recv, raw })
      .then((r) => {
        if (ShowNotification(r)) {
          if (!!closeEditorCallback) closeEditorCallback();
          else {
            setRaw('');
          }
          if (!!callback) callback();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onEmailBlur = () => {
    avatar(email, (data) => setAvatarURL(data.avatar));
  };

  return (
    <Flex subAxis="flex-start" wrap={false}>
      <Flex.Item style={{ flex: '0 0 5em', display: 'flex', justifyContent: 'center' }}>
        <Avatar
          src={avatarURL ? avatarURL : defaultAvatar}
          style={{ width: '2.5em', height: '2.5em' }}
        />
      </Flex.Item>
      <Flex.Item style={{ flex: '1 1 auto' }}>
        <Flex direction="TB" fullWidth>
          <Input
            value={email}
            onBlur={onEmailBlur}
            placeholder="输入您的邮箱(仅用于收取有人回复您的通知，不会在前端泄露)"
            style={{ width: '100%' }}
            onChange={setEmail}
            hint={email !== '' && !emailRep.test(email) && <Hint error>你确定这是一个邮箱？</Hint>}
          />
          <TextArea
            value={raw}
            rows={5}
            placeholder="礼貌交流，至少5个字符"
            style={{ width: '100%' }}
            onChange={setRaw}
            hint={
              raw !== '' && raw.length < 5 && <Hint error>评论连五个字都不到？不会吧不会吧</Hint>
            }
          />
          <Flex>
            <CheckBox value={recv} onChange={setRecv}>
              收到回复时使用邮件通知
            </CheckBox>
            <Popover
              trigger={['click', 'hover']}
              placement="bottom"
              style={{ lineHeight: '100%' }}
              popoverClass={shadowStyles.shadow}
              popoverStyle={
                {
                  boxShadow: '5px 5px 30px var(--shadow)',
                  ['--popover-backgroud']: 'var(--background)',
                } as React.CSSProperties
              }
              component={
                <Card style={{ background: 'var(--background)', maxWidth: '80vw' }}>
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
                </Card>
              }
            >
              <Question />
            </Popover>
            <Flex.Item style={{ flex: '1 1 auto', textAlign: 'right' }}>
              <Button
                primary
                neumorphism
                onClick={onSubmitClick}
                loading={loading}
                disabled={raw.length < 5 || !emailRep.test(email)}
              >
                评论
              </Button>
            </Flex.Item>
          </Flex>
        </Flex>
      </Flex.Item>
    </Flex>
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
    <React.Fragment>
      {reply ? <Editor id={comment.id} closeEditorCallback={() => setReply(false)} /> : null}
      <CommentList comments={comment.children} depth={depth + 1} parent={comment} />
    </React.Fragment>
  );
  var maxDepth = context.big_screen ? 5 : 2;
  var actions: React.ReactNode[];
  if (quote) {
    actions = [
      <span
        key="jump"
        className={concat(textStyles.secondary, textStyles.em75)}
        onClick={() => jumpParent(comment.id)}
        style={{ lineHeight: '100%', cursor: 'pointer' }}
      >
        跳转到该评论
      </span>,
    ];
  } else {
    actions = [
      reply ? (
        <span
          key="cancel"
          className={concat(textStyles.secondary, textStyles.em75)}
          onClick={() => setReply(false)}
          style={{ cursor: 'pointer', lineHeight: '100%' }}
        >
          取消回复
          <Close />
        </span>
      ) : (
        <span
          key="reply"
          className={concat(textStyles.secondary, textStyles.em75)}
          onClick={() => setReply(true)}
          style={{ cursor: 'pointer', lineHeight: '100%' }}
        >
          回复
        </span>
      ),
      <span
        key="email"
        className={concat(textStyles.secondary, textStyles.em75)}
        style={{ lineHeight: '100%' }}
      >
        {comment.recv ? (
          <Tooltip title="当你回复该评论，评论者会收到邮件提醒（但是他/她不一定会看邮件）">
            <Mail />
          </Tooltip>
        ) : (
          <Tooltip title="当你回复该评论，评论者不会收到邮件提醒（所以你可能无法得到反馈）">
            <Disconnect />
          </Tooltip>
        )}
      </span>,
    ];
  }
  return (
    <div id={quote ? '' : getCommentID(comment.id)} className={styles.comment}>
      <Flex
        subAxis="flex-start"
        wrap={false}
        style={quote ? { borderLeft: '#ccc 5px solid', paddingLeft: 10 } : {}}
      >
        <Flex.Item style={{ flex: '0 0 5em', display: 'flex', justifyContent: 'center' }}>
          <Avatar
            src={comment.avatar ? comment.avatar : defaultAvatar}
            style={{ width: '2.5em', height: '2.5em' }}
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
            </Flex>
            <div>
              {comment.ad ? (
                adWarning
              ) : comment.show ? (
                <div>
                  {!quote && depth != 1 && depth >= maxDepth ? (
                    <Comment comment={parent} depth={depth} quote={true} />
                  ) : null}
                  <div
                    style={{ wordBreak: 'break-all' }}
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  ></div>
                </div>
              ) : (
                delWarning
              )}
            </div>
            <Flex mainAxis="flex-start" subAxis="baseline">
              {actions}
            </Flex>
            {!quote && <hr />}
            {!quote && depth < maxDepth ? childrenAndEditor() : null}
          </Flex>
        </Flex.Item>
      </Flex>
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
  return loading ? (
    <Loading />
  ) : comments.length || depth == 1 ? (
    <Flex direction="TB" fullWidth className="comment-list">
      {[
        <p key="total">{!!total ? `共 ${total} 条评论` : null}</p>,
        ...comments.map((comment) => (
          <Flex.Item key={comment.id}>
            <Comment comment={comment} depth={depth} quote={false} parent={parent} />
          </Flex.Item>
        )),
      ]}
    </Flex>
  ) : null;
};

export declare type CommentsProps = ComponentProps<{
  url: string;
}>;

export default function Comments(props: CommentsProps) {
  const { url } = props;
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [commentList, setCommentList] = React.useState<Blotter.Comment[]>([]);
  const initialComments = React.useCallback(() => {
    setLoading(true);
    comments(url)
      .then((data) => {
        setTotal(data.total);
        setCommentList(data.comments.reverse());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading, setTotal, setCommentList, url]);
  React.useEffect(() => initialComments(), []);

  return (
    <CommentContext.Provider value={{ url, callback: initialComments }}>
      <Flex direction="TB" id="blotter-comment" className={styles.comments} fullWidth>
        <Editor id="000000000000" />
        <CommentList comments={commentList} depth={1} total={total} loading={loading} />
      </Flex>
    </CommentContext.Provider>
  );
}
