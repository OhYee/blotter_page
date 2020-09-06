import React from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Flex } from '@/components/container';
import PostList from '@/components/post_list';
import Input, { CheckBox } from '@/components/input';
import { Search } from '@/components/svg';

import { Context } from '@/utils/global';

import { indexPosts, tagsSearch } from '@/utils/api';
import { waitUntil } from '@/utils/debounce';
import TagPart from '@/components/tag';
import TagSearch from '@/components/tag_search';
import Card from '@/components/card';
import Button from '@/components/button';

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

  renderTagSearch = (name: 'with_tags' | 'without_tags') => {
    return (
      <TagSearch
        tags={this.state[name]}
        onAdd={(tag) => {
          this.setState((state) => {
            var tags = state[name];
            tags = tags.filter((item) => item.id !== tag.id);
            tags.push(tag);
            return { ...state, page: 1, [name]: tags };
          }, this.getPosts);
        }}
        onDelete={(tag) => {
          this.setState((state) => {
            var tags = state[name];
            tags = tags.filter((item) => item.id !== tag.id);
            return { ...state, page: 1, [name]: tags };
          }, this.getPosts);
        }}
      />
    );
  };

  renderSearch = () => {
    const checkboxs: { key: 'title' | 'abstract' | 'raw'; name: string }[] = [
      { key: 'title', name: '标题' },
      { key: 'abstract', name: '摘要' },
      { key: 'raw', name: '内容' },
    ];
    return (
      <Flex direction="TB" fullWidth subAxis="flex-start">
        <Input
          style={{ width: '100%' }}
          placeholder="搜索文章"
          onChange={this.onChange}
          prefix={<Search />}
          size="large"
        />
        <Flex mainAxis="flex-start">
          {[
            '搜索范围',
            ...checkboxs.map((item) => (
              <CheckBox
                key={item.key}
                value={this.state.search_fields.indexOf(item.key) !== -1}
                onChange={(checked) => {
                  this.setState((state) => {
                    var { search_fields } = state;
                    search_fields = search_fields.filter((it) => it != item.key);
                    if (checked) {
                      search_fields.push(item.key);
                    }
                    return { search_fields };
                  }, this.getPosts);
                }}
              >
                {item.name}
              </CheckBox>
            )),
          ]}
        </Flex>
        <Flex mainAxis="flex-start" mainSize="small" subSize="small">
          <span>从这些标签里搜索：</span>
          {this.renderTagSearch('with_tags')}
        </Flex>
        <Flex mainAxis="flex-start" mainSize="small" subSize="small">
          <span>从这些标签里排除：</span>
          {this.renderTagSearch('without_tags')}
        </Flex>

        <Flex mainAxis="flex-start" subSize="middle">
          {this.state.tags.map((tag) => (
            <TagPart tag={tag} key={tag.short} />
          ))}
        </Flex>
      </Flex>
    );
  };
  render() {
    return (
      <div>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`首页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Flex direction="TB" fullWidth>
          <Card neumorphism style={{ lineHeight: '2em' }}>
            {this.renderSearch()}
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
          <div className="textCenter">
            <Link href="/archives?page=2&size=10">
              <Button neumorphism>查看更多</Button>
            </Link>
          </div>
        </Flex>
      </div>
    );
  }
}

export default Index;
