import React, { ComponentProps } from 'react';

import PostList from '@/components/post_list';

import { indexPosts, InitialPropsParam } from '@/utils/api';
import { Input, Card } from 'antd';
import Container from '@/components/container';

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

  render_search = () => {
    return (
      <Container>
        <Card className="shadow">
          <Input placeholder="搜索文章(还没做，反正也不急着用)" disabled />
        </Card>
      </Container>
    );
  };
  render() {
    return (
      <div>
        {this.render_search()}
        <PostList posts={this.props.posts} />
      </div>
    );
  }
}

export default Index;
