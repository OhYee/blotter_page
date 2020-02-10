import React, { ComponentProps } from 'react';

import Head from 'next/head';

import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import PostList from '@/components/post_list';

import { archives } from '@/utils/api';
import { parseNumberParams } from '@/utils/parse';
import { GlobalProps, InitialPropsParam } from '@/utils/global';

interface ArchivesProps extends GlobalProps, ComponentProps<'base'>, WithRouterProps {
  page: number;
  total: number;
  size: number;
  posts: (Blotter.PostCard | undefined)[];
}

interface ArchivesState {
  loading: boolean;
}

export class Archives extends React.Component<ArchivesProps, ArchivesState> {
  static defaultProps = {
    page: 1,
    total: 1,
    size: 10,
    posts: Array(10).fill(undefined),
  };

  static async getInitialProps(args: InitialPropsParam) {
    console.log('Archives getInitialProps', args);
    var page = parseNumberParams('page', args.asPath, 1);
    var size = parseNumberParams('size', args.asPath, 10);
    var data = await archives(page, size);
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
  }

  onChange = (page: number, size?: number): void => {
    if (typeof size === 'undefined') {
      size = this.props.size;
    }
    Router.push(`/archives?size=${size}&page=${page}`);
  };

  render() {
    return (
      <div>
        <Head>
          <title>{`第${this.props.page}页|文章归档|${this.props.blog_name}`}</title>
        </Head>
        <PostList
          posts={this.props.posts}
          page={this.props.page}
          size={this.props.size}
          total={this.props.total}
          loading={this.state.loading}
          callback={this.onChange}
        />
      </div>
    );
  }
}

export default withRouter(Archives);
