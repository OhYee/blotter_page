import React, { ComponentProps, DOMAttributes } from 'react';

import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Switch,
  Row,
  Col,
  notification,
  List,
  Popconfirm,
  Radio,
} from 'antd';
import { Icon } from '@ant-design/compatible';
import {
  FormOutlined,
  MinusOutlined,
  PlusOutlined,
  FileImageOutlined,
  SaveOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
} from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

import moment from 'moment';
import MediaQuery from 'react-responsive';

import { ControlledEditor } from '@monaco-editor/react/lib/';

import Carousel from '@/components/carousel';
import Container, { Space } from '@/components/container';
import TagSearch from '@/components/tag_search';
import PostContent from '@/components/post_content';

import { waitUntil } from '@/utils/debounce';
import { markdown, adminPost, postExist, postEdit } from '@/utils/api';
import { dimensionMaxMap } from '@/utils/responsive';

import styles from '@/pages/post/post.less';

import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/storage';
import { ButtonProps } from 'antd/lib/button';
import Qiniu from '@/components/upload';
import If from '@/components/if';
import { RadioChangeEvent } from 'antd/lib/radio';

function Editor(props) {
  const { onChange, getRef, ...restProps } = props;
  const handleEditorChange = (ev, value) => {
    return onChange(value);
  };

  return (
    <div
      style={{ display: 'flex', width: '100%', height: 'calc(100vh - 20px)', overflow: 'hidden' }}
    >
      <ControlledEditor
        onChange={handleEditorChange}
        {...restProps}
        styles={{ flex: '1 1 auto' }}
        editorDidMount={(_, editor) => getRef(editor)}
      />
    </div>
  );
}

const Press: React.FC<
  ButtonProps & {
    onPressing?: (arg: any) => any;
    ms?: number;
    initArg?: any;
  }
> = (props) => {
  const { initArg, onPressing = () => {}, ms = 500, ...restProps } = props;
  const [value, setValue] = React.useState(0);
  //   const [arg, setArg] = React.useState(initArg);
  return (
    <Button
      {...restProps}
      onMouseDown={(e) => {
        var arg = initArg;
        clearInterval(value);
        const interval = (setInterval(() => {
          arg = onPressing(arg);
        }, ms) as unknown) as number;
        setValue(interval);
      }}
      onMouseUp={(e) => clearInterval(value)}
    />
  );
};

const fieldsName = [
  'id',
  'title',
  'url',
  'abstract',
  'head_image',
  'view',
  'publish_time',
  'edit_time',
  'published',
  //   'raw',
];

interface PostEditProps extends ComponentProps<'base'>, WithRouterProps {}

interface PostEditState {
  raw: string;
  html: string;
  bigScreen: boolean;
  preview: 0 | 1 | 2;
  loading: boolean;
  tags: Blotter.Tag[];
  headImage: string;
  submitDisabled: boolean;
  draft: string;
  offset: number;
  fontSize: number;
  images: string[];
  upload: boolean;
}

class PostEdit extends React.Component<PostEditProps, PostEditState> {
  static defaultProps = {};
  formRef = React.createRef<FormInstance>();
  previewRef = React.createRef<HTMLDivElement>();
  now = moment(new Date());
  editor: any;

  constructor(props: any) {
    super(props);
    this.state = {
      raw: '',
      html: '',
      preview: 0,
      bigScreen: true,
      loading: false,
      tags: [],
      headImage: '',
      submitDisabled: false,
      draft: '',
      offset: 0,
      fontSize: 16,
      images: [],
      upload: false,
    };
  }

  componentDidMount() {
    var url = this.props.router.query.url as string;
    const value = getLocalStorage(`post-${url}`);
    this.setState({ draft: value });
    if (url != '' && typeof url != 'undefined') {
      this.getData(url);
    }
  }

  getData = async (url: string) => {
    var r = await adminPost(url);
    this.formRef.current.setFieldsValue({
      id: r.id,
      title: r.title,
      url: r.url,
      abstract: r.abstract,
      head_image: r.head_image,
      view: r.view,
      publish_time: moment(new Date(r.publish_time)),
      //   edit_time: moment(new Date(r.edit_time)),
      published: r.published,
      //   raw: r.raw,
    });
    this.setState(
      {
        tags: r.tags,
        html: r.content,
        raw: r.raw,
        images: !!r.images ? r.images : [],
      },
      () => {
        console.log('got data', r.raw.length);
        if (!!this.editor) this.editor.setValue(r.raw);
      },
    );
  };

  onBigScreen = (match: boolean) => {
    this.setState({ bigScreen: match });
  };

  renderMarkdown = async (source: string) => {
    this.setState({ loading: true });
    var r = await markdown(source);
    this.setState({ html: r.html, loading: false });
    return r.html;
  };

  onChange = (value: string) => {
    waitUntil(
      'post_edit_sync',
      () => {
        setLocalStorage(`post-${this.props.router.query.url as string}`, value);
        if (this.state.preview) {
          this.renderMarkdown(value);
        }
      },
      1000,
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
    this.setState((state) => {
      var tags = state.tags;
      tags.push(tag);
      return { tags };
    });
  };

  tagOnDelete = (tag: Blotter.Tag) => {
    this.setState((state) => {
      var tags = state.tags.filter((_tag) => _tag.short != tag.short);
      return { tags };
    });
  };

  syncScroll = (top: number, height: number) => {
    if (this.state.preview === 2) {
      this.previewRef.current.scrollTop =
        (top / height) * this.previewRef.current.scrollHeight + this.state.offset;
    }
  };

  getValidInput = async () => {
    try {
      var obj = await this.formRef.current.validateFields(fieldsName);
    } catch (e) {
      throw e;
    }

    obj.tags = this.state.tags.map((tag) => tag.id);
    obj.publish_time = obj.publish_time.unix();
    obj.edit_time = obj.edit_time.unix();
    obj.raw = this.editor.getValue();
    obj.images = this.state.images.filter((item) => !!item);
    return obj as Blotter.PostAll;
  };

  getInput = () => {
    try {
      var obj = this.formRef.current.getFieldsValue(fieldsName);
    } catch (e) {
      throw e;
    }
    obj.tags = this.state.tags;
    obj.publish_time = (obj.publish_time as moment.Moment).format('YYYY-MM-DD HH:mm:ss');
    obj.edit_time = (obj.edit_time as moment.Moment).format('YYYY-MM-DD HH:mm:ss');
    obj.raw = this.editor.getValue();
    obj.images = this.state.images.filter((item) => !!item);
    return obj as Blotter.PostAll;
  };

  submit = async () => {
    this.setState({ submitDisabled: true });

    try {
      var obj = await this.getValidInput();
    } catch (e) {
      const err = e.errorFields.map((item) => item.errors.join(' ')).join('\n');
      notification.error({ message: '信息错误', description: err });
      this.setState({ submitDisabled: false });
      return;
    }

    postEdit(obj)
      .then((r) => {
        if (ShowNotification(r)) {
          Router.push(`/admin/post?url=${obj.url}`);
          this.getData(obj.url);
          removeLocalStorage(`post-${this.props.router.query.url as string}`);
        }
      })
      .finally(() => {
        this.setState({ submitDisabled: false });
      });
  };

  importImages = async () => {
    const html = await this.renderMarkdown(this.editor.getValue());
    const reg = new RegExp('<img ([^>]*)>', 'g');
    var images: string[] = [];
    do {
      var result = reg.exec(html);
      if (result !== null) {
        const part = result[1].split('=');
        var params: { [key: string]: string } = {};
        var key = '';
        var end = '';
        for (var i = 0; i < part.length; i++) {
          if (key === '') {
            key = part[i];
            end = part[i + 1][0];
          } else {
            const tmp = part[i].split(end);
            params[key] = tmp[1];
            key = tmp[2].trim();
          }
        }
        if (!!params['src']) {
          if (!!params['alt'] || !!params['title'])
            images.push(`${params['src']}#${!!params['title'] ? params['title'] : params['alt']}`);
          else images.push(params['src']);
        }
      }
    } while (result);
    this.setState({ images });
  };

  renderEditor = () => {
    const opts = {
      fontSize: this.state.fontSize,
      wordWrap: 'on',
      quickSuggestions: false,
      acceptSuggestionOnCommitCharacter: false,
      acceptSuggestionOnEnter: 'off',
      snippetSuggestions: 'none',
    };
    return (
      <div id="editor">
        <Context.Consumer>
          {(context) => (
            <Editor
              language="markdown"
              theme={context.theme == 'default' ? 'light' : 'dark'}
              //   value={this.state.raw}
              getRef={(ref) => {
                this.editor = ref;

                ref.onDidScrollChange((e) => {
                  this.syncScroll(e.scrollTop, e.scrollHeight);
                });

                // Save post when Ctrl + S clicked
                ref.addCommand(2097, this.submit);

                if (this.state.raw !== '') ref.setValue(this.state.raw);
              }}
              options={opts}
              onChange={this.onChange}
            />
          )}
        </Context.Consumer>
      </div>
    );
  };

  renderPreview = () => {
    try {
      var obj = this.getInput();
    } catch (e) {
      const err = e.errorFields.map((item) => item.errors.join(' ')).join('\n');
      notification.error({ message: '信息错误', description: err });
    }
    const post = { ...obj, content: this.state.html };
    return (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'check'} />
        <PostContent post={post} />
      </div>
    );
  };

  renderToolbar = () => {
    var md = this.state.preview === 2;
    return (
      <Row gutter={15}>
        <Col lg={24}>
          <Form.Item name="id">
            <Input disabled placeholder="文章ID" addonBefore="ID" />
          </Form.Item>
        </Col>
        <Col lg={md ? 12 : 6} md={12}>
          <Form.Item
            name="url"
            rules={[{ required: true, message: '文章必须有链接', whitespace: true }]}
          >
            <Input placeholder="文章链接" addonBefore="/post/" />
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 6} md={12}>
          <Form.Item name="view">
            <InputNumber placeholder="阅读量" min={0} />
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 6} md={12}>
          <Form.Item name="publish_time">
            <DatePicker showTime placeholder="发布时间" />
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 6} md={12}>
          <Form.Item name="edit_time">
            <DatePicker showTime placeholder="编辑时间" />
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 10} md={12}>
          <Form.Item name="title">
            <Input placeholder="文章标题"></Input>
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 8} md={12}>
          <Form.Item name="head_image">
            <Input
              placeholder="头图"
              onChange={(e) => {
                this.setState({ headImage: e.currentTarget.value });
              }}
            ></Input>
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 2} md={12}>
          <Form.Item name="published" valuePropName="checked">
            <Switch checkedChildren="发布" unCheckedChildren="草稿" />
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 2} md={12}>
          <Form.Item>
            <Button
              onClick={() => {
                this.editor.setValue(this.state.draft);
              }}
            >
              本地恢复
            </Button>
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 2} md={12}>
          <Form.Item>
            <InputNumber
              value={this.state.fontSize}
              onChange={(v) => this.setState({ fontSize: parseInt(v.toString()) }, () => {})}
            />
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 2} md={12}>
          <Form.Item>
            <Button
              onClick={() => {
                const now = moment(new Date());
                this.formRef.current.setFieldsValue({
                  publish_time: now,
                  edit_time: now,
                });
              }}
            >
              重置日期
            </Button>
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 2} md={12}>
          <Form.Item>
            <Button onClick={this.importImages}>导入图片</Button>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item>
            <TagSearch onAdd={this.tagOnAdd} onDelete={this.tagOnDelete} tags={this.state.tags} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="abstract">
            <Input.TextArea
              autoSize={{ minRows: 5 }}
              spellCheck="false"
              placeholder="文章摘要"
            ></Input.TextArea>
          </Form.Item>
        </Col>
        <Col span={24}>
          <List
            style={{ maxHeight: '50vh', overflow: 'auto' }}
            size="small"
            dataSource={this.state.images}
            renderItem={(image, idx) => (
              <List.Item key={idx}>
                <Row gutter={[5, 5]} className="fullWidth" align="middle">
                  <Col>
                    <strong>{idx}</strong>
                  </Col>
                  <Col>
                    <Popconfirm
                      title="确认删除？"
                      onConfirm={() =>
                        this.setState((state) => ({
                          images: state.images.filter((_, idx2) => idx != idx2),
                        }))
                      }
                    >
                      <Button danger>删除</Button>
                    </Popconfirm>
                  </Col>
                  <Col flex="1 1 auto">
                    <Input
                      value={image}
                      onChange={(e) => {
                        const value = e.target.value;
                        this.setState((state) => {
                          var { images } = state;
                          images[idx] = value;
                          return { images };
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <img src={image} style={{ maxHeight: '100px' }} />
                  </Col>
                </Row>
              </List.Item>
            )}
          />
          <Row justify="end">
            <Col>
              <Button
                onClick={() =>
                  this.setState((state) => {
                    var { images } = state;
                    images.push('');
                    return { images };
                  })
                }
              >
                新建一个图片
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  renderOffset = () => {
    const diff = 10;
    const scroll = (diff: number) => {
      this.setState(
        (state) => ({ offset: state.offset + diff }),
        () => {
          if (!!this.editor)
            this.syncScroll(this.editor.getScrollTop(), this.editor.getScrollHeight());
        },
      );
    };

    return (
      <Button.Group>
        <Press
          size="small"
          initArg={-diff}
          onClick={() => scroll(-diff)}
          onPressing={(arg) => {
            scroll(arg - diff);
            return arg - diff;
          }}
          ms={100}
          icon={<MinusOutlined />}
        />
        <Press
          size="small"
          initArg={diff}
          onClick={() => scroll(diff)}
          onPressing={(arg) => {
            scroll(arg + diff);
            return arg + diff;
          }}
          ms={100}
          icon={<PlusOutlined />}
        />
      </Button.Group>
    );
  };

  renderImages = () => {
    return (
      <div>
        <Button
          shape="circle"
          danger={this.state.upload}
          onClick={() => this.setState((state) => ({ upload: !state.upload }))}
          icon={<FileImageOutlined />}
        />
        <div
          className={['upload', 'shadow'].join(' ')}
          style={{
            right: 120,
            top: 180,
            ...(this.state.upload
              ? { opacity: 1, visibility: 'visible' }
              : { opacity: 0, visibility: 'hidden' }),
          }}
        >
          <Qiniu defaultTab="upload" />
        </div>
      </div>
    );
  };

  previewClick = (e: RadioChangeEvent) => {
    const v = e.target.value;
    this.setState(
      {
        preview: v,
      },
      () => {
        if (!!this.editor) this.editor.layout();
        this.renderMarkdown(this.editor.getValue());
      },
    );
  };

  renderPreviewButton = () => {
    return (
      <Radio.Group
        value={this.state.preview}
        buttonStyle="solid"
        onChange={this.previewClick}
        size="small"
        style={{ flexDirection: 'column', display: 'flex' }}
      >
        <Radio.Button value={0}>编辑</Radio.Button>
        <Radio.Button value={1}>预览</Radio.Button>
        <Radio.Button value={2}>双栏</Radio.Button>
      </Radio.Group>
    );
  };

  renderFixedButton = () => {
    const items = [
      this.renderPreviewButton(),
      this.renderOffset(),
      <Button.Group>
        <Button
          size="small"
          icon={<ShrinkOutlined onClick={() => this.editor.trigger('fold', 'editor.foldAll')} />}
        />
        <Button
          size="small"
          icon={<ArrowsAltOutlined />}
          onClick={() => this.editor.trigger('unfold', 'editor.unfoldAll')}
        />
      </Button.Group>,
      <Button
        shape="circle"
        onClick={() => {
          const editor = document.getElementById('editor');
          if (!!editor && editor.offsetTop > 0) {
            scrollTo(0, editor.offsetTop + 10);
          }
        }}
        icon={<FormOutlined />}
      />,
      this.renderImages(),
      <Button
        loading={this.state.submitDisabled}
        onClick={this.submit}
        shape="circle"
        icon={<SaveOutlined />}
        type="primary"
      />,
    ];
    return (
      <Space size={15} className={styles.fixed_button}>
        {items.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </Space>
    );
  };

  render() {
    return (
      <Container xxl={20} xl={20} lg={20} md={24} sm={24} xs={24}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`文章编辑|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <MediaQuery minDeviceWidth={dimensionMaxMap.lg} onChange={this.onBigScreen}>
          {null}
        </MediaQuery>
        {this.renderFixedButton()}
        <Row gutter={5}>
          <Col span={this.state.preview == 2 ? 12 : 24}>
            <Card>
              <Form
                ref={this.formRef}
                initialValues={{
                  id: '',
                  title: '',
                  url: '',
                  abstract: '',
                  head_image: '',
                  view: 0,
                  publish_time: this.now,
                  edit_time: this.now,
                  published: false,
                  raw: '',
                }}
              >
                <Space>
                  {this.renderToolbar()}
                  {this.state.preview === 1 ? this.renderPreview() : null}
                  <div style={{ display: this.state.preview === 1 ? 'none' : 'unset' }}>
                    {this.renderEditor()}
                  </div>
                </Space>
              </Form>
            </Card>
          </Col>

          {this.state.preview == 2 ? (
            <Col span={12}>
              <div className={styles.preview + ' shadow'} ref={this.previewRef}>
                <Card>
                  {this.renderPreview()}
                  <div style={{ height: 'calc(100vh - 20px)' }}></div>
                </Card>
              </div>
            </Col>
          ) : null}
        </Row>
      </Container>
    );
  }
}

export default withRouter(PostEdit);
