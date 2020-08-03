import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card, Table, Button, Typography, Popconfirm, Checkbox } from 'antd';
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
                data.map((d) => {
                  d.posts = d.posts.map((dd) => dd);
                  return d;
                });
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

  columns: ColumnProps<T>[] = [
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'name'),
    },
    {
      title: '简介',
      key: 'description',
      dataIndex: 'description',
      width: 200,
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'description'),
    },
    {
      title: '链接',
      key: 'link',
      dataIndex: 'link',
      width: 200,
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'link'),
    },
    {
      title: 'RSS',
      key: 'rss',
      dataIndex: 'rss',
      width: 200,
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'rss'),
    },
    {
      title: '出错',
      key: 'error',
      dataIndex: 'error',
      width: 50,
      ellipsis: true,
      render: (_, __, idx) => (
        <Checkbox
          checked={!!this.state.data[idx].error}
          onChange={(v) => {
            const e = v.target.checked;
            this.setState((state) => {
              var { data } = state;
              data[idx].error = e;
              data.map((d) => {
                d.posts = d.posts.map((dd) => dd);
                return d;
              });
              return { data };
            });
          }}
        />
      ),
    },
    {
      title: '图片',
      key: 'image',
      dataIndex: 'image',
      width: 200,
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'image'),
    },
    {
      title: '图片预览',
      key: 'image_preview',
      width: 100,
      ellipsis: true,
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
      render: (text, record, index) => (
        <Popconfirm
          title="真的要删除么？"
          onConfirm={() => {
            this.setState((state) => {
              var data = state.data.filter((item) => item.name !== record.name);
              data.map((d) => {
                d.posts = d.posts.map((dd) => dd);
                return d;
              });
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

  renderSubTableHead = (index: number) => (
    <div style={{ textAlign: 'right' }}>
      <Button
        type="primary"
        onClick={() => {
          this.setState((state) => {
            var { data } = state;
            data[index].posts.unshift({ title: randomString(), link: '', time: 0 });
            data.map((d) => {
              d.posts = d.posts.map((dd) => dd);
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
          this.setState((state) => {
            var { data } = state;
            data.push({
              name: randomString(),
              link: '',
              image: '',
              description: '',
              rss: '',
              posts: [],
              error: false,
            });
            data = data.map((d) => {
              d.posts = d.posts.map((dd) => dd);
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
        key: 'title',
        title: '标题',
        dataIndex: 'title',
        width: 400,
        render: (_, __, idx) => renderSubEditableCell(index, idx, 'title'),
      },
      {
        key: 'link',
        title: '链接',
        dataIndex: 'link',
        width: 400,
        render: (_, __, idx) => renderSubEditableCell(index, idx, 'link'),
      },
      {
        title: '操作',
        dataIndex: 'op',
        render: (_, record, idx) => (
          <Popconfirm
            title="真的要删除么？"
            onConfirm={() => {
              this.setState((state) => {
                var data = state.data;
                data[index].posts = data[index].posts.filter((item) => item.title !== record.title);
                data.map((d) => {
                  d.posts = d.posts.map((dd) => dd);
                  return d;
                });
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
    const renderSubEditableCell = (index: number, idx: number, key: string) => {
      const width = columns.find((item) => item.key == key).width;
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
                  data[index].posts[idx][key] = value;
                  data.map((d) => {
                    d.posts = d.posts.map((dd) => dd);
                    return d;
                  });
                  return { data };
                });
              },
            }}
          >
            {this.state.data[index].posts[idx][key]}
          </Typography.Text>
        </div>
      );
    };
    return (
      <DragableTable<T2>
        rowKey={(record, idx) => `${record.title}_${record.link}_${idx}`}
        columns={columns}
        dataSource={record.posts}
        pagination={false}
        showHeader={false}
        scroll={{ x: true }}
        title={() => this.renderSubTableHead(index)}
        size="small"
        dragKey={`${index}`}
        moveRow={(i, j) => {
          this.setState((state) => {
            var data = state.data;

            var temp = data[index].posts[i];
            data[index].posts[i] = data[index].posts[j];
            data[index].posts[j] = temp;

            data.map((d) => {
              d.posts = d.posts.map((dd) => dd);
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
          {(context) => (
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
            scroll={{ x: true }}
            moveRow={(i, j) => {
              this.setState((state) => {
                var { data } = state;
                var temp = data[i];
                data[i] = data[j];
                data[j] = temp;
                data.map((d) => {
                  d.posts = d.posts.map((dd) => dd);
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
