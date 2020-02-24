import React, { ComponentProps } from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Input, Card, Icon, Button } from 'antd';

import Container from '@/components/container';
import PostList from '@/components/post_list';

import { Context } from '@/utils/global';

import { indexPosts, tagsSearch } from '@/utils/api';
import { waitUntil } from '@/utils/debounce';
import TagPart from '@/components/tag';

interface IndexProps extends ComponentProps<'base'> {
  posts: Blotter.PostCard[];
}

interface IndexState {
  total: number;
  posts: Blotter.PostCard[];
  loading: boolean;
  search: string;
  page: number;
  size: number;
  callback?: (page: number, size?: number) => void;
  tags: Blotter.Tag[];
}

class Index extends React.Component<IndexProps, IndexState> {
  static defaultProps = { posts: [] };

  static async getInitialProps(args: NextPageContext) {
    var data = await indexPosts('', 1, 5);
    return {
      posts: data.posts,
    } as IndexProps;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      posts: this.props.posts,
      total: 0,
      loading: false,
      page: 1,
      size: 10,
      search: '',
      tags: [],
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var value = e.target.value;
    waitUntil(
      'index_search',
      () => {
        this.getPosts(value, 1, 10);
      },
      1000,
    );
  };
  onPageChange = (page: number, size?: number) => {
    if (typeof size === 'undefined') {
      size = this.state.size;
    }
    this.getPosts(this.state.search, page, size);
  };

  getPosts = async (search: string, page: number, size: number) => {
    if (search == '') {
      this.setState({
        posts: this.props.posts,
        total: 0,
        search: '',
        callback: undefined,
        tags: [],
      });
    } else {
      this.setState({ loading: true });
      var data = await indexPosts(search, page, size);
      var r = await tagsSearch(search);

      this.setState({
        posts: data.posts,
        total: data.total,
        loading: false,
        page: page,
        size: size,
        search: search,
        callback: this.onPageChange,
        tags: r.tags,
      });
    }
  };

  render() {
    return (
      <div>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`首页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Container lg={14} md={18}>
          <Card className="shadow">
            <Input
              placeholder="搜索文章"
              onChange={this.onChange}
              allowClear
              prefix={<Icon type="search" />}
              size="large"
            />
          </Card>
        </Container>
        <Container>
          {this.state.tags.map(tag => (
            <TagPart tag={tag} key={tag.short} />
          ))}
          <PostList
            posts={this.state.posts}
            header={this.state.total == 0 ? undefined : `共${this.state.total}条搜索结果`}
            loading={this.state.loading}
            page={this.state.page}
            size={this.state.size}
            total={this.state.total}
            callback={this.state.callback}
          />
          <div style={{ textAlign: 'center' }}>
            <Link href="/archives">
              <Button
                type="dashed"
                style={{
                  background: 'transparent',
                }}
              >
                查看更多
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default Index;
