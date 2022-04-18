import React from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Flex } from '@/components/container';
import PostList from '@/components/post_list';
import { Left, Success } from '@/components/svg';
import PostSearch from '@/components/post_search';
import Card from '@/components/card';
import Button from '@/components/button';
import { EasterEgg } from '@/components/svg';

import { Context } from '@/utils/global';
import { indexPosts, postEgg, tagsSearch } from '@/utils/api';
import { waitUntil } from '@/utils/debounce';

import styles from './index.module.scss';
import Notification from '@/components/notification';
import internal from 'stream';

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
  search_height: number;
  easter_egg: string;
  easter_length: number;
  easter_success:boolean;
}

class Index extends React.Component<IndexProps, IndexState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  static defaultProps = { posts: [] };
  ref = React.createRef<HTMLDivElement>();
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
      search_height: 100,
      easter_egg: '',
      easter_length:1,
      easter_success: false,
    };
  }

  componentDidMount() {
    this.easterEggInit();
  }

  componentWillUnmount() {
    this.easterEggDestory();
  }
  easterEggPost = (word:string) => {
    postEgg(word).then(res => {
      this.setState({easter_success:res.success,easter_egg: res.url, easter_length: res.length});
      if (this.state.easter_success) {
            Notification.message({
                  alertType: 'info',
                  title: '恭喜你，触发了一个彩蛋！',
                  content: '赶快去看一下彩蛋是什么吧',
                });
            }
      console.log(this.state)
    
    
  });
  }
  easterEggInit = () => {
    const easterEggDo = this.easterEggWrapper();
    document.addEventListener('keyup', easterEggDo);
    (this as any).easterEggDo = easterEggDo;
    }
  easterEggDestory = () => {
    const { easterEggDo } = this as any;
    if (!!easterEggDo) document.removeEventListener('keyup', easterEggDo);
  };
  easterEggWrapper = () => {
    var cache = '';
    var mxL = this.state.easter_length;
    
    return (e: KeyboardEvent) => {
      cache += e.key;
      if (cache.length >= mxL) {
        this.easterEggPost(cache)
        mxL = this.state.easter_length;
      }
      cache = cache.slice(-mxL);
      console.log(cache,mxL);
       
    };
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
      this.setState(
        {
          posts: this.props.posts,
          total: 0,
          search: '',
          callback: undefined,
          tags: [],
        },
        this.resetSearchHeight,
      );
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
        tags = (await tagsSearch(this.state.search)).tags;
      }
      this.setState(
        {
          posts: data.posts,
          total: data.total,
          loading: false,
          callback: this.onPageChange,
          tags: tags,
        },
        this.resetSearchHeight,
      );
    }
  };

  resetSearchHeight = () => {
    this.setState({
      search_height: !this.state.show
        ? 100
        : 50 + (this.ref.current || { offsetHeight: 0 }).offsetHeight,
    });
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
            style={{
              height: this.state.search_height,
            }}
          >
            <PostSearch
              ref={this.ref}
              searchWord={this.state.search}
              onSearchChange={(value: string) => {
                waitUntil(
                  'index_search',
                  () => this.setState({ search: value, page: 1 }, this.getPosts),
                  1000,
                );
              }}
              checkedKeys={this.state.search_fields}
              onCheckChange={(search_fields) => this.setState({ search_fields }, this.getPosts)}
              withTags={this.state.with_tags}
              withoutTags={this.state.without_tags}
              onTagChange={(type, tags) =>
                this.setState(
                  (state) => ({
                    ...state,
                    ...{ [type === 'with' ? 'with_tags' : 'without_tags']: tags },
                  }),
                  this.getPosts,
                )
              }
              tags={this.state.tags}
            />
            <div
              className={styles.mask}
              style={{
                paddingTop: this.state.show ? 0 : 30,
              }}
              onClick={() => {
                this.setState((state) => ({ show: !state.show }), this.resetSearchHeight);
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

          {!!this.state.easter_success && (
            <Notification
              icon={<EasterEgg />}
              title="你发现了一个彩蛋"
              content={
                <Link href={this.state.easter_egg} passHref>
                  <a>点击查看彩蛋内容</a>
                </Link>
              }
              onClose={() => {
                this.setState({ easter_egg: '' ,easter_success:false});
              }}
            />
          )}

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
            <Link href="/archives">
              <Button neumorphism>查看更多</Button>
            </Link>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default Index;
