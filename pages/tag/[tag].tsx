import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { NextPageContext } from 'next';

import PostList from '@/components/post_list';

import { parseNumberParams, parseStringParams } from '@/utils/parse';
import { tagPosts } from '@/utils/api';
import { Context } from '@/utils/global';

interface TagDetailProps extends ComponentProps<'base'>, WithRouterProps {
  page: number;
  total: number;
  size: number;
  posts: Blotter.PostCard[];
}

interface TagDetailState {}

class TagDetail extends React.Component<TagDetailProps, TagDetailState> {
  static defaultProps = {
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
  }

  static async getInitialProps(args: NextPageContext) {
    var page = parseNumberParams('page', args.asPath, 1);
    var size = parseNumberParams('size', args.asPath, 10);
    var tag = parseStringParams('tag', args.asPath);
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
    Router.push(`/tag/${this.props.router.query.tag}?size=${size}&page=${page}`);
  };

  render() {
    console.log('render', this.props, this.state);
    return (
      <div>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`标签页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <PostList
          posts={this.props.posts}
          page={this.props.page}
          size={this.props.size}
          total={this.props.total}
          callback={this.onChange}
        />
      </div>
    );
  }
}

export default withRouter(TagDetail);
