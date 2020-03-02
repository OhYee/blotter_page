import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { NextPageContext } from 'next';
import Link from 'next/link';

import { Card, Descriptions } from 'antd';

import PostList from '@/components/post_list';
import Container from '@/components/container';

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

  render() {
    console.log('render', this.props, this.state);
    return (
      <Container>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`${this.props.tag.name}|标签页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>

        <Card>
          <Descriptions title="标签信息" bordered layout="vertical">
            <Descriptions.Item label="标签名称">{this.props.tag.name}</Descriptions.Item>
            <Descriptions.Item label="标签链接">{this.props.tag.short}</Descriptions.Item>
            <Descriptions.Item label="标签图片">
              <img
                style={{ maxWidth: '50px' }}
                src={this.props.tag.icon === '' ? '/static/img/noimg.png' : this.props.tag.icon}
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <PostList
          header={`共有${this.props.total}篇文章`}
          posts={this.props.posts}
          page={this.props.page}
          size={this.props.size}
          total={this.props.total}
          callback={this.onChange}
          pageRender={(page, type, origin) =>
            type == 'page' || type == 'prev' || type == 'next' ? (
              // On the first page, prev button will get disabled props, and link can not recvive disabled props.
              <div>
                <Link
                  href="/tag/[tag]"
                  as={`/tag/${this.props.router.query.tag}?page=${page}&size=${this.props.size}`}
                >
                  {origin}
                </Link>
              </div>
            ) : (
              origin
            )
          }
        />
      </Container>
    );
  }
}

export default withRouter(TagDetail);
