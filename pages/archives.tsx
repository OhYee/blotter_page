import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { NextPageContext } from 'next';

import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import PostList from '@/components/post_list';
import { Pre, Next, Dots } from '@/components/svg';
import { A } from '@/components/button';

import { archives } from '@/utils/api';
import { parseNumberParams } from '@/utils/parse';
import { Context } from '@/utils/global';

function pageRender(
  current: number,
  pageNumber: number,
  size: number,
  page: number,
  onChange: (page: number, size: number) => void,
) {
  switch (page) {
    case -2: {
      return (
        <Link href={`/archives?page=${current - 1}&size=${size}`} passHref>
          <A
            neumorphism
            disabled={current - 1 < 1}
            onClick={() => onChange(current - 1, size)}
            icon={<Pre />}
          />
        </Link>
      );
    }
    case -3: {
      return (
        <Link href={`/archives?page=${current + 1}&size=${size}`} passHref>
          <A
            neumorphism
            disabled={current + 1 > pageNumber}
            onClick={() => onChange(current + 1, size)}
            icon={<Next />}
          />
        </Link>
      );
    }
    case -1: {
      return <Dots />;
    }
    default: {
      return (
        <Link href={`/archives?page=${page}&size=${size}`} passHref>
          <A
            neumorphism
            disabled={current === page}
            clicked={current === page}
            onClick={() => onChange(page, size)}
          >
            {page}
          </A>
        </Link>
      );
    }
  }
}

interface ArchivesProps extends ComponentProps<'base'>, WithRouterProps {
  page: number;
  total: number;
  size: number;
  posts: (Blotter.PostCard | undefined)[];
}

interface ArchivesState {
  loading: boolean;
}

class Archives extends React.Component<ArchivesProps, ArchivesState> {
  static defaultProps = {
    page: 1,
    total: 1,
    size: 10,
    posts: Array(10).fill(undefined),
  };

  static async getInitialProps(args: NextPageContext) {
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

  onChange = (page: number, size: number): void => {
    if (size != this.props.size) {
      const newPage = Math.floor(((this.props.page - 1) * this.props.size) / size + 1);
      Router.push(`/archives?page=${newPage}&size=${size}`);
    }
  };

  render() {
    return (
      <div>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`第${this.props.page}页|归档页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <PostList
          header={`共 ${this.props.total} 篇文章`}
          posts={this.props.posts}
          page={this.props.page}
          size={this.props.size}
          total={this.props.total}
          loading={this.state.loading}
          callback={this.onChange}
          pageRender={pageRender}
        />
      </div>
    );
  }
}

export default withRouter(Archives);
