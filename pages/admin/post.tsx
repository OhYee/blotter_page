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
} from 'antd';
import { Icon } from '@ant-design/compatible';
import { FormOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

import moment from 'moment';
import MediaQuery from 'react-responsive';
import { ControlledEditor } from '@monaco-editor/react/lib/';

import Container from '@/components/container';
import TagSearch from '@/components/tag_search';

import { waitUntil } from '@/utils/debounce';
import { markdown, adminPost, postExist, postEdit } from '@/utils/api';
import { dimensionMaxMap } from '@/utils/responsive';

import styles from '@/pages/post/post.less';

import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';
import { setLocalStorage, getLocalStorage } from '@/utils/storage';

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

interface PostEditProps extends ComponentProps<'base'>, WithRouterProps {}

interface PostEditState {
  raw: string;
  html: string;
  bigScreen: boolean;
  preview: boolean;
  loading: boolean;
  tags: Blotter.Tag[];
  headImage: string;
  submitDisabled: boolean;
  draft: string;
  fontSize: number;
}

class PostEdit extends React.Component<PostEditProps, PostEditState> {
  static defaultProps = {};
  formRef = React.createRef<FormInstance>();
  previewRef = React.createRef<Card & HTMLDivElement>();
  now = moment(new Date());
  editor: any;

  constructor(props: any) {
    super(props);
    this.state = {
      raw: '',
      html: '',
      preview: false,
      bigScreen: true,
      loading: false,
      tags: [],
      headImage: '',
      submitDisabled: false,
      draft: '',
      fontSize: 16,
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
    this.setState({ tags: r.tags, html: r.content, raw: r.raw }, () => {
      console.log('got data', r.raw.length);
      if (!!this.editor) this.editor.setValue(r.raw);
    });
  };

  onBigScreen = (match: boolean) => {
    this.setState({ bigScreen: match });
  };

  renderMarkdown = async (source: string) => {
    this.setState({ loading: true });
    var r = await markdown(source);
    this.setState({ html: r.html, loading: false });
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

  previewClick = () => {
    if (!this.state.preview) {
      this.renderMarkdown(this.editor.getValue());
    }
    this.setState(
      (state) => ({
        preview: !state.preview,
      }),
      () => {
        if (!!this.editor) this.editor.layout();
      },
    );
  };

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

  isSidePreview = () => {
    return this.state.bigScreen && this.state.preview;
  };

  syncScroll = (top: number, height: number) => {
    if (this.isSidePreview()) {
      this.previewRef.current.scrollTop = (top / height) * this.previewRef.current.scrollHeight;
    }
  };
  submit = async () => {
    this.setState({ submitDisabled: true });
    var obj = this.formRef.current.getFieldsValue([
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
    ]);
    obj.tags = this.state.tags.map((tag) => tag.id);
    obj.publish_time = obj.publish_time.unix();
    obj.edit_time = obj.edit_time.unix();
    obj.raw = this.editor.getValue();
    var r = await postEdit(obj as Blotter.PostAll);
    ShowNotification(r);
    this.setState({ submitDisabled: false });
    Router.push(`/admin/post?url=${obj.url}`);
    this.getData(obj.url);
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
    return (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'check'} />
        <article className={styles.post}>
          {this.state.headImage ? <img src={this.state.headImage} /> : null}
          <Divider />
          <section className="post-content" dangerouslySetInnerHTML={{ __html: this.state.html }} />
        </article>
      </div>
    );
  };

  renderToolbar = () => {
    var md = this.isSidePreview();
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
          <Form.Item>
            <Button onClick={this.previewClick}>
              <Icon type={this.state.preview ? 'eye-invisible' : 'eye'} />
            </Button>
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 2} md={12}>
          <Form.Item name="published" valuePropName="checked">
            <Switch checkedChildren="发布" unCheckedChildren="草稿" />
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 2} md={12}>
          <Form.Item>
            <Button loading={this.state.submitDisabled} onClick={this.submit} type="primary">
              提交
            </Button>
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
              onChange={(v) => this.setState({ fontSize: v }, () => {})}
            />
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
      </Row>
    );
  };

  renderJump = () => (
    <Button
      shape="circle"
      size="large"
      type="primary"
      style={{ position: 'fixed', right: '20px', top: '60px' }}
      onClick={() => {
        const editor = document.getElementById('editor');
        if (!!editor && editor.offsetTop > 0) {
          scrollTo(0, editor.offsetTop + 10);
        }
      }}
      icon={<FormOutlined />}
    />
  );

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
        {this.renderJump()}
        <Row gutter={5}>
          <Col span={this.isSidePreview() ? 12 : 24}>
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
                {this.renderToolbar()}
                {this.state.preview && !this.state.bigScreen
                  ? this.renderPreview()
                  : this.renderEditor()}
              </Form>
            </Card>
          </Col>

          {this.isSidePreview() ? (
            <Col span={12}>
              <div className={styles.preview + ' shadow'} ref={this.previewRef}>
                <Card style={{ minHeight: '100%' }}>{this.renderPreview()}</Card>
              </div>
            </Col>
          ) : null}
        </Row>
      </Container>
    );
  }
}

export default withRouter(PostEdit);
