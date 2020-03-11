import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card, Table, Button, Typography, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Icon } from '@ant-design/compatible';

import Container from '@/components/container';
import DragableTable from '@/components/dragable_table';

import { Context } from '@/utils/global';
import { friends, friendsSet } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import randomString from '@/utils/random';

interface T extends Blotter.Friend {}
interface T2 {
  title: string;
  link: string;
}

interface AdminFriendListProps extends ComponentProps<'base'> {}

interface AdminFriendListState {
  loading: boolean;
  data: T[];
  submitLoading: boolean;
}

const defaultSortField = 'count';
const defaultSortInc = false;

class AdminFriendList extends React.Component<AdminFriendListProps, AdminFriendListState> {
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
    var r = await friends();
    this.setState({ data: r, loading: false });
  };

  renderEditableCell = (idx: number, key: string) => {
    return (
      <Typography.Text
        editable={{
          onChange: value => {
            this.setState(state => {
              var { data } = state;
              data[idx][key] = value;
              data.map(d => {
                d.posts = d.posts.map(dd => dd);
                return d;
              });
              return { data };
            });
          },
        }}
      >
        {this.state.data[idx][key]}
      </Typography.Text>
    );
  };

  renderSubEditableCell = (index: number, idx: number, key: string) => {
    return (
      <Typography.Text
        editable={{
          onChange: value => {
            this.setState(state => {
              var { data } = state;
              data[index].posts[idx][key] = value;
              data.map(d => {
                d.posts = d.posts.map(dd => dd);
                return d;
              });
              return { data };
            });
          },
        }}
      >
        {this.state.data[index].posts[idx][key]}
      </Typography.Text>
    );
  };

  columns: ColumnProps<T>[] = [
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      width: '15%',
      render: (_, __, idx) => this.renderEditableCell(idx, 'name'),
    },
    {
      title: '简介',
      key: 'description',
      dataIndex: 'description',
      width: '25%',
      render: (_, __, idx) => this.renderEditableCell(idx, 'description'),
    },
    {
      title: '链接',
      key: 'link',
      dataIndex: 'link',
      width: '15%',
      render: (_, __, idx) => this.renderEditableCell(idx, 'link'),
    },
    {
      title: '图片',
      key: 'image',
      dataIndex: 'image',
      width: '15%',
      render: (_, __, idx) => this.renderEditableCell(idx, 'image'),
    },
    {
      title: '图片预览',
      key: 'image_preview',
      width: '10%',
      render: (_, __, idx) => (
        <img
          width={'50px'}
          src={this.state.data[idx].image}
          {...{ referrerPolicy: 'no-referrer' }}
        />
      ),
    },
    {
      title: '操作',
      key: 'op',
      width: '20%',
      render: (text, record, index) => (
        <Popconfirm
          title="真的要删除么？"
          onConfirm={() => {
            this.setState(state => {
              var data = state.data.filter(item => item.name !== record.name);
              data.map(d => {
                d.posts = d.posts.map(dd => dd);
                return d;
              });
              return { data };
            });
          }}
          okText="删除！"
          cancelText="算了"
        >
          <Button size="small" type="danger">
            <Icon type="delete" />
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  renderSubTableHead = (index: number) => (
    <div style={{ textAlign: 'right' }}>
      <Button
        type="primary"
        onClick={() => {
          this.setState(state => {
            var { data } = state;
            data[index].posts.unshift({ title: randomString(), link: '' });
            data.map(d => {
              d.posts = d.posts.map(dd => dd);
              return d;
            });
            return { data };
          });
        }}
      >
        <Icon type="plus" />
        新建文章
      </Button>
    </div>
  );

  renderTableHead = () => (
    <div style={{ textAlign: 'right' }}>
      <Button
        onClick={() => {
          this.setState(state => {
            var { data } = state;
            data.push({
              name: randomString(),
              link: '',
              image: '',
              description: '',
              posts: [],
            });
            data = data.map(d => {
              d.posts = d.posts.map(dd => dd);
              return d;
            });
            return { data };
          });
        }}
      >
        <Icon type="plus" />
        新建友链
      </Button>{' '}
      <Button
        type="primary"
        loading={this.state.submitLoading}
        onClick={async () => {
          this.setState({ submitLoading: true });
          var r = await friendsSet(this.state.data);
          ShowNotification(r);
          this.setState({ submitLoading: false });
        }}
      >
        <Icon type="save" />
        保存修改
      </Button>
    </div>
  );

  renderExpand = (record: T, index: number, indent: number, expanded: boolean) => {
    const columns: ColumnProps<T2>[] = [
      {
        title: '标题',
        dataIndex: 'title',
        width: '30%',
        render: (_, __, idx) => this.renderSubEditableCell(index, idx, 'title'),
      },
      {
        title: '链接',
        dataIndex: 'link',
        width: '50%',
        render: (_, __, idx) => this.renderSubEditableCell(index, idx, 'link'),
      },
      {
        title: '操作',
        dataIndex: 'op',
        width: '20%',
        render: (_, record, idx) => (
          <Popconfirm
            title="真的要删除么？"
            onConfirm={() => {
              this.setState(state => {
                var data = state.data;
                data[index].posts = data[index].posts.filter(item => item.title !== record.title);
                data.map(d => {
                  d.posts = d.posts.map(dd => dd);
                  return d;
                });
                return { data };
              });
            }}
            okText="删除！"
            cancelText="算了"
          >
            <Button size="small" type="danger">
              <Icon type="delete" />
              删除
            </Button>
          </Popconfirm>
        ),
      },
    ];
    return (
      <DragableTable<T2>
        rowKey={(record, idx) => `${record.title}_${record.link}_${idx}`}
        columns={columns}
        dataSource={record.posts}
        pagination={false}
        showHeader={false}
        title={() => this.renderSubTableHead(index)}
        size="small"
        dragKey={`${index}`}
        moveRow={(i, j) => {
          this.setState(state => {
            var data = state.data;

            var temp = data[index].posts[i];
            data[index].posts[i] = data[index].posts[j];
            data[index].posts[j] = temp;

            data.map(d => {
              d.posts = d.posts.map(dd => dd);
              return d;
            });
            return { data };
          });
        }}
        style={{ background: 'transparent' }}
      />
    );
  };

  render() {
    return (
      <Container lg={20} md={20} sm={24} xs={24}>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`友链列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <DragableTable<T>
            columns={this.columns}
            dataSource={this.state.data}
            loading={this.state.loading}
            pagination={false}
            expandedRowRender={this.renderExpand}
            title={() => this.renderTableHead()}
            rowKey={(col, idx) => `${col.name}_${idx}`}
            dragKey="root"
            moveRow={(i, j) => {
              this.setState(state => {
                var { data } = state;
                var temp = data[i];
                data[i] = data[j];
                data[j] = temp;
                data.map(d => {
                  d.posts = d.posts.map(dd => dd);
                  return d;
                });
                return { data };
              });
            }}
            size="small"
          />
        </Card>
      </Container>
    );
  }
}

export default AdminFriendList;
