import React, { ComponentProps, Fragment } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Card from '@/components/card';
import Table, { Column } from '@/components/table';
import Button, { A } from '@/components/button';
import Popover from '@/components/popover';
import TagPart from '@/components/tag';
import PostSearch from '@/components/post_search';
import { Eye, EyeInvisible, Edit, Delete, Plus } from '@/components/svg';
import { Flex } from '@/components/container';

import { adminPosts, postDelete } from '@/utils/api';
import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';
import { waitUntil } from '@/utils/debounce';
import { formatSecond } from '@/utils/time';

const defaultSort = 'publish_time';
const defaultUp = false;

interface T extends Blotter.PostCard {
  id: string;
  status: 0 | 1 | 2;
  //   published: boolean;
}

interface AdminPostListProps extends ComponentProps<'base'> {}

interface AdminPostListState {
  search: string;
  search_fields: ('title' | 'abstract' | 'raw')[];
  loading: boolean;
  data: T[];
  total: number;
  size: number;
  page: number;
  with_tags: Blotter.Tag[];
  without_tags: Blotter.Tag[];
  field: string;
  up: boolean;
}

class AdminPostList extends React.Component<AdminPostListProps, AdminPostListState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      search_fields: ['title'],
      loading: false,
      data: [],
      total: 0,
      size: 10,
      page: 1,
      with_tags: [],
      without_tags: [],
      field: defaultSort,
      up: defaultUp,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    var r = await adminPosts(
      this.state.search,
      this.state.search_fields,
      this.state.page,
      this.state.size,
      this.state.field,
      this.state.up,
      this.state.with_tags,
      this.state.without_tags,
    );
    this.setState({ total: r.total, data: r.posts, loading: false });
  };

  columns: Column<T>[] = [
    {
      title: '标题',
      key: 'title',
      minWidth: '5em',
      maxWidth: '10em',
      tooltip: (text) => text,
      ellipsis: true,
      render: (text, record, index) => (
        <Link href={'/post/[url]'} as={`/post/${record.url}`}>
          <a>{record.title}</a>
        </Link>
      ),
    },
    {
      title: '链接',
      key: 'url',
      tooltip: true,
      minWidth: '5em',
      maxWidth: '10em',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'op',
      minWidth: '12em',
      maxWidth: '15em',
      render: (text, record, index) => (
        <Flex mainAxis="space-around">
          <Link href={`/admin/post?url=${record.url}`} passHref>
            <A size="small" neumorphism prefix={<Edit />}>
              编辑
            </A>
          </Link>
          <Popover
            shadow
            card
            trigger={['click']}
            component={
              <Card>
                <span>真的要删除么？</span>
                <Button
                  onClick={() => {
                    this.onDelete(record.id);
                  }}
                  danger
                  neumorphism
                  primary
                  size="small"
                >
                  删除！
                </Button>
              </Card>
            }
          >
            <Button size="small" danger neumorphism prefix={<Delete />}>
              删除
            </Button>
          </Popover>
        </Flex>
      ),
    },

    {
      title: '阅读量',
      key: 'view',
      tooltip: true,
      sorter: true,
      minWidth: '6em',
      maxWidth: '15em',
      ellipsis: true,
    },
    {
      title: '已发布',
      key: 'status',
      sorter: true,
      minWidth: '6em',
      maxWidth: '15em',
      render: (text, record, index) =>
        record.status == 2 ? (
          <Eye style={{ color: 'green' }} />
        ) : record.status == 1 ? (
          <Eye style={{ color: 'orange' }} />
        ) : (
          <EyeInvisible style={{ color: 'red' }} />
        ),
    },
    {
      title: '标签',
      key: 'tags',
      minWidth: '10em',
      maxWidth: '20em',
      render: (text, record, index) => (
        <Flex mainSize="small" subSize="small" mainAxis="flex-start">
          {record.tags.map((tag) => (
            <TagPart key={tag.short} tag={tag} />
          ))}
        </Flex>
      ),
    },
    {
      title: '发布时间',
      key: 'publish_time',
      tooltip: (text) => formatSecond(text),
      sorter: true,
      minWidth: '10em',
      maxWidth: '15em',
      ellipsis: true,
      render: (text) => formatSecond(text),
    },
    {
      title: '编辑时间',
      key: 'edit_time',
      tooltip: (text) => formatSecond(text),
      sorter: true,
      minWidth: '10em',
      maxWidth: '15em',
      ellipsis: true,
      render: (text) => formatSecond(text),
    },
  ];

  onDelete = async (id: string) => {
    var r = await postDelete(id);
    ShowNotification(r);
    this.setState((state) => ({ data: state.data.filter((post) => post.id != id) }));
  };

  render() {
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`文章列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <PostSearch
          searchWord={this.state.search}
          onSearchChange={(value: string) =>
            waitUntil(
              'index_search',
              () => this.setState({ search: value, page: 1, size: 10 }, this.getData),
              1000,
            )
          }
          checkedKeys={this.state.search_fields}
          onCheckChange={(search_fields) => this.setState({ search_fields }, this.getData)}
          withTags={this.state.with_tags}
          withoutTags={this.state.without_tags}
          onTagChange={(type, tags) =>
            this.setState(
              (state) => ({
                ...state,
                ...{ [type === 'with' ? 'with_tags' : 'without_tags']: tags },
              }),
              this.getData,
            )
          }
        />
        <div style={{ textAlign: 'right' }}>
          <Link href="/admin/post" passHref>
            <A primary neumorphism prefix={<Plus />}>
              新建文章
            </A>
          </Link>
        </div>
        <Table<T>
          columns={this.columns}
          data={this.state.data}
          loading={this.state.loading}
          onChange={(page, size, field, up) =>
            this.setState({ page, size, field, up }, this.getData)
          }
          pagination={{
            page: this.state.page,
            total: this.state.total,
            size: this.state.size,
            sizeSelect: [5, 10, 20, 50, 100],
          }}
        />
      </Card>
    );
  }
}

export default AdminPostList;
