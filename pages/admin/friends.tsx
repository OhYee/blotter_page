import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Card, Table, Button, Row, Col, Icon, Typography, Form, Input, Popconfirm } from 'antd';
import {
  TableCurrentDataSource,
  SorterResult,
  PaginationConfig,
  ColumnProps,
} from 'antd/lib/table';

import Container from '@/components/container';
import TagPart from '@/components/tag';

import { adminTags, tagDelete, tagEdit, friends, friendsSet } from '@/utils/api';
import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';
import { waitUntil } from '@/utils/debounce';
import { createObjectBindingPattern } from 'typescript';
import DraggableTable from '@/components/draggable_table';

interface T extends Blotter.Friend {}
interface T2 {
  title: string;
  link: string;
}

interface AdminTagListProps extends ComponentProps<'base'> {}

interface AdminTagListState {
  loading: boolean;
  data: T[];
  submitLoading: boolean;
}

const defaultSortField = 'count';
const defaultSortInc = false;

class AdminTagList extends React.Component<AdminTagListProps, AdminTagListState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      submitLoading: false,
    };
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    var r = await friends();
    this.setState({ data: r, loading: false });
  };

  renderEditableCell = (key: string, data: { [key: string]: any }, idx: number) => {
    return (
      <Typography.Text
        editable={{
          onChange: value => {
            this.setState(state => {
              state.data[idx][key] = value;
              return { data: state.data };
            });
            data[key] = value;
          },
        }}
      >
        {data[key]}
      </Typography.Text>
    );
  };

  columns: ColumnProps<T>[] = [
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      width: '15%',
      render: (_, record, idx) => this.renderEditableCell('name', record, idx),
    },
    {
      title: '简介',
      key: 'description',
      dataIndex: 'description',
      width: '30%',
      render: (_, record, idx) => this.renderEditableCell('description', record, idx),
    },
    {
      title: '链接',
      key: 'link',
      dataIndex: 'link',
      width: '15%',
      render: (_, record, idx) => this.renderEditableCell('link', record, idx),
    },
    {
      title: '图片',
      key: 'image',
      dataIndex: 'image',
      width: '15%',
      render: (_, record, idx) => this.renderEditableCell('image', record, idx),
    },
    {
      title: '图片预览',
      key: 'image_preview',
      width: '10%',
      render: (_, record, idx) => (
        <img width={'50px'} src={record.image} {...{ referrerPolicy: 'no-referrer' }} />
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
            state.data[index].posts.unshift({ title: '', link: '' });
            return state;
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
            state.data.unshift({
              name: '',
              link: '',
              image: '',
              description: '',
              posts: [],
            });
            return state;
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
        render: (_, record, idx) => this.renderEditableCell('title', record, idx),
      },
      {
        title: '链接',
        dataIndex: 'link',
        width: '50%',
        render: (_, record, idx) => this.renderEditableCell('link', record, idx),
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
      <DraggableTable
        columns={columns}
        dataSource={record.posts}
        pagination={false}
        showHeader={false}
        title={() => this.renderSubTableHead(index)}
        size="small"
        moveRow={(i, j) => {
          this.setState(state => {
            var data = state.data;

            var temp = data[index].posts[i];
            data[index].posts[i] = data[index].posts[j];
            data[index].posts[j] = temp;
            return { data };
          });
        }}
      />
    );
  };

  render() {
    return (
      <Container lg={20} md={20} sm={24} xs={24}>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`标签列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <DraggableTable
            columns={this.columns}
            dataSource={this.state.data}
            loading={this.state.loading}
            pagination={false}
            expandedRowRender={this.renderExpand}
            title={() => this.renderTableHead()}
            rowKey={col => col.name}
            moveRow={(i, j) => {
              this.setState(state => {
                var data = state.data;
                var temp = data[i];
                data[i] = data[j];
                data[j] = temp;
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

export default AdminTagList;
