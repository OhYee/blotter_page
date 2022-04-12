import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Flex } from '@/components/container';
import { Edit, Plus, Delete, Image } from '@/components/svg';
import TagPart from '@/components/tag';
import { QiniuModal } from '@/components/upload';
import Table, { Column } from '@/components/table';
import Button from '@/components/button';
import Input, { TextArea } from '@/components/input';
import Popover from '@/components/popover';
import Card from '@/components/card';

import { Context } from '@/utils/global';
import { adminTags, tagDelete, tagEdit } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import { waitUntil } from '@/utils/debounce';
import randomString from '@/utils/random';
import { CheckBox, Radio } from '@/components/input';


interface T extends Blotter.TagWithCount {}

interface AdminTagListProps extends ComponentProps<'base'> {}

interface AdminTagListState {
  loading: boolean;
  data: T[];
  total: number;
  size: number;
  page: number;
  keyword: string;
  upload: boolean;
  sortField: string;
  sortAscending: boolean;
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
      total: 0,
      page: 1,
      size: 10,
      keyword: '',
      upload: false,
      sortField: 'count',
      sortAscending: false,
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
    this.setState({
      data: r.tags,
      total: r.total,
      loading: false,
      sortField: field,
      sortAscending: up,
    });
  };

  renderEditableCell = (idx: number, key: string, textarea = false) => {
    const props = {
      transform: true,
      value: this.state.data[idx][key],
      onChange: (value) => {
        this.setState((state) => {
          var { data } = state;
          data[idx][key] = value;
          return { data };
        });
      },
    };
    return textarea ? <TextArea {...props} /> : <Input {...props} />;
  };

  columns: Column<T>[] = [
    {
      title: '名称',
      key: 'name',
      tooltip: (text) => text,
      sorter: true,
      minWidth: '5em',
      maxWidth: '10em',
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'name'),
    },
    {
      title: '链接',
      key: 'short',
      tooltip: (text) => text,
      sorter: true,
      minWidth: '5em',
      maxWidth: '10em',
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'short'),
    },
    {
      title: '图标',
      key: 'icon',
      tooltip: (text) => text,
      sorter: true,
      minWidth: '5em',
      maxWidth: '10em',
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'icon'),
    },
    {
      title: '颜色',
      key: 'color',
      tooltip: (text) => text,
      sorter: true,
      minWidth: '5em',
      maxWidth: '10em',
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'color'),
    },
    {
      title: '预览',
      key: 'view',
      minWidth: '10em',
      maxWidth: '20em',
      render: (_, record, __) => <TagPart tag={record} />,
    },
    {
      title: '文章个数',
      key: 'count',
      tooltip: true,
      minWidth: '6em',
      maxWidth: '12em',
      ellipsis: true,
    },
    {
      title: '是否隐藏',
      key: 'hidden',
      minWidth: '6em',
      maxWidth: '12em',
      render:(_,recoder,idx)=>(
        <CheckBox
        switchStyle={true}
        checkText="是"
        uncheckText="否"
        value={!!this.state.data[idx].hide}
        onChange={(value) =>
          this.setState((state) => {
            var { data } = state;
            data[idx].hide = value;
            return { data };
          })
        }
      />
      ),
    },
    {
      title: '操作',
      key: 'op',
      minWidth: '12em',
      maxWidth: '15em',
      headStyle: { textAlign: 'center' },
      render: (_, record, idx) => (
        <Flex mainAxis="space-around">
          <Button size="small" onClick={() => this.onEdit(idx)} neumorphism prefix={<Edit />}>
            修改
          </Button>
          <Popover
            shadow
            card
            trigger={['click']}
            component={
              <Card>
                <span>真的要删除么？</span>
                <Button
                  onClick={() => {
                    this.onDelete(record.id);
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
        </Flex>
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
        description: '',
        hide: false,
      });
      data = data.map((d) => d);
      return { data };
    });
  };

  onEdit = async (idx: number) => {
    var tag = this.state.data[idx];
    var r = await tagEdit(tag.id, tag.name, tag.short, tag.color, tag.icon, tag.description,tag.hide);
    ShowNotification(r);
  };

  onDelete = async (id: string) => {
    var r = await tagDelete(id);
    ShowNotification(r);
    this.setState((state) => ({ data: state.data.filter((tag) => tag.id != id) }));
  };

  searchOnChange = (value: string) => {
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

  renderImages = () => {
    return (
      <React.Fragment>
        <QiniuModal
          show={this.state.upload}
          onClose={() => this.setState({ upload: false })}
          defaultTab="upload"
        />
        <Button
          circle
          size="large"
          primary
          danger={this.state.upload}
          neumorphism
          style={{ position: 'fixed', right: 20, top: 50, zIndex: 2 }}
          onClick={() => this.setState((state) => ({ upload: !state.upload }))}
          icon={<Image />}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`标签列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        {this.renderImages()}
        <Flex subSize="middle">
          <Flex.Item style={{ flex: '1 1 auto' }}>
            <Input placeholder="搜索标签" onChange={this.searchOnChange}></Input>
          </Flex.Item>
          <Button primary onClick={this.onInsert} neumorphism prefix={<Plus />}>
            新建标签
          </Button>
        </Flex>

        <Table<T>
          //   rowKey={(record) => record.id}
          columns={this.columns}
          //   scroll={{ x: true }}
          data={this.state.data}
          loading={this.state.loading}
          //   onChange={}
          expand={(_, idx) => this.renderEditableCell(idx, 'description', true)}
          pagination={{
            page: this.state.page,
            size: this.state.size,
            total: this.state.total,
            sizeSelect: [10, 20, 30, 40, 50],
          }}
          onChange={(page, size, name, ascending) => {
            this.getData(
              this.state.keyword,
              size,
              page,
              !!name ? name : defaultSortField,
              !!name ? ascending : defaultSortInc,
            );
          }}
        />
      </Card>
    );
  }
}

export default AdminTagList;
