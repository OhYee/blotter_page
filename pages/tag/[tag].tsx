import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { NextPageContext } from 'next';
import Link from 'next/link';

import PostList from '@/components/post_list';
import { Space } from '@/components/container';
import { Pre, Next, Dots } from '@/components/svg';
import { A } from '@/components/button';
import Card from '@/components/card';
import { Flex } from '@/components/container';

import { parseNumberParams } from '@/utils/parse';
import { tagPosts } from '@/utils/api';
import { Context } from '@/utils/global';

interface TagDetailProps extends ComponentProps<'base'>, WithRouterProps {
  page: number;
  total: number;
  size: number;
  posts: Blotter.PostCard[];
  tag: Blotter.Tag;
}

interface TagDetailState {}

class TagDetail extends React.Component<TagDetailProps, TagDetailState> {
  static defaultProps = {
    page: 1,
    total: 1,
    size: 10,
    posts: [],
    tag: undefined,
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
    var tag = args.query.tag;
    if (Array.isArray(tag)) {
      tag = tag[0];
    }
    var data = await tagPosts(tag, page, size);
    return {
      page: page,
      size: size,
      tag: data.tag,
      posts: data.posts,
      total: data.total,
    } as TagDetailProps;
  }

  onChange = (page: number, size?: number): void => {
    if (typeof size !== 'undefined' && this.props.size != size) {
      Router.push(`/tag/[tag]`, `/tag/${this.props.router.query.tag}?page=${page}&size=${size}`);
    }
  };

  pageRender = (
    current: number,
    pageNumber: number,
    size: number,
    page: number,
    onChange: (page: number, size: number) => void,
  ) => {
    switch (page) {
      case -2: {
        return (
          <Link
            href="/tag/[tag]"
            as={`/tag/${this.props.router.query.tag}?page=${page}&size=${this.props.size}`}
            passHref
          >
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
          <Link
            href="/tag/[tag]"
            as={`/tag/${this.props.router.query.tag}?page=${page}&size=${this.props.size}`}
            passHref
          >
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
          <Link
            href="/tag/[tag]"
            as={`/tag/${this.props.router.query.tag}?page=${page}&size=${this.props.size}`}
            passHref
          >
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
  };

  render() {
    return (
      <Flex direction="TB" fullWidth>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`${this.props.tag.name}|标签页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card neumorphism>
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%' }}>
              <tr>
                <td style={{ minWidth: '100px' }}>
                  <strong>标签名称</strong>
                </td>
                <td style={{ minWidth: '100px' }}>
                  <strong>标签链接</strong>
                </td>
                <td style={{ minWidth: '100px' }}>
                  <strong>标签图片</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <span>{this.props.tag.name}</span>
                </td>
                <td>
                  <span>{this.props.tag.short}</span>
                </td>
                <td>
                  <span>
                    <img
                      style={{ maxWidth: '50px' }}
                      src={
                        this.props.tag.icon === '' ? '/static/img/noimg.png' : this.props.tag.icon
                      }
                    />
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <strong>标签描述</strong>
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ minWidth: '100%' }}>
                  <span>
                    {!!this.props.tag.description ? (
                      <span dangerouslySetInnerHTML={{ __html: this.props.tag.description }}></span>
                    ) : (
                      <i>暂无描述</i>
                    )}
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </Card>

        <PostList
          header={`共有 ${this.props.total} 篇文章`}
          posts={this.props.posts}
          page={this.props.page}
          size={this.props.size}
          total={this.props.total}
          callback={this.onChange}
          pageRender={this.pageRender}
        />
      </Flex>
    );
  }
}

export default withRouter(TagDetail);
