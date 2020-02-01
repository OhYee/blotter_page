import React, { ComponentProps } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import router from 'umi/router';

import PostList from '@/components/post_list';

import { archives, InitialPropsParam } from '@/utils/api';
import { parseNumberParams } from '@/utils/parse';

type ArchivesProps = {
  page: number;
  total: number;
  size: number;
  posts: (Blotter.PostCard | undefined)[];
};

type ArchivesState = {
  loading: boolean;
};

export class Archives extends React.Component<
  ArchivesProps & ComponentProps<'base'> & RouteComponentProps,
  ArchivesState
> {
  static defaultProps: ArchivesProps = {
    page: 1,
    total: 1,
    size: 10,
    posts: Array(10).fill(undefined),
  };

  static async getInitialProps(args: InitialPropsParam) {
    console.log('Archives getInitialProps', args);
    var page = parseNumberParams('page', args.location, 1);
    var size = parseNumberParams('size', args.location, 10);
    var data = await archives(page, size);
    console.log({
      page: page,
      size: size,
      posts: data.posts,
      total: data.total,
    } as ArchivesProps);
    return {
      page: page,
      size: size,
      posts: data.posts,
      total: data.total,
    } as ArchivesProps;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };

    console.log('Archives constructor', this.props, this.state);
  }

  onChange = (page: number, size?: number): void => {
    console.log('onChange', page, size);
    if (typeof size === 'undefined') {
      size = this.props.size;
    }
    router.push(`/archives?size=${size}&page=${page}`);
  };

  render() {
    console.log('render', this.props, this.state);
    return (
      <PostList
        posts={this.props.posts}
        page={this.props.page}
        size={this.props.size}
        total={this.props.total}
        loading={this.state.loading}
        callback={this.onChange}
      />
    );
  }
}

export default withRouter(Archives);
