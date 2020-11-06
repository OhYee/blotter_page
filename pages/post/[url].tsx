import React, { ComponentProps, Fragment } from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import CommentPart from '@/components/comment';
import { Flex } from '@/components/container';
import PostContent from '@/components/post_content';
import { Qzone, QQ, Link } from '@/components/svg';
import Card from '@/components/card';
import Avatar from '@/components/avatar';
import Button, { A } from '@/components/button';
import Anchor from '@/components/anchor';

import { post, view } from '@/utils/api';
import { Context } from '@/utils/global';

import './post.module.scss';

interface PostPageProps extends ComponentProps<'base'>, WithRouterProps {
  post: Blotter.Post;
}

interface PostPageState {}

class PostPage extends React.Component<PostPageProps, PostPageState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

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
          return (
            <Flex direction="TB" mainAxis="flex-start" fullWidth>
              <Flex direction="LR">
                <Flex.Item style={{ flex: '0 0 5em', display: 'flex', justifyContent: 'center' }}>
                  <Avatar src={context.avatar} style={{ width: '5em', height: '5em' }} />
                </Flex.Item>
                <Flex.Item style={{ flex: '1 1 auto' }}>
                  <strong>{context.author}</strong>
                  <div>
                    本文章发布自 <a href={context.root}>{context.blog_name}</a>，原文『
                    <a href={url}>{this.props.post.title}</a>』
                    <br />
                    如无特别说明，可以直接转载，但请注明原文出处链接：
                    <a href={url}>{url}</a>
                  </div>
                </Flex.Item>
              </Flex>
              <Flex direction="LR" mainAxis="space-around">
                <A
                  target="_blank"
                  href={`http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(
                    url,
                  )}&sharesource=qzone&title=${encodeURIComponent(this.props.post.title)}&pics=${
                    this.props.post.head_image
                  }&summary=${this.props.post.abstract}&desc=${this.props.post.abstract}`}
                  icon={<QQ />}
                />
                <A
                  target="_blank"
                  href={`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(
                    url,
                  )}&sharesource=qzone&title=${encodeURIComponent(this.props.post.title)}&pics=${
                    this.props.post.head_image
                  }&summary=${this.props.post.abstract}`}
                  icon={<Qzone />}
                />
                <Button icon={<Link />} onClick={() => alert(`请复制：${url}`)} />
              </Flex>
            </Flex>
          );
        }}
      </Context.Consumer>
    );
  };

  render() {
    return typeof this.props.post === 'undefined' ? null : (
      <React.Fragment>
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
        <Flex
          direction="TB"
          fullWidth
          style={{
            maxWidth: this.context.big_screen ? 'calc(100vw - 600px)' : '100%',
            margin: 'auto',
          }}
        >
          <Card
            neumorphism
            style={{ padding: this.context.big_screen ? 20 : 0 }}
            mainStyle={this.context.big_screen ? {} : { padding: 10 }}
          >
            <PostContent post={this.props.post} />
          </Card>
          <Card neumorphism>{this.render_share()}</Card>
          <Card neumorphism>
            <CommentPart url={`/post/${this.props.router.query.url as string}`} />
          </Card>
        </Flex>
        <Anchor
          style={{ position: 'fixed' }}
          content={this.props.post.content}
          suffixAnchors={[{ name: '评论区', id: 'blotter-comment', level: 1 }]}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(PostPage);
