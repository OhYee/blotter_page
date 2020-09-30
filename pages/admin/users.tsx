import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Card from '@/components/card';
import Table, { Column } from '@/components/table';
import Button from '@/components/button';
import Input from '@/components/input';
import Avatar from '@/components/avatar';
import Popover from '@/components/popover';
import Notification from '@/components/notification';
import { Search, Close, Success } from '@/components/svg';
import { Flex } from '@/components/container';

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

  onChange = (value: string) => {
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

  onTableChange = (page: number, size: number, name: string, ascending: boolean) => {
    this.setState({ page, size, field: name, up: ascending }, this.getData);
  };

  render() {
    const columns: Column<Blotter.User>[] = [
      {
        title: '头像',
        key: 'avatar',
        minWidth: 50,
        maxWidth: 100,
        render: (value) => <Avatar src={value} />,
      },
      {
        title: '名称',
        key: 'username',
        minWidth: 50,
        maxWidth: 100,
        ellipsis: true,
        tooltip: (v) => v,
        render: (value) => (
          <Link href="/user/[username]" as={`/user/${value}`}>
            {value}
          </Link>
        ),
      },

      {
        title: 'QQ',
        key: 'qq',
        minWidth: 50,
        maxWidth: 100,
        ellipsis: true,
        tooltip: (v) => v,
      },
      {
        title: '邮箱',
        key: 'email',
        minWidth: 50,
        maxWidth: 100,
        ellipsis: true,
        tooltip: (v) => v,
      },
      {
        title: '绑定 QQ',
        key: 'qq_union_id',
        minWidth: 50,
        maxWidth: 100,
        render: (value) =>
          value === '' ? (
            <Close style={{ color: 'red' }} />
          ) : (
            <Success style={{ color: 'green' }} />
          ),
      },
      {
        title: '绑定 Github',
        key: 'github_id',
        minWidth: 50,
        maxWidth: 100,
        render: (value) =>
          value === 0 ? <Close style={{ color: 'red' }} /> : <Success style={{ color: 'green' }} />,
      },
      {
        title: '操作',
        key: 'op',
        minWidth: 50,
        maxWidth: 100,
        render: (_, record) => (
          <Popover
            card
            shadow
            component={
              <Flex>
                <span>确定要重置密码？</span>
                <Button
                  danger
                  primary
                  neumorphism
                  size="small"
                  onClick={async () => {
                    const r = await reset_password(record.id);
                    Notification.message({
                      alertType: 'success',
                      title: '修改成功',
                      content: `新密码：${r.password}`,
                      autoClose: 0,
                    });
                  }}
                >
                  重置
                </Button>
              </Flex>
            }
          >
            <Button danger size="small" neumorphism>
              重置密码
            </Button>
          </Popover>
        ),
      },
    ];
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`用户列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Flex direction="TB" fullWidth>
          <Input placeholder="搜索用户" onChange={this.onChange} prefix={<Search />} size="large" />
          <Table<Blotter.User>
            columns={columns}
            data={this.state.data}
            loading={this.state.loading}
            onChange={this.onTableChange}
            pagination={{
              page: this.state.page,
              total: this.state.total,
              size: this.state.size,
              sizeSelect: [5, 10, 20, 50, 100],
            }}
          />
        </Flex>
      </Card>
    );
  }
}

export default AdminUsers;
