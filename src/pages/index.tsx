import React, { ComponentProps } from 'react';

import PostList from '@/components/post_list';

import { indexPosts, InitialPropsParam } from '@/utils/api';

type IndexProps = {
  posts: Blotter.PostCard[];
};

type IndexState = {};

class Index extends React.Component<IndexProps & ComponentProps<'base'>, IndexState> {
  static defaultProps: IndexProps = { posts: [] };

  static async getInitialProps(args: InitialPropsParam) {
    var data = await indexPosts();
    return {
      posts: data.posts,
    } as IndexProps;
  }

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <PostList posts={this.props.posts} />;
  }
}

export default Index;
