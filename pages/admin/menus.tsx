import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card, Button, Typography, Popconfirm } from 'antd';
import { Icon } from '@ant-design/compatible';
import { ColumnsType } from 'antd/lib/table/interface';

import DragableTable from '@/components/dragable_table';

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
    const width = this.columns.find((item) => item.key == key).width;
    const padding = 16;
    var style = { width: undefined };
    if (typeof width === 'number') {
      style.width = width - padding * 2;
    } else {
      style.width = `calc(width - ${padding * 2}px)`;
    }
    return (
      <div style={style}>
        <Typography.Text
          style={{ width: '100%' }}
          ellipsis={true}
          editable={{
            onChange: (value) => {
              this.setState((state) => {
                var { data } = state;
                data[idx][key] = value;
                return { data };
              });
            },
          }}
        >
          {this.state.data[idx][key]}
        </Typography.Text>
      </div>
    );
  };

  columns: ColumnsType<Blotter.Menu> = [
    {
      dataIndex: 'name',
      key: 'name',
      title: '名称',
      width: 250,
      ellipsis: true,
      render: (_, __, idx) => {
        return this.renderEditableCell(idx, 'name');
      },
    },
    {
      dataIndex: 'link',
      key: 'link',
      title: '链接',
      width: 400,
      ellipsis: true,
      render: (_, __, idx) => {
        return this.renderEditableCell(idx, 'link');
      },
    },
    {
      dataIndex: 'icon',
      key: 'icon',
      title: '图标',
      width: 250,
      ellipsis: true,
      render: (_, __, idx) => {
        return this.renderEditableCell(idx, 'icon');
      },
    },
    {
      key: 'preview',
      title: '预览',
      width: 100,
      ellipsis: true,
      render(value, record) {
        return <Icon type={record.icon} />;
      },
    },
    {
      key: 'op',
      title: '操作',
      render: (_, record, idx) => (
        <Popconfirm
          title="真的要删除么？"
          onConfirm={() => {
            this.setState((state) => {
              var data = state.data;
              data = data.filter((item) => item.name !== record.name);
              data.map((d) => d);
              return { data };
            });
          }}
          okText="删除！"
          cancelText="算了"
        >
          <Button size="small" danger>
            <Icon type="delete" />
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  renderTableHead = () => (
    <div style={{ textAlign: 'right' }}>
      <Button
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
      >
        <Icon type="plus" />
        新建
      </Button>{' '}
      <Button
        type="primary"
        loading={this.state.submitLoading}
        onClick={async () => {
          this.setState({ submitLoading: true });
          var r = await menusSet(this.state.data);
          ShowNotification(r);
          this.setState({ submitLoading: false });
        }}
      >
        <Icon type="save" />
        保存修改
      </Button>
    </div>
  );

  render() {
    return (
      <Card>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`菜单列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <DragableTable<T>
          columns={this.columns}
          dataSource={this.state.data}
          loading={this.state.loading}
          pagination={false}
          title={() => this.renderTableHead()}
          rowKey={(col, idx) => `${col.name}_${idx}`}
          dragKey="root"
          scroll={{ x: true }}
          moveRow={(i, j) => {
            this.setState((state) => {
              var { data } = state;
              var temp = data[i];
              data[i] = data[j];
              data[j] = temp;
              data = data.map((d) => d);
              return { data };
            });
          }}
          size="large"
        />
      </Card>
    );
  }
}

export default AdminMenus;
