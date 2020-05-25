import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Card, Table, Button, Input, Avatar, Popconfirm, notification } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Icon } from '@ant-design/compatible';
import { PaginationConfig } from 'antd/lib/pagination';
import {
  SorterResult,
  TableCurrentDataSource,
  TablePaginationConfig,
} from 'antd/lib/table/interface';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import Container, { Space } from '@/components/container';

import { postDelete, users, reset_password } from '@/utils/api';
import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';
import { waitUntil } from '@/utils/debounce';

const defaultSort = 'publish_time';
const defaultUp = false;

interface AdminUsersProps extends ComponentProps<'base'> {}

interface AdminUsersState {
  search: string;
  search_fields: ('title' | 'abstract' | 'raw')[];
  loading: boolean;
  pagination: PaginationConfig;
  data: Blotter.User[];
  total: number;
  size: number;
  page: number;
  with_tags: Blotter.Tag[];
  without_tags: Blotter.Tag[];
  field: string;
  up: boolean;
}

class AdminUsers extends React.Component<AdminUsersProps, AdminUsersState> {
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
      'users_search',
      () => {
        this.setState({ search: value, page: 1, size: 10 }, this.getData);
      },
      1000,
    );
  };

  getData = async () => {
    this.setState({ loading: true });
    var r = await users(
      this.state.page,
      this.state.size,
      this.state.search,
      this.state.field,
      this.state.up ? 1 : -1,
    );
    this.setState({ total: r.total, data: r.users, loading: false });
  };

  onDelete = async (id: string) => {
    var r = await postDelete(id);
    ShowNotification(r);
    this.setState((state) => ({ data: state.data.filter((post) => post.id != id) }));
  };

  onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, React.ReactText[] | null>,
    sorter: SorterResult<Blotter.User>,
    extra: TableCurrentDataSource<Blotter.User>,
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

  render() {
    const columns: ColumnProps<Blotter.User>[] = [
      {
        title: '头像',
        key: 'avatar',
        dataIndex: 'avatar',
        width: 50,
        render: (value) => <Avatar src={value} />,
      },
      {
        title: '名称',
        key: 'username',
        dataIndex: 'username',
        ellipsis: true,
        render: (value) => (
          <Link href="/user/[username]" as={`/user/${value}`}>
            {value}
          </Link>
        ),
      },

      {
        title: 'QQ',
        key: 'qq',
        dataIndex: 'qq',
        ellipsis: true,
      },
      {
        title: '邮箱',
        key: 'email',
        dataIndex: 'email',
        ellipsis: true,
      },
      {
        title: '绑定 QQ',
        key: 'qq_union_id',
        dataIndex: 'qq_union_id',
        render: (value) =>
          value === '' ? (
            <CloseOutlined style={{ color: 'red' }} />
          ) : (
            <CheckOutlined style={{ color: 'green' }} />
          ),
      },
      {
        title: '绑定 Github',
        key: 'github_id',
        dataIndex: 'github_id',
        render: (value) =>
          value === 0 ? (
            <CloseOutlined style={{ color: 'red' }} />
          ) : (
            <CheckOutlined style={{ color: 'green' }} />
          ),
      },
      {
        title: '操作',
        key: 'op',
        render: (_, record) => (
          <Popconfirm
            title="确定要重置密码？"
            onConfirm={async (e) => {
              const r = await reset_password(record.id);
              notification.success({
                message: '修改成功',
                description: `新密码：${r.password}`,
                duration: null,
              });
            }}
          >
            <Button danger>重置密码</Button>
          </Popconfirm>
        ),
      },
    ];
    return (
      <Container lg={20} md={20} sm={24} xs={24}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`用户列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <Space>
            <Input
              placeholder="搜索用户"
              onChange={this.onChange}
              allowClear
              prefix={<Icon type="search" />}
              size="large"
            />
            <Table<Blotter.User>
              rowKey={(record) => record.id}
              columns={columns}
              scroll={{ x: true }}
              dataSource={this.state.data}
              loading={this.state.loading}
              onChange={(a, b, c, d) => this.onTableChange(a, b, Array.isArray(c) ? c[0] : c, d)}
              pagination={{
                current: this.state.page,
                total: this.state.total,
                pageSize: this.state.size,
                showSizeChanger: true,
              }}
            />
          </Space>
        </Card>
      </Container>
    );
  }
}

export default AdminUsers;
