import React, { ComponentProps } from 'react';

import Head from 'next/head';

import Card from '@/components/card';
import Button from '@/components/button';
import Popover from '@/components/popover';
import Table, { Column } from '@/components/table';
import Input from '@/components/input';
import SVG, { Delete, Plus, Save } from '@/components/svg';
import { Flex } from '@/components/container';

import { Context } from '@/utils/global';
import { menus, menusSet } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import randomString from '@/utils/random';

interface T extends Blotter.Menu {}

interface AdminMenusProps extends ComponentProps<'base'> {}

interface AdminMenusState {
  loading: boolean;
  data: Blotter.Menu[];
  submitLoading: boolean;
}

class AdminMenus extends React.Component<AdminMenusProps, AdminMenusState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      submitLoading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    var r = await menus();
    this.setState({ data: r, loading: false });
  };

  renderEditableCell = (idx: number, key: string) => {
    return (
      <Input
        transform
        value={this.state.data[idx][key]}
        onChange={(value) => {
          this.setState((state) => {
            var { data } = state;
            data[idx][key] = value;
            return { data };
          });
        }}
      />
    );
  };

  columns: Column<Blotter.Menu>[] = [
    {
      key: 'name',
      title: '名称',
      tooltip: (t) => t,
      minWidth: '5em',
      ellipsis: true,
      render: (_, __, idx) => {
        return this.renderEditableCell(idx, 'name');
      },
    },
    {
      key: 'link',
      title: '链接',
      tooltip: (t) => t,
      minWidth: '5em',
      ellipsis: true,
      render: (_, __, idx) => {
        return this.renderEditableCell(idx, 'link');
      },
    },
    {
      key: 'icon',
      title: '图标',
      tooltip: (t) => t,
      minWidth: '5em',
      maxWidth: '15em',
      ellipsis: true,
      render: (_, __, idx) => {
        return this.renderEditableCell(idx, 'icon');
      },
    },
    {
      key: 'preview',
      title: '预览',
      minWidth: '5em',
      maxWidth: '10em',
      render: (value, record) => <SVG icon={record.icon as any} />,
    },
    {
      key: 'op',
      title: '操作',
      render: (_, record, idx) => (
        <Popover
          shadow
          card
          trigger={['click']}
          component={
            <Card>
              <span>真的要删除么？</span>
              <Button
                onClick={() => {
                  this.setState((state) => {
                    var data = state.data;
                    data = data.filter((item) => item.name !== record.name);
                    data.map((d) => d);
                    return { data };
                  });
                }}
                size="small"
                danger
                neumorphism
                primary
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
      ),
    },
  ];

  renderTableHead = () => (
    <Flex mainAxis="flex-end">
      <Button
        neumorphism
        onClick={() => {
          this.setState((state) => {
            var { data } = state;
            data.push({
              name: randomString(),
              link: '',
              icon: '',
            });
            data = data.map((d) => d);
            return { data };
          });
        }}
        prefix={<Plus />}
      >
        新建
      </Button>
      <Button
        neumorphism
        primary
        loading={this.state.submitLoading}
        onClick={async () => {
          this.setState({ submitLoading: true });
          var r = await menusSet(this.state.data);
          ShowNotification(r);
          this.setState({ submitLoading: false });
        }}
        prefix={<Save />}
      >
        保存修改
      </Button>
    </Flex>
  );

  render() {
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`菜单列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        {this.renderTableHead()}
        <Table<T>
          columns={this.columns}
          data={this.state.data}
          loading={this.state.loading}
          pagination={false}
          onMove={(i, j) => {
            this.setState((state) => {
              var { data } = state;
              var temp = data[i];
              data[i] = data[j];
              data[j] = temp;
              data = data.map((d) => d);
              return { data };
            });
          }}
        />
      </Card>
    );
  }
}

export default AdminMenus;
