import React, { ComponentProps } from 'react';
import router from 'umi/router';

import PostList from '@/components/post_list';
import { withRouter, RouteComponentProps } from 'react-router';
import { InitialPropsParam, markdown, tagsSearch, adminPost } from '@/utils/api';
import Container from '@/components/container';
import {
  Card,
  Row,
  Col,
  Input,
  Form,
  Icon,
  Button,
  DatePicker,
  InputNumber,
  Switch,
  Divider,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { waitUntil } from '@/utils/debounce';
import MediaQuery from 'react-responsive';
import { dimensionMaxMap } from '@/utils/responsive';
import TagSearch from '@/components/tag_search';
import { parseStringParams } from '@/utils/parse';

import styles from '@/pages/post/post.less';
import moment from 'moment';
import withRoute from 'umi/router';

interface PostEditProps extends ComponentProps<'base'>, FormComponentProps, RouteComponentProps {}

interface PostEditState {
  raw: string;
  html: string;
  bigScreen: boolean;
  preview: boolean;
  loading: boolean;
  tags: Blotter.Tag[];
  headImage: string;
}

class PostEdit extends React.Component<PostEditProps, PostEditState> {
  static defaultProps = {};
  now = moment(new Date());
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
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    var url = parseStringParams('url', this.props.location.search);
    var r = await adminPost(url);
    this.props.form.setFieldsValue({
      id: r.id,
      title: r.title,
      url: r.url,
      abstract: r.abstract,
      head_image: r.head_image,
      view: r.view,
      publish_time: moment(new Date(r.publish_time)),
      edit_time: moment(new Date(r.edit_time)),
      published: r.published,
      raw: r.raw,
    });
    this.setState({ tags: r.tags, html: r.content });
  };

  onBigScreen = (match: boolean) => {
    console.log(match);
    this.setState({ bigScreen: match });
  };

  renderMarkdown = (source: string) => {
    waitUntil(
      'post_edit_sync',
      async () => {
        this.setState({ loading: true });
        var r = await markdown(source);
        this.setState({ html: r.html, loading: false });
      },
      1000,
    );
  };

  onChange = (current: string, pre: string) => {
    if (this.state.preview) {
      this.renderMarkdown(current);
    }
    return current;
  };

  previewClick = () => {
    if (!this.state.preview) {
      this.renderMarkdown(this.props.form.getFieldValue('raw'));
    }
    this.setState(state => ({
      preview: !state.preview,
    }));
  };

  tagOnAdd = (tag: Blotter.Tag) => {
    this.setState(state => {
      var tags = state.tags;
      tags.push(tag);
      return { tags };
    });
  };

  tagOnDelete = (tag: Blotter.Tag) => {
    this.setState(state => {
      var tags = state.tags.filter(_tag => _tag.short != tag.short);
      return { tags };
    });
  };

  renderEditor = () => {
    return (
      <Form.Item>
        {this.props.form.getFieldDecorator(`raw`, { normalize: this.onChange })(
          <Input.TextArea autoSize={{ minRows: 15 }} spellCheck="false"></Input.TextArea>,
        )}
      </Form.Item>
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
    var md = this.state.bigScreen && this.state.preview;
    return (
      <Row gutter={15}>
        <Col lg={24}>
          <Form.Item>
            {this.props.form.getFieldDecorator(`id`)(
              <Input disabled placeholder="文章ID" addonBefore="ID"></Input>,
            )}
          </Form.Item>
        </Col>
        <Col lg={md ? 12 : 6} md={12}>
          <Form.Item>
            {this.props.form.getFieldDecorator(`url`)(
              <Input placeholder="文章链接" addonBefore="/post/"></Input>,
            )}
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 6} md={12}>
          <Form.Item>
            {this.props.form.getFieldDecorator(`view`, {
              initialValue: 0,
            })(<InputNumber placeholder="阅读量" min={0} />)}
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 6} md={12}>
          <Form.Item>
            {this.props.form.getFieldDecorator(`publish_time`, {
              initialValue: this.now,
            })(<DatePicker showTime placeholder="发布时间" />)}
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 6} md={12}>
          <Form.Item>
            {this.props.form.getFieldDecorator(`update_time`, {
              initialValue: this.now,
            })(<DatePicker showTime placeholder="编辑时间" />)}
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 10} md={12}>
          <Form.Item>
            {this.props.form.getFieldDecorator(`title`)(<Input placeholder="文章标题"></Input>)}
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 8} md={12}>
          <Form.Item>
            {this.props.form.getFieldDecorator(`head_image`)(
              <Input
                placeholder="头图"
                onChange={e => {
                  console.log(e.currentTarget.value);
                  this.setState({ headImage: e.currentTarget.value });
                }}
              ></Input>,
            )}
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
          <Form.Item>
            {this.props.form.getFieldDecorator(`published`, {
              initialValue: false,
            })(<Switch checkedChildren="发布" unCheckedChildren="草稿" defaultChecked />)}
          </Form.Item>
        </Col>

        <Col lg={md ? 12 : 2} md={12}>
          <Form.Item>
            <Button onClick={this.previewClick} type="primary">
              提交
            </Button>
          </Form.Item>
        </Col>

        <Col lg={24}>
          <Form.Item>
            <TagSearch onAdd={this.tagOnAdd} onDelete={this.tagOnDelete} tags={this.state.tags} />
          </Form.Item>
        </Col>

        <Col lg={24}>
          <Form.Item>
            {this.props.form.getFieldDecorator(`abstract`)(
              <Input.TextArea
                autoSize={{ minRows: 5 }}
                spellCheck="false"
                placeholder="文章摘要"
              ></Input.TextArea>,
            )}
          </Form.Item>
        </Col>
      </Row>
    );
  };
  render() {
    return (
      <Container xxl={20} xl={20} lg={20} md={24} sm={24} xs={24}>
        <MediaQuery minDeviceWidth={dimensionMaxMap.lg} onChange={this.onBigScreen}>
          {null}
        </MediaQuery>
        <Row gutter={5}>
          <Col span={this.state.bigScreen && this.state.preview ? 12 : 24}>
            <Card>
              <Form>
                {this.renderToolbar()}
                {this.state.preview && !this.state.bigScreen
                  ? this.renderPreview()
                  : this.renderEditor()}
              </Form>
            </Card>
          </Col>

          {this.state.bigScreen && this.state.preview ? (
            <Col span={12}>
              <Card>{this.renderPreview()}</Card>
            </Col>
          ) : null}
        </Row>
      </Container>
    );
  }
}

export default Form.create<PostEditProps>({ name: 'PostEdit' })(withRouter(PostEdit));
