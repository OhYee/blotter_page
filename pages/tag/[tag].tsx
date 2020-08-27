import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { NextPageContext } from 'next';
import Link from 'next/link';

import { Card, Descriptions } from 'antd';

import PostList from '@/components/post_list';
import { Space } from '@/components/container';
import { Pre, Next, Dots } from '@/components/svg';
import { A } from '@/components/button';

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
          >
            <A
              size="small"
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
          <Link href={`/archives?page=${current + 1}&size=${size}`}>
            <A
              size="small"
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
          <Link href={`/archives?page=${page}&size=${size}`}>
            <A
              size="small"
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
      <Space size="middle">
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`${this.props.tag.name}|标签页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <Descriptions title="标签信息" bordered layout="vertical" column={{ xs: 1, sm: 3 }}>
            <Descriptions.Item key="name" label="标签名称">
              {this.props.tag.name}
            </Descriptions.Item>
            <Descriptions.Item key="short" label="标签链接">
              {this.props.tag.short}
            </Descriptions.Item>
            <Descriptions.Item key="img" label="标签图片">
              <img
                style={{ maxWidth: '50px' }}
                src={this.props.tag.icon === '' ? '/static/img/noimg.png' : this.props.tag.icon}
              />
            </Descriptions.Item>
            <Descriptions.Item key="description" label="标签描述" span={3}>
              {!!this.props.tag.description ? (
                <p dangerouslySetInnerHTML={{ __html: this.props.tag.description }}></p>
              ) : (
                <i>暂无描述</i>
              )}
            </Descriptions.Item>
          </Descriptions>
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
      </Space>
    );
  }
}

export default withRouter(TagDetail);
