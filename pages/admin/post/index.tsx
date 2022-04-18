import React from 'react';

import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

const MD = require('markdown-it')({ html: true, linkify: true, breaks: true })
  .use(require('@zombie110year/markdown-it-katex'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-named-headers'))
  .use(require('markdown-it-highlightjs'))
  .use(require('md-it-mermaid'));

import Button from '@/components/button';
import Card from '@/components/card';
import Input, { CheckBox, DatePicker, InputNumber, TextArea } from '@/components/input';
import { Flex } from '@/components/container';
import { message } from '@/components/notification';
import Popover from '@/components/popover';
import { Loading, Success, Plus } from '@/components/svg';
import TagSearch from '@/components/tag_search';
import PostContent from '@/components/post_content';
import Anchor from '@/components/anchor';

import importImages from './images';
import RenderEditor from './editor';
import RenderFixedButton from './buttons';

import moment from '@/utils/moment';
import ShowNotification from '@/utils/notification';
import { Context } from '@/utils/global';
import { waitUntil } from '@/utils/debounce';
import { markdown, adminPost, postExist, postEdit } from '@/utils/api';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/storage';

import styles from './post.module.scss';

interface PostEditProps extends React.ComponentProps<'base'>, WithRouterProps {}

type PostEditState = {
  preview: 0 | 1 | 2;
  loading: boolean;
  submitDisabled: boolean;
  draft: string;
  offset: number;
  fontSize: number;
  fullscreen: boolean;
  backRender: boolean;
} & TypeTReplaceByU<Blotter.PostAll, { publish_time: number; edit_time: number }>;

class PostEdit extends React.Component<PostEditProps, PostEditState> {
  static defaultProps = {};
  previewRef = React.createRef<HTMLDivElement>();
  editor: any;
  //   ws: WebSocket;

  constructor(props: any) {
    super(props);
    const now = new Date().getTime();
    this.state = {
      preview: 0,
      loading: false,

      submitDisabled: false,
      draft: '',
      offset: 0,
      fontSize: 16,
      images: [],
      fullscreen: false,
      backRender: false,

      keywords: [],
      id: '',
      title: '',
      url: '',
      abstract: '',
      pop:false,
      poptext:'',
      head_image: '',
      view: 0,
      publish_time: now,
      edit_time: now,
      //   published: false,
      status: 0,
      raw: '',
      content: '',
      tags: [],
      length: 0,
    };
  }

  componentDidMount() {
    var url = this.props.router.query.url as string;
    const value = getLocalStorage(`post-${url}`);
    this.setState({ draft: value });
    if (url != '' && typeof url != 'undefined') this.initial(url, true);

    // this.ws = new WebSocket(`${window.location.origin.replace('http', 'ws')}/api/markdown/ws`);
    // this.ws.onclose = this.wsClose;
    // window.addEventListener('beforeunload', this.wsClose);
  }

  componentWillUnmount() {
    // this.wsClose();
  }

  //   wsClose = () => {
  //     console.log('WS close');
  //     if (!!this.ws) this.ws.close();
  //     this.ws = undefined;
  //     window.removeEventListener('beforeunload', this.wsClose);
  //   };

  initial = (url: string, first: boolean) => {
    this.setState({ loading: true });
    adminPost(url)
      .then((r) => {
        const post = {
          ...r,
          edit_time: first ? new Date().getTime() : r.edit_time * 1000,
          publish_time: r.publish_time * 1000,
        };
        this.setState(
          (state) => ({ ...state, ...post }),
          () => {
            if (!!this.editor) this.editor.setValue(r.raw);
          },
        );
      })
      .finally(() => this.setState({ loading: false }));
  };

  renderMarkdown = async (source: string) => {
    this.setState({ loading: true });
    var r = { html: '' };

    try {
      if (this.state.backRender) r = await markdown(source);
      else r.html = MD.render(source);

      // 当没有中文时，words 返回的是 null，需要使用 || 设置默认值 []
      const words = r.html.replace(/<[^>]+>|\s/g, '').match(/[\u007f-\uffff]/g) || [];
      this.setState({
        content: r.html,
        length: words.length,
      });
    } catch (e) {
      r = { html: '' };
      console.error(e);
    }
    this.setState({ loading: false });
  };

  onChange = (value: string) => {
    waitUntil(
      'post_edit_sync',
      () => {
        setLocalStorage(`post-${this.props.router.query.url as string}`, value);
        if (this.state.preview) {
          new Promise(() => this.renderMarkdown(value));
        }
      },
      2000,
    );
  };

  //   urlValidator = async (rule, value, callback, s, o) => {
  //     waitUntil(
  //       'post_edit_url',
  //       async () => {
  //         console.log(rule, value, callback, s, o);
  //         var r = await postExist(value);
  //         if (r.existed) {
  //           callback();
  //         } else {
  //           callback('123');
  //         }
  //       },
  //       1000,
  //     );
  //   };

  tagOnAdd = (tag: Blotter.Tag) => {
    this.setState((state) => ({
      tags: [...state.tags].filter((_tag) => _tag.short !== tag.short).concat(tag),
    }));
  };

  tagOnDelete = (tag: Blotter.Tag) => {
    this.setState((state) => {
      var tags = state.tags.filter((_tag) => _tag.short != tag.short);
      return { tags };
    });
  };

  getPostAll = () => {
    const post: Blotter.PostAll = {
      id: this.state.id,
      title: this.state.title,
      url: this.state.url,
      keywords: this.state.keywords,
      status: this.state.status,
      abstract: this.state.abstract,
      pop: this.state.pop,
      poptext: this.state.poptext,
      view: this.state.view,
      head_image: this.state.head_image,
      tags: this.state.tags,
      publish_time: parseInt(`${this.state.publish_time / 1000}`),
      edit_time: parseInt(`${this.state.edit_time / 1000}`),
      raw: this.state.raw,
      images: this.state.images,
      content: this.state.content,
      length: this.state.length,
    };
    return post;
  };

  submit = async () => {
    this.setState({ submitDisabled: true });
    try {
      const post = this.getPostAll();
      delete post.content;
      console.log(post);
      postEdit(post)
        .then((r) => {
          if (ShowNotification(r)) {
            Router.push(`/admin/post?url=${post.url}`);
            this.initial(post.url, false);
            removeLocalStorage(`post-${this.props.router.query.url as string}`);
          }
        })
        .finally(() => {
          this.setState({ submitDisabled: false });
        });
    } catch (e) {
      const err = e.errorFields.map((item) => item.errors.join(' ')).join('\n');
      message({ alertType: 'error', title: '信息错误', content: err });
      this.setState({ submitDisabled: false });
    }
  };

  onScroll = (scrollTop: number, scrollHeight: number) => {
    if (this.state.preview === 2 && !!this.previewRef.current) {
      this.previewRef.current.scrollTop =
        (scrollTop / scrollHeight) * this.previewRef.current.scrollHeight + this.state.offset;
    }
  };

  renderPreview = () => {
    const post = this.getPostAll();
    return (
      <Card neumorphism style={{ position: 'relative', overflow: 'hidden' }}>
        <Anchor
          style={{ position: 'absolute' }}
          container={this.previewRef.current}
          content={post.content}
        />
        <div className={styles.preview} ref={this.previewRef}>
          {this.state.loading ? <Loading /> : <Success />}
          <PostContent post={post} />
          {this.state.preview === 2 ? <div style={{ height: 'calc(100vh - 20px)' }}></div> : null}
        </div>
      </Card>
    );
  };

  renderToolbar = () => {
    return (
      <Flex direction="TB" fullWidth>
        <Input
          label="文章ID"
          disabled
          placeholder="文章ID"
          prefix="ID"
          value={this.state.id}
          onChange={(id) => this.setState({ id })}
          style={{ width: '100%' }}
        />
        <Flex mainSize="middle" subSize="middle">
          <Input
            label="文章链接"
            placeholder="文章链接"
            prefix="/post/"
            value={this.state.url}
            // 限制只允许小写 url
            onChange={(url) => this.setState({ url: !!url ?url.toLowerCase():url })}
          />
          <InputNumber
            label="阅读量"
            placeholder="阅读量"
            min={0}
            value={this.state.view}
            onChange={(view) => this.setState({ view })}
          />
          <DatePicker
            label="发布时间"
            placeholder="发布时间"
            value={this.state.publish_time}
            onChange={(publish_time) => this.setState({ publish_time })}
          />
          <DatePicker
            label="编辑时间"
            placeholder="编辑时间"
            value={this.state.edit_time}
            onChange={(edit_time) => this.setState({ edit_time })}
          />
          <Input
            label="文章标题"
            placeholder="文章标题"
            value={this.state.title}
            onChange={(title) => this.setState({ title })}
          />
          <Input
            label="头图"
            placeholder="头图"
            value={this.state.head_image}
            onChange={(head_image) => this.setState({ head_image })}
          />
          {/* <CheckBox
            switchStyle
            checkText="发布"
            uncheckText="草稿"
            value={this.state.published}
            onChange={(published) => this.setState({ published })}
          /> */}
          <Button.Group<0 | 1 | 2>
            selected={this.state.status}
            buttons={[
              { key: '草稿', value: 0 },
              { key: '隐藏', value: 1 },
              { key: '发布', value: 2 },
            ]}
            onClick={(key, value) => {
              this.setState({ status: value });
            }}
          />

          <Button
            neumorphism
            onClick={() => {
              this.editor.setValue(this.state.draft);
            }}
          >
            文章恢复
          </Button>

          <InputNumber
            label="字体大小"
            value={this.state.fontSize}
            onChange={(fontSize) => this.setState({ fontSize })}
          />

          <Button
            neumorphism
            onClick={() => {
              const now = new Date().getTime();
              this.setState({ publish_time: now, edit_time: now });
            }}
          >
            重置日期
          </Button>

          <Button
            neumorphism
            onClick={async () => {
              await this.renderMarkdown(this.state.raw);
              this.setState({ images: importImages(this.state.content) });
            }}
          >
            导入图片
          </Button>
          
          <CheckBox
            
            switchStyle={true}
            checkText="使用弹窗"
            uncheckText="不使用弹窗"
            value={!!this.state.pop}
            onChange={(value) =>
              this.setState({pop:value})
            }
          />
            
        </Flex>

        <TagSearch onAdd={this.tagOnAdd} onDelete={this.tagOnDelete} tags={this.state.tags} />

        <TextArea
          label="文章摘要"
          rows={5}
          spellCheck="false"
          placeholder="文章摘要"
          value={this.state.abstract}
          onChange={(abstract) => this.setState({ abstract })}
        />

        <TextArea
          label="弹窗文字"
          rows={4}
          spellCheck="false"
          placeholder="弹窗文字"
          value={this.state.poptext}
          onChange={(poptext) => this.setState({ poptext })}
        />
        
        <Flex
          direction="TB"
          subAxis="flex-end"
          fullWidth
          wrap={false}
          style={{ maxHeight: '50vh', overflow: 'auto' }}
        >
          {!!this.state.images &&
            this.state.images.map((image, idx) => (
              <Flex key={idx} wrap={false}>
                <Flex.Item style={{ flex: '0 0 3em' }}>
                  <strong>{idx}</strong>
                </Flex.Item>
                <Flex.Item style={{ flex: '0 0 auto' }}>
                  <Popover
                    card
                    shadow
                    trigger={['click']}
                    component={
                      <Card>
                        <Flex>
                          确认删除？
                          <Button
                            primary
                            neumorphism
                            onClick={() =>
                              this.setState((state) => ({
                                images: state.images.filter((_, idx2) => idx != idx2),
                              }))
                            }
                          >
                            删除
                          </Button>
                        </Flex>
                      </Card>
                    }
                  >
                    <Button danger neumorphism>
                      删除
                    </Button>
                  </Popover>
                </Flex.Item>
                <Flex.Item style={{ flex: '1 1 auto' }}>
                  <Input
                    value={image}
                    onChange={(value) => {
                      this.setState((state) => {
                        var { images } = state;
                        images[idx] = value;
                        return { images };
                      });
                    }}
                  />
                </Flex.Item>
                <Flex.Item style={{ flex: '0 0 auto' }}>
                  <img src={image} style={{ maxHeight: '100px' }} />
                </Flex.Item>
              </Flex>
            ))}
        </Flex>
        <Flex.Item style={{ textAlign: 'right' }}>
          <Button
            neumorphism
            prefix={<Plus />}
            onClick={() => this.setState((state) => ({ images: [...state.images, ''] }))}
          >
            添加走马灯
          </Button>
        </Flex.Item>
      </Flex>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`文章编辑|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>

        <RenderFixedButton
          preview={this.state.preview}
          onPreviewClick={(preview) => {
            if (preview !== 0) this.renderMarkdown(this.state.raw);
            this.setState({ preview }, () => {
              if (!!this.editor) this.editor.layout();
            });
          }}
          onSubmit={this.submit}
          submitDisabled={this.state.submitDisabled}
          onScrollOffset={(diff) => {
            this.setState(
              (state) => ({ offset: state.offset + diff }),
              () => {
                if (!!this.editor)
                  this.onScroll(this.editor.getScrollTop(), this.editor.getScrollHeight());
              },
            );
          }}
          onFold={() => this.editor.trigger('fold', 'editor.foldAll')}
          onUnfold={() => this.editor.trigger('unfold', 'editor.unfoldAll')}
          fullscreen={this.state.fullscreen}
          onFullScreen={(fullscreen) => {
            this.setState({ fullscreen }, () => {
              this.editor.layout();
            });
          }}
          style={this.state.fullscreen ? { zIndex: 5 } : {}}
          backRender={this.state.backRender}
          onChangeRender={(backRender) =>
            this.setState({ backRender }, () => {
              this.renderMarkdown(this.state.raw);
            })
          }
        />

        <Flex direction="TB" fullWidth>
          <Card neumorphism>{this.renderToolbar()}</Card>

          {/*
                很奇怪，如果在存在 katex 的情况下在 双栏 和 预览 之间互相切换，可能会导致页面卡死。同时没有任何报错
                猜测和头部引入 css 有关，大概是由于两个预览组件同时引入和删除相同的 css 导致的？
                改成现在的形式可以避免该问题，同时优化性能（不需要多渲染一次）
          */}
          {/* {this.state.preview === 1 ? this.renderPreview() : null} */}

          <Flex
            wrap={false}
            direction={
              this.state.preview === 0 ? 'row' : this.state.preview === 1 ? 'column-reverse' : 'row'
            }
            style={
              this.state.fullscreen
                ? {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'var(--background)',
                    width: '100%',
                    zIndex: 4,
                  }
                : {}
            }
          >
            <Flex.Item style={{ flex: '1', width: this.state.preview === 2 ? '0%' : '100%' }}>
              <Card neumorphism className={styles.editor} id="editor">
                <RenderEditor
                  raw={this.state.raw}
                  fontSize={this.state.fontSize}
                  getRef={(ref) => {
                    this.editor = ref;
                  }}
                  onChange={() => {
                    waitUntil(
                      'editor-onchange',
                      () => {
                        const value = this.editor.getValue();
                        setLocalStorage(`post-${this.props.router.query.url as string}`, value);
                        if (this.state.preview !== 0) this.renderMarkdown(value);
                        this.setState({ raw: value });
                      },
                      300,
                    );
                  }}
                  onSave={this.submit}
                  onScoll={(e) => this.onScroll(e.scrollTop, e.scrollHeight)}
                />
              </Card>
            </Flex.Item>
            {this.state.preview !== 0 ? (
              <Flex.Item
                style={this.state.preview === 2 ? { flex: '1', width: '0%' } : { width: '100%' }}
              >
                {this.renderPreview()}
              </Flex.Item>
            ) : null}
          </Flex>
        </Flex>
      </React.Fragment>
    );
  }
}

export default withRouter(PostEdit);
