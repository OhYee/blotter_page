import React, { ComponentProps } from 'react';

import { Pagination } from 'antd';

import PostCard from '@/components/post_card';
import Container from '@/components/container';

type PostListProps = {
  posts: (Blotter.PostCard | undefined)[];
  loading?: boolean;
  page?: number;
  size?: number;
  total?: number;
  callback?: (page: number, size?: number) => void;
};

type PostListState = {};

class PostList extends React.Component<PostListProps & ComponentProps<'base'>, PostListState> {
  static defaultProps: PostListProps = {
    posts: [],
    page: undefined,
    total: undefined,
    size: undefined,
    loading: undefined,
    callback: undefined,
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    console.log('1', this.props);
  }

  componentDidUpdate() {
    console.log('2', this.props);
  }
  render_page = () => {
    return typeof this.props.page != 'undefined' &&
      typeof this.props.size != 'undefined' &&
      typeof this.props.total != 'undefined' ? (
      <Container>
        <Pagination
          showQuickJumper
          showSizeChanger
          current={this.props.page}
          pageSize={this.props.size}
          total={this.props.total}
          onChange={this.props.callback}
          onShowSizeChange={this.props.callback}
          disabled={!this.props.callback}
        />
      </Container>
    ) : null;
  };

  render() {
    return (
      <div>
        {this.props.posts.map((post: Blotter.PostCard | undefined, index: number) => (
          <Container key={typeof post === 'undefined' ? index : post.url}>
            <PostCard post={post} loading={this.props.loading} />
          </Container>
        ))}
        {this.render_page()}
      </div>
    );
  }
}

export default PostList;
