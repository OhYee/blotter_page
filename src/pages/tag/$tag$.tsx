import React, { ComponentProps } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import router from 'umi/router';

import PostList from '@/components/post_list';

import { InitialPropsParam, tagPosts } from '@/utils/api';
import { parseNumberParams } from '@/utils/parse';
import { Card } from 'antd';

type TagDetailProps = {
  page: number;
  total: number;
  size: number;
  posts: Blotter.PostCard[];
};

type TagDetailState = {};

class TagDetail extends React.Component<
  TagDetailProps & ComponentProps<'base'> & RouteComponentProps,
  TagDetailState
> {
  static defaultProps: TagDetailProps = {
    page: 1,
    total: 1,
    size: 10,
    posts: [],
  };

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };

    console.log('TagDetail constructor', this.props, this.state);
  }

  static async getInitialProps(args: InitialPropsParam) {
    console.log('TagDetail getInitialProps', args);
    var page = parseNumberParams('page', args.location, 1);
    var size = parseNumberParams('size', args.location, 10);
    var tag = args.route.params['tag'];
    var data = await tagPosts(tag, page, size);
    console.log({
      page: page,
      size: size,
      posts: data.posts,
      total: data.total,
    } as TagDetailProps);
    return {
      page: page,
      size: size,
      posts: data.posts,
      total: data.total,
    } as TagDetailProps;
  }

  onChange = (page: number, size?: number): void => {
    console.log('onChange', page, size);
    if (typeof size === 'undefined') {
      size = this.props.size;
    }
    router.push(
      `/tag/${
        (this.props.match.params as { [key: string]: string }).tag
      }?size=${size}&page=${page}`,
    );
  };

  render() {
    console.log('render', this.props, this.state);
    return (
      <PostList
        posts={this.props.posts}
        page={this.props.page}
        size={this.props.size}
        total={this.props.total}
        callback={this.onChange}
      />
    );
  }
}

export default withRouter(TagDetail);
