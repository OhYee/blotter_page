import React, { ComponentProps } from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';

import { Input, Card } from 'antd';

import Container from '@/components/container';
import PostList from '@/components/post_list';

import { Context } from '@/utils/global';

import { indexPosts } from '@/utils/api';

interface IndexProps extends ComponentProps<'base'> {
  posts: Blotter.PostCard[];
}

interface IndexState {}

class Index extends React.Component<IndexProps, IndexState> {
  static defaultProps = { posts: [] };

  static async getInitialProps(args: NextPageContext) {
    var data = await indexPosts();
    return {
      posts: data.posts,
    } as IndexProps;
  }

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render_search = () => {
    return (
      <Card className="shadow" style={{ marginBottom: '20px' }}>
        <Input placeholder="搜索文章(还没做，反正也不急着用)" disabled />
      </Card>
    );
  };
  render() {
    return (
      <Container>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`首页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        {this.render_search()}
        <PostList posts={this.props.posts} />
      </Container>
    );
  }
}

export default Index;
