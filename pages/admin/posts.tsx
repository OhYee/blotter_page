import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Card, Table, Button, Row, Col, Typography, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Icon } from '@ant-design/compatible';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';

import Container from '@/components/container';
import TagPart from '@/components/tag';

import { adminPosts, postDelete } from '@/utils/api';
import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';

interface T extends Blotter.PostCard {
  id: string;
  published: boolean;
}

interface AdminPostListProps extends ComponentProps<'base'> {}

interface AdminPostListState {
  loading: boolean;
  pagination: PaginationConfig;
  data: T[];
  total: number;
  size: number;
  page: number;
}

class AdminPostList extends React.Component<AdminPostListProps, AdminPostListState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      pagination: {},
      data: [],
      total: 0,
      size: 10,
      page: 0,
    };
  }

  componentDidMount() {
    this.getData(1, 10, 'publish_time', false);
  }

  getData = async (page: number, size: number, field: string, up: boolean) => {
    this.setState({ loading: true });
    var r = await adminPosts(page, size, field, up);
    this.setState({ data: r.posts, total: r.total, loading: false });
  };

  columns: ColumnProps<T>[] = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
      render: (text, record, index) => (
        <Link href={'/post/[url]'} as={`/post/${record.url}`}>
          <a>{record.title}</a>
        </Link>
      ),
      width: '10%',
    },
    {
      title: '链接',
      key: 'url',
      dataIndex: 'url',
      width: '10%',
      render: text => (
        <Typography.Text ellipsis={true} style={{ maxWidth: '100%' }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: '发布时间',
      key: 'publish_time',
      dataIndex: 'publish_time',
      sorter: true,
      width: '10%',
    },
    {
      title: '编辑时间',
      key: 'edit_time',
      dataIndex: 'edit_time',
      sorter: true,
      width: '10%',
    },
    {
      title: '阅读量',
      key: 'view',
      dataIndex: 'view',
      sorter: true,
      width: '10%',
    },
    {
      title: '已发布',
      key: 'published',
      dataIndex: 'published',
      sorter: true,
      width: '10%',
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
      width: '20%',
      render: (text, record, index) => (
        <div>
          {record.tags.map(tag => (
            <TagPart key={tag.short} tag={tag} />
          ))}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'op',
      width: '20%',
      render: (text, record, index) => (
        <Row gutter={5}>
          <Col span={12}>
            <Link href={`/admin/post?url=${record.url}`}>
              <a>
                <Button size="small">
                  <Icon type="edit" />
                  编辑
                </Button>
              </a>
            </Link>
          </Col>
          <Col span={12}>
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
          </Col>
        </Row>
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
    this.setState({
      page: current!,
      size: pageSize!,
    });
    var defaultSort = typeof order === 'undefined';

    this.getData(
      current!,
      pageSize!,
      defaultSort ? 'publish_time' : `${field}`,
      defaultSort ? false : order === 'ascend',
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

          <Table<T>
            rowKey={record => record.id}
            columns={this.columns}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.onTableChange}
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
