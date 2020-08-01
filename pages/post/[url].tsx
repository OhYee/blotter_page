import React, { ComponentProps, Fragment } from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { Card, Anchor, Avatar, message } from 'antd';
import AntdIcon, { LinkOutlined, QqOutlined } from '@ant-design/icons';

import CommentPart from '@/components/comment';
import Container, { Space } from '@/components/container';
import PostContent from '@/components/post_content';

import { post, view } from '@/utils/api';
import { Context } from '@/utils/global';

import './post.less';
import If from '@/components/if';

function QzoneSVG() {
  return (
    <svg
      viewBox="0 0 1028 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width="1em"
      height="1em"
    >
      <path
        d="M852.982272 693.76c-46.08 23.04-58.88 43.52-48.64 94.72 10.24 53.76 23.04 110.08 33.28 163.84 2.56 10.24 0 23.04 0 33.28-15.36-2.56-35.84 0-48.64-7.68-30.72-17.92-58.88-43.52-92.16-64-58.88-35.84-117.76-69.12-186.88-76.8-12.8-2.56-25.6 0-35.84 5.12-79.36 43.52-158.72 87.04-235.52 133.12-17.92 10.24-33.28 12.8-46.08 0-7.68-7.68-5.12-23.04-5.12-35.84 15.36-92.16 33.28-186.88 51.2-279.04 2.56-17.92 0-30.72-15.36-43.52-71.68-64-140.8-125.44-209.92-192-7.68-5.12-15.36-20.48-12.8-25.6 2.56-7.68 15.36-15.36 25.6-15.36 94.72-12.8 186.88-25.6 281.6-38.4 17.92-2.56 28.16-10.24 35.84-25.6 51.2-89.6 102.4-179.2 153.6-268.8 5.12-7.68 12.8-12.8 17.92-20.48 7.68 7.68 15.36 12.8 17.92 20.48 43.52 89.6 87.04 181.76 128 273.92 7.68 17.92 20.48 28.16 40.96 28.16 99.84 7.68 197.12 17.92 296.96 28.16 7.68 0 15.36 7.68 23.04 10.24-5.12 7.68-7.68 17.92-12.8 23.04-66.56 66.56-135.68 133.12-202.24 199.68-15.36 15.36-25.6 40.96-43.52 69.12-92.16-7.68-194.56-15.36-304.64-23.04 104.96-74.24 204.8-145.92 309.76-222.72-186.88-48.64-366.08-38.4-545.28-2.56 0 2.56 0 7.68 0 10.24 122.88 7.68 245.76 17.92 368.64 25.6 2.56 2.56 2.56 5.12 5.12 7.68-7.68 7.68-15.36 15.36-25.6 20.48-89.6 58.88-179.2 115.2-266.24 174.08-10.24 7.68-20.48 15.36-30.72 25.6C474.102272 734.72 663.542272 711.68 852.982272 693.76z"
        p-id="2294"
      ></path>
    </svg>
  );
}

interface PostPageProps extends ComponentProps<'base'>, WithRouterProps {
  post: Blotter.Post;
}

interface PostPageState {}

class PostPage extends React.Component<PostPageProps, PostPageState> {
  static defaultProps = {
    anchors: [],
  };

  static async getInitialProps(args: NextPageContext) {
    var url = args.query.url;
    if (Array.isArray(url)) {
      url = url[0];
    }
    var r = await post(url);
    return { post: r } as PostPageProps;
  }

  constructor(props: PostPageProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var url = this.props.router.query.url;
    if (Array.isArray(url)) {
      url = url[0];
    }
    view(url);
  }

  render_share = () => {
    return (
      <Context.Consumer>
        {(context) => {
          if (typeof document === 'undefined') return null;
          const url = `${context.root.replace(/\/$/, '')}/${document.location.pathname.replace(
            /^\//,
            '',
          )}`;
          const shares = [
            <a
              target="_blank"
              href={`http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(
                url,
              )}&sharesource=qzone&title=${encodeURIComponent(this.props.post.title)}&pics=${
                this.props.post.head_image
              }&summary=${this.props.post.abstract}&desc=${this.props.post.abstract}`}
            >
              <QqOutlined />
            </a>,
            <a
              target="_blank"
              href={`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(
                url,
              )}&sharesource=qzone&title=${encodeURIComponent(this.props.post.title)}&pics=${
                this.props.post.head_image
              }&summary=${this.props.post.abstract}`}
            >
              <AntdIcon component={QzoneSVG} />
            </a>,
            <LinkOutlined
              onClick={() => {
                message.info(`请复制：${url}`, 10);
              }}
            />,
          ];
          return (
            <Card actions={shares}>
              <Card.Meta
                avatar={<Avatar src={context.avatar} />}
                title={context.author}
                description={
                  <div>
                    本文章发布自 <a href={context.root}>{context.blog_name}</a>，原文『
                    <a href={url}>{this.props.post.title}</a>』
                    <br />
                    如无特别说明，可以直接转载，但请注明原文出处链接：
                    <a href={url}>{url}</a>
                  </div>
                }
              />
            </Card>
          );
        }}
      </Context.Consumer>
    );
  };

  render() {
    return typeof this.props.post === 'undefined' ? null : (
      <Container lg={16}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`${this.props.post.title}|${context.blog_name}`}</title>
              <meta
                name="keywords"
                key="keywords"
                content={
                  Array.isArray(this.props.post.keywords) ? this.props.post.keywords.join(',') : ''
                }
              />
              <meta key="description" name="description" content={this.props.post.abstract} />
            </Head>
          )}
        </Context.Consumer>
        <Space>
          <Card>
            <PostContent post={this.props.post} />
          </Card>
          {this.render_share()}
          <Card>
            <CommentPart url={`/post/${this.props.router.query.url as string}`} />
          </Card>
        </Space>
      </Container>
    );
  }
}

export default withRouter(PostPage);
