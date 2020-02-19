import React, { ComponentProps } from 'react';

import Head from 'next/head';
import { NextPageContext } from 'next';
import Link from 'next/link';

import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import PostList from '@/components/post_list';
import Container from '@/components/container';

import { archives } from '@/utils/api';
import { parseNumberParams } from '@/utils/parse';
import { Context } from '@/utils/global';

interface ArchivesProps extends ComponentProps<'base'>, WithRouterProps {
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

  static async getInitialProps(args: NextPageContext) {
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
    if (typeof size !== 'undefined' && size != this.props.size) {
      Router.push(`/archives?page=${page}&size=${size}`);
    }
  };

  render() {
    return (
      <Container>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`第${this.props.page}页|归档页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <PostList
          header={`共${this.props.total}篇文章`}
          posts={this.props.posts}
          page={this.props.page}
          size={this.props.size}
          total={this.props.total}
          loading={this.state.loading}
          callback={this.onChange}
          pageRender={(page, type, origin) =>
            type == 'page' ? (
              <Link href={`/archives?page=${page}&size=${this.props.size}`}>{origin}</Link>
            ) : (
              origin
            )
          }
        />
      </Container>
    );
  }
}

export default withRouter(Archives);
