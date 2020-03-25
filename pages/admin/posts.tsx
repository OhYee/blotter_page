import React, { ComponentProps, Fragment } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Card, Table, Button, Typography, Popconfirm, Input, Row, Col, Checkbox } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Icon } from '@ant-design/compatible';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';

import Container from '@/components/container';
import TagPart from '@/components/tag';

import { adminPosts, postDelete } from '@/utils/api';
import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';
import { waitUntil } from '@/utils/debounce';
import TagSearch from '@/components/tag_search';

const defaultSort = 'publish_time';
const defaultUp = false;

interface T extends Blotter.PostCard {
  id: string;
  published: boolean;
}

interface AdminPostListProps extends ComponentProps<'base'> {}

interface AdminPostListState {
  search: string;
  search_fields: ('title' | 'abstract' | 'raw')[];
  loading: boolean;
  pagination: PaginationConfig;
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
      pagination: {},
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

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var value = e.target.value;
    waitUntil(
      'index_search',
      () => {
        this.setState({ search: value, page: 1, size: 10 }, this.getData);
      },
      1000,
    );
  };

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

  columns: ColumnProps<T>[] = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
      width: 150,
      ellipsis: true,
      render: (text, record, index) => (
        <div style={{ width: 150 - 16 * 2 }} title={text}>
          <Typography.Text style={{ width: '100%' }} ellipsis={true}>
            <Link href={'/post/[url]'} as={`/post/${record.url}`}>
              <a>{record.title}</a>
            </Link>
          </Typography.Text>
        </div>
      ),
    },
    {
      title: '链接',
      key: 'url',
      dataIndex: 'url',
      width: 150,
      ellipsis: true,
      render: text => (
        <div style={{ width: 150 - 16 * 2 }} title={text}>
          <Typography.Text style={{ width: '100%' }} ellipsis={true}>
            {text}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: '发布时间',
      key: 'publish_time',
      dataIndex: 'publish_time',
      sorter: true,
      width: 150,
      ellipsis: true,
    },
    {
      title: '编辑时间',
      key: 'edit_time',
      dataIndex: 'edit_time',
      sorter: true,
      width: 150,
      ellipsis: true,
    },
    {
      title: '阅读量',
      key: 'view',
      dataIndex: 'view',
      sorter: true,
      width: 100,
      ellipsis: true,
    },
    {
      title: '已发布',
      key: 'published',
      dataIndex: 'published',
      sorter: true,
      width: 100,
      ellipsis: true,
      render: (text, record, index) =>
        text ? (
          <Icon type="eye" style={{ color: 'green' }}></Icon>
        ) : (
          <Icon type="eye-invisible" style={{ color: 'red' }}></Icon>
        ),
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      width: 200,
      ellipsis: true,
      render: (text, record, index) => (
        <div style={{ width: 200 - 16 * 2, whiteSpace: 'normal' }}>
          {record.tags.map(tag => (
            <TagPart key={tag.short} tag={tag} />
          ))}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'op',
      render: (text, record, index) => (
        <div style={{ whiteSpace: 'nowrap' }}>
          <Link href={`/admin/post?url=${record.url}`}>
            <a>
              <Button size="small">
                <Icon type="edit" />
                编辑
              </Button>
            </a>
          </Link>{' '}
          <Popconfirm
            title="真的要删除么？"
            onConfirm={() => {
              this.onDelete(record.id);
            }}
            okText="删除！"
            cancelText="算了"
          >
            <Button size="small" type="danger">
              <Icon type="delete" />
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  onDelete = async (id: string) => {
    var r = await postDelete(id);
    ShowNotification(r);
    this.setState(state => ({ data: state.data.filter(post => post.id != id) }));
  };

  onTableChange = (
    pagination: PaginationConfig,
    filters: Record<string, React.ReactText[] | null>,
    sorter: SorterResult<T>,
    extra: TableCurrentDataSource<T>,
  ) => {
    const { current, pageSize } = pagination;
    const { field, order } = sorter;

    var s = {} as any;
    if (!!current) s.page = current;
    if (!!pageSize) s.size = pageSize;
    if (typeof order !== 'undefined') {
      s.field = field;
      s.up = order === 'ascend';
    }

    this.setState(s, this.getData);
  };

  renderTagSearch = (name: 'with_tags' | 'without_tags') => {
    return (
      <TagSearch
        tags={this.state[name]}
        onAdd={tag => {
          this.setState(state => {
            var tags = state[name];
            tags.filter(item => item.id !== tag.id);
            tags.push(tag);

            var ret = { page: 1 };
            ret[name] = tags;
            return ret;
          }, this.getData);
        }}
        onDelete={tag => {
          this.setState(state => {
            var tags = state[name];
            tags.filter(item => item.id !== tag.id);

            var ret = { page: 1 };
            ret[name] = tags;
            return ret;
          }, this.getData);
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
      <Fragment>
        <Row>
          <Input
            placeholder="搜索文章"
            onChange={this.onChange}
            allowClear
            prefix={<Icon type="search" />}
            size="large"
          />
        </Row>
        <Row gutter={10}>
          <Col>搜索范围：</Col>
          {checkboxs.map(item => (
            <Col key={item.key}>
              <Checkbox
                checked={this.state.search_fields.indexOf(item.key) !== -1}
                onChange={e => {
                  const checked = e.target.checked;
                  console.log(item, checked, this.state.search_fields);
                  this.setState(state => {
                    var { search_fields } = state;
                    search_fields = search_fields.filter(it => it != item.key);
                    if (checked) {
                      search_fields.push(item.key);
                    }
                    return { search_fields };
                  }, this.getData);
                }}
              >
                {item.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
        <Row gutter={10}>
          <Col>从这些标签里搜索：</Col>
          <Col>{this.renderTagSearch('with_tags')}</Col>
        </Row>
        <Row gutter={10}>
          <Col>从这些标签里排除：</Col>
          <Col>{this.renderTagSearch('without_tags')}</Col>
        </Row>
      </Fragment>
    );
  };
  render() {
    return (
      <Container lg={20} md={20} sm={24} xs={24}>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`文章列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          {this.renderSearch()}
          <Table<T>
            rowKey={record => record.id}
            columns={this.columns}
            scroll={{ x: true }}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.onTableChange}
            title={() => (
              <div style={{ textAlign: 'right' }}>
                <Link href="/admin/post">
                  <a>
                    <Button type="primary">
                      <Icon type="plus" />
                      新建文章
                    </Button>
                  </a>
                </Link>
              </div>
            )}
            pagination={{
              current: this.state.page,
              total: this.state.total,
              pageSize: this.state.size,
              showSizeChanger: true,
            }}
          />
        </Card>
      </Container>
    );
  }
}

export default AdminPostList;
