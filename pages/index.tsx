import React from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Flex } from '@/components/container';
import PostList from '@/components/post_list';
import { Left } from '@/components/svg';
import PostSearch from '@/components/post_search';
import Card from '@/components/card';
import Button from '@/components/button';

import { Context } from '@/utils/global';
import { indexPosts, tagsSearch } from '@/utils/api';
import { waitUntil } from '@/utils/debounce';

import styles from './index.module.scss';

interface IndexProps extends React.ComponentProps<'base'> {
  posts: Blotter.PostCard[];
}

interface IndexState {
  total: number;
  posts: Blotter.PostCard[];
  loading: boolean;
  search: string;
  search_fields: ('title' | 'abstract' | 'raw')[];
  page: number;
  size: number;
  callback?: (page: number, size?: number) => void;
  tags: Blotter.Tag[];
  with_tags: Blotter.Tag[];
  without_tags: Blotter.Tag[];
  show: boolean;
}

class Index extends React.Component<IndexProps, IndexState> {
  static defaultProps = { posts: [] };

  static async getInitialProps(args: NextPageContext) {
    var data = await indexPosts('', [], 1, 10, [], []);
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
      search_fields: ['title'],
      tags: [],
      with_tags: [],
      without_tags: [],
      show: false,
    };
  }

  onChange = (value: string) => {
    waitUntil(
      'index_search',
      () => {
        this.setState({ search: value, page: 1 }, this.getPosts);
      },
      1000,
    );
  };
  onPageChange = (page: number, size?: number) => {
    if (typeof size === 'undefined') {
      size = this.state.size;
    }
    this.setState({ page, size }, this.getPosts);
  };

  getPosts = async () => {
    if (
      this.state.search == '' &&
      this.state.with_tags.length == 0 &&
      this.state.without_tags.length == 0
    ) {
      this.setState({
        posts: this.props.posts,
        total: 0,
        search: '',
        callback: undefined,
        tags: [],
      });
    } else {
      this.setState({ loading: true });
      var data = await indexPosts(
        this.state.search,
        this.state.search_fields,
        this.state.page,
        this.state.size,
        this.state.with_tags,
        this.state.without_tags,
      );
      var tags = [];
      if (this.state.search !== '') {
        tags = await (await tagsSearch(this.state.search)).tags;
      }
      this.setState({
        posts: data.posts,
        total: data.total,
        loading: false,
        callback: this.onPageChange,
        tags: tags,
      });
    }
  };

  render() {
    return (
      <div className={styles.index}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`首页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Flex direction="TB" fullWidth>
          <Card
            className={styles.search_card}
            neumorphism
            style={{ height: !this.state.show ? 100 : 230 }}
          >
            <PostSearch
              searchWord={this.state.search}
              onSearchChange={this.onChange}
              checkedKeys={this.state.search_fields}
              onCheckChange={(search_fields) => this.setState({ search_fields })}
              withTags={this.state.with_tags}
              withoutTags={this.state.without_tags}
              onTagChange={(type, tags) =>
                this.setState((state) => ({
                  ...state,
                  ...{ [type === 'with' ? 'with_tags' : 'without_tags']: tags },
                }))
              }
              tags={this.state.tags}
            />
            <div
              className={styles.mask}
              style={{
                paddingTop: this.state.show ? 0 : 30,
              }}
              onClick={() => {
                this.setState((state) => ({ show: !state.show }));
              }}
            >
              <Left
                style={{
                  transform: this.state.show ? 'rotate(90deg)' : 'rotate(270deg)',
                  transition: 'transform var(--transition-time)',
                }}
              />
            </div>
          </Card>

          <PostList
            posts={this.state.posts}
            header={this.state.total == 0 ? undefined : `共 ${this.state.total} 条搜索结果`}
            loading={this.state.loading}
            page={this.state.page}
            size={this.state.size}
            total={this.state.total}
            callback={this.state.callback}
          />
          <Flex.Item className="textCenter" style={{ textAlign: 'center', marginTop: 20 }}>
            <Link href="/archives?page=2&size=10">
              <Button neumorphism>查看更多</Button>
            </Link>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default Index;
