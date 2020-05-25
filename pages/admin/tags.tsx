import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card, Table, Button, Typography, Form, Input, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Icon } from '@ant-design/compatible';
import { PaginationConfig } from 'antd/lib/pagination';
import {
  SorterResult,
  TableCurrentDataSource,
  TablePaginationConfig,
} from 'antd/lib/table/interface';

import Container from '@/components/container';
import TagPart from '@/components/tag';

import { Context } from '@/utils/global';
import { adminTags, tagDelete, tagEdit } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import { waitUntil } from '@/utils/debounce';
import randomString from '@/utils/random';

interface T extends Blotter.TagWithCount {}

interface AdminTagListProps extends ComponentProps<'base'> {}

interface AdminTagListState {
  loading: boolean;
  pagination: PaginationConfig;
  data: T[];
  total: number;
  size: number;
  page: number;
  keyword: string;
}

const defaultSortField = 'count';
const defaultSortInc = false;

class AdminTagList extends React.Component<AdminTagListProps, AdminTagListState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      pagination: {},
      data: [],
      total: 0,
      page: 1,
      size: 10,
      keyword: '',
    };
  }

  componentDidMount() {
    this.getData('', 10);
  }

  getData = async (
    keyword: string,
    size: number,
    page: number = 1,
    field: string = defaultSortField,
    up: boolean = defaultSortInc,
  ) => {
    this.setState({ loading: true, page, size });
    var r = await adminTags(keyword, page, size, field, up);
    this.setState({ data: r.tags, total: r.total, loading: false });
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

  columns: ColumnProps<T>[] = [
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      sorter: true,
      width: 200,
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'name'),
    },
    {
      title: '链接',
      key: 'short',
      dataIndex: 'short',
      sorter: true,
      width: 200,
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'short'),
    },
    {
      title: '图标',
      key: 'icon',
      dataIndex: 'icon',
      sorter: true,
      width: 200,
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'icon'),
    },
    {
      title: '颜色',
      key: 'color',
      dataIndex: 'color',
      sorter: true,
      width: 150,
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'color'),
    },
    {
      title: '预览',
      key: 'view',
      dataIndex: 'view',
      width: 100,
      ellipsis: true,
      render: (_, record, __) => <TagPart tag={record} />,
    },
    {
      title: '文章个数',
      key: 'count',
      dataIndex: 'count',
      width: 120,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'op',
      render: (_, record, idx) => (
        <div style={{ whiteSpace: 'nowrap' }}>
          <Button size="small" onClick={() => this.onEdit(idx)}>
            <Icon type="edit" />
            修改
          </Button>{' '}
          <Popconfirm
            title="真的要删除么？"
            onConfirm={() => {
              this.onDelete(record.id);
            }}
            okText="删除！"
            cancelText="算了"
          >
            <Button size="small" danger>
              <Icon type="delete" />
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  onInsert = () => {
    this.setState((state) => {
      var data = state.data;
      data.unshift({
        id: '',
        name: randomString(),
        short: randomString(),
        color: '',
        icon: '',
        count: 0,
      });
      data = data.map((d) => d);
      return { data };
    });
  };

  onEdit = async (idx: number) => {
    var tag = this.state.data[idx];
    var r = await tagEdit(tag.id, tag.name, tag.short, tag.color, tag.icon);
    ShowNotification(r);
  };

  onDelete = async (id: string) => {
    var r = await tagDelete(id);
    ShowNotification(r);
    this.setState((state) => ({ data: state.data.filter((tag) => tag.id != id) }));
  };

  searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var value = e.target.value;
    waitUntil(
      'admin_tags_search',
      () => {
        this.setState((state) => {
          return {
            page: 1,
            keyword: value,
          };
        });
        this.getData(value, this.state.size);
      },
      1000,
    );
  };

  onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, React.ReactText[] | null>,
    sorter: SorterResult<T>,
    extra: TableCurrentDataSource<T>,
  ) => {
    const { current, pageSize } = pagination;
    const { field, order } = sorter;
    var defaultSort = typeof order === 'undefined';
    this.getData(
      this.state.keyword,
      pageSize!,
      current!,
      defaultSort ? defaultSortField : `${field}`,
      defaultSort ? defaultSortInc : order === 'ascend',
    );
  };

  render() {
    return (
      <Container lg={20} md={20} sm={24} xs={24}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`标签列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <Form layout="inline">
            <Form.Item wrapperCol={{ md: 20, sm: 24 }}>
              <Input placeholder="搜索标签" onChange={this.searchOnChange}></Input>
            </Form.Item>
            <Form.Item wrapperCol={{ md: 4, sm: 24 }}>
              <Button type="primary" onClick={this.onInsert}>
                <Icon type="plus" />
                新建标签
              </Button>
            </Form.Item>
          </Form>

          <Table<T>
            rowKey={(record) => record.id}
            columns={this.columns}
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
        </Card>
      </Container>
    );
  }
}

export default AdminTagList;
