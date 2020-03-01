import React, { ComponentProps } from 'react';

import { List } from 'antd';

import PostCard from '@/components/post_card';
import Container from '@/components/container';

type PostListProps = {
  posts: (Blotter.PostCard | undefined)[];
  loading?: boolean;
  page?: number;
  size?: number;
  total?: number;
  callback?: (page: number, size?: number) => void;
  header?: string;
  pageRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactElement<HTMLElement>,
  ) => React.ReactNode;
};

type PostListState = {};

class PostList extends React.Component<PostListProps & ComponentProps<'base'>, PostListState> {
  static defaultProps: PostListProps = {
    posts: [],
    page: undefined,
    total: 0,
    size: undefined,
    loading: false,
    callback: undefined,
    header: undefined,
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    var pagination =
      typeof this.props.callback === 'undefined'
        ? false
        : {
            showQuickJumper: true,
            showSizeChanger: true,
            current: this.props.page,
            pageSize: this.props.size,
            total: this.props.total,
            onChange: this.props.callback,
            onShowSizeChange: this.props.callback,
            itemRender: this.props.pageRender,
          };
    return (
      <List
        itemLayout="horizontal"
        grid={{ column: 1, gutter: 10 }}
        header={this.props.header}
        dataSource={this.props.posts}
        renderItem={post => (
          <List.Item key={post.url}>
            <PostCard post={post} loading={this.props.loading} />
          </List.Item>
        )}
        split={false}
        pagination={pagination}
      />
    );
  }
}

export default PostList;
