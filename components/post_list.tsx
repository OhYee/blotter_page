import React, { ComponentProps } from 'react';

import { Row, Col, Pagination } from 'antd';

import PostCard from '@/components/post_card';
import { Context } from '@/utils/global';
import { Flex } from './container';

import styles from './post_list.less';

type PostListProps = {
  posts: (Blotter.PostCard | undefined)[];
  loading?: boolean;
  page?: number;
  size?: number;
  total?: number;
  callback?: (page: number, size?: number) => void;
  header?: string;
  pageRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactElement<HTMLElement>,
  ) => React.ReactNode;
};

type PostListState = {};

class PostList extends React.Component<PostListProps & ComponentProps<'base'>, PostListState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  static defaultProps: PostListProps = {
    posts: [],
    page: undefined,
    total: 0,
    size: undefined,
    loading: false,
    callback: undefined,
    header: undefined,
  };

  constructor(props: any) {
    super(props);
  }

  renderList = (posts: Blotter.PostCard[]) => {
    return (
      <Flex direction="TB" fullWidth>
        {posts.map((post) => (
          <div key={post.url}>
            <PostCard post={post} loading={this.props.loading} />
          </div>
        ))}
      </Flex>
    );
  };

  render() {
    var pagination =
      typeof this.props.callback === 'undefined'
        ? false
        : {
            showSizeChanger: true,
            current: this.props.page,
            pageSize: this.props.size,
            total: this.props.total,
            onChange: this.props.callback,
            onShowSizeChange: this.props.callback,
            itemRender: this.props.pageRender,
          };

    if (this.context.big_screen && this.props.posts.length > 1) {
      var l: Blotter.PostCard[] = [];
      var r: Blotter.PostCard[] = [];
      var ln = 0;
      var rn = 0;
      for (var i = 0; i < this.props.posts.length; i++) {
        const p = this.props.posts[i];
        if (ln <= rn) {
          ln += p.head_image === '' ? 1 : 2;
          l.push(p);
        } else {
          rn += p.head_image === '' ? 1 : 2;
          r.push(p);
        }
      }
      if (rn > ln) {
        if (r.slice(-1)[0].head_image === '') {
          l.push(r.pop());
        } else {
          [l[l.length - 1], r[r.length - 1]] = [r[r.length - 1], l[l.length - 1]];
        }
      }
    }

    return (
      <Flex direction="TB" fullWidth>
        {this.props.header ? <div>{this.props.header}</div> : null}
        {this.props.posts.length == 0 ? (
          <div
            className="textCenter"
            style={{
              lineHeight: '3em',
              fontSize: '1.5em',
              color: 'grey',
            }}
          >
            暂无数据
          </div>
        ) : this.context.big_screen && this.props.posts.length > 1 ? (
          <div className={styles.container}>
            <div className={styles.column}>{this.renderList(l)}</div>
            <div className={styles.column}>{this.renderList(r)}</div>
          </div>
        ) : (
          this.renderList(this.props.posts)
        )}
        {!!pagination ? (
          <Row justify="end">
            <Col>
              <Pagination {...pagination} />
            </Col>
          </Row>
        ) : null}
      </Flex>
    );
  }
}

export default PostList;
