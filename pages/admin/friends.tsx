import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Flex } from '@/components/container';
import Table, { Column } from '@/components/table';
import Card from '@/components/card';
import Button from '@/components/button';
import Popover from '@/components/popover';
import Input, { CheckBox, DatePicker } from '@/components/input';
import { Delete, Plus, Save } from '@/components/svg';

import { Context } from '@/utils/global';
import { friends, friendsSet, friendsSpider } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import randomString from '@/utils/random';

import moment from '@/utils/moment';

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

  static contextType = Context;
  context!: React.ContextType<typeof Context>;

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
      <Input
        transform
        value={this.state.data[idx][key]}
        onChange={(value) => {
          this.setState((state) => {
            var { data } = state;
            data[idx][key] = value;
            data.map((d) => {
              d.posts = d.posts.map((dd) => dd);
              return d;
            });
            return { data };
          });
        }}
      />
    );
  };

  columns: Column<T>[] = [
    {
      title: '名称',
      key: 'name',
      tooltip: (v) => v,
      minWidth: '10em',
      maxWidth: '15em',
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'name'),
    },
    {
      title: '简介',
      key: 'description',
      tooltip: (v) => v,
      minWidth: '10em',
      maxWidth: '15em',
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'description'),
    },
    {
      title: '链接',
      key: 'link',
      tooltip: (v) => v,
      maxWidth: '10em',
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'link'),
    },
    {
      title: 'RSS',
      key: 'rss',
      tooltip: (v) => v,
      maxWidth: '10em',
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'rss'),
    },
    {
      title: '出错',
      key: 'error',
      minWidth: '5em',
      maxWidth: '10em',
      render: (_, __, idx) => (
        <CheckBox
          value={!!this.state.data[idx].error}
          onChange={(e) => {
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
      title: '交换',
      key: 'ex',
      minWidth: '5em',
      maxWidth: '10em',
      render: (_, __, idx) => (
        <CheckBox
          value={!!this.state.data[idx].ex}
          onChange={(e) => {
            this.setState((state) => {
              var { data } = state;
              data[idx].ex = e;
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
      tooltip: (v) => v,
      maxWidth: '10em',
      ellipsis: true,
      render: (_, __, idx) => this.renderEditableCell(idx, 'image'),
    },
    {
      title: '图片预览',
      key: 'image_preview',
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
      minWidth: '5em',
      maxWidth: '10em',
      render: (text, record, index) => (
        <Popover
          trigger={['click']}
          card
          shadow
          component={
            <Card>
              <Flex>
                真的要删除么?
                <Button
                  size="small"
                  danger
                  primary
                  onClick={() => {
                    this.setState((state) => {
                      var data = state.data.filter((item) => item.name !== record.name);
                      data.map((d) => {
                        d.posts = d.posts.map((dd) => dd);
                        return d;
                      });
                      return { data };
                    });
                  }}
                >
                  删除
                </Button>
              </Flex>
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

  renderSubTableHead = (index: number) => (
    <div style={{ textAlign: 'right' }}>
      <Button
        neumorphism
        primary
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
        prefix={<Plus />}
      >
        新建文章
      </Button>
    </div>
  );

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
              image: '',
              description: '',
              rss: '',
              posts: [],
              error: false,
              ex: false,
            });
            data = data.map((d) => {
              d.posts = d.posts.map((dd) => dd);
              return d;
            });
            return { data };
          });
        }}
      >
        新建订阅
      </Button>
      <Button
        neumorphism
        onClick={() => {
          this.setState((state) => {
            var { data } = state;

            // 如果第一个是当前博客，则保留不动
            var first = undefined;
            if (this.context.root === data[0].link) {
              first = data[0];
              data = data.splice(1);
            }

            data = data.map((d) => {
              d.posts.sort((a, b) => b.time - a.time);
              return d;
            });
            data.sort((a, b) =>
              a.ex === b.ex
                ? (b.posts.length > 0 ? b.posts[0].time : 0) -
                  (a.posts.length > 0 ? a.posts[0].time : 0)
                : a.ex
                ? -1
                : 1,
            );

            if (!!first) data = [first, ...data];

            data = data.map((d) => {
              d.posts = d.posts.map((dd) => dd);
              return d;
            });
            return { data };
          });
        }}
      >
        自动排序
      </Button>
      <Button
        neumorphism
        loading={this.state.submitLoading}
        onClick={async () => {
          this.setState({ submitLoading: true });
          var r = await friendsSpider();
          ShowNotification(r);
          this.setState({ submitLoading: false });
        }}
      >
        订阅更新
      </Button>

      <Button
        neumorphism
        primary
        loading={this.state.submitLoading}
        onClick={async () => {
          this.setState({ submitLoading: true });
          var r = await friendsSet(this.state.data);
          ShowNotification(r);
          this.setState({ submitLoading: false });
        }}
        prefix={<Save />}
      >
        保存修改
      </Button>
    </Flex>
  );

  renderExpand = (record: T, index: number) => {
    const columns: Column<T2>[] = [
      {
        key: 'title',
        title: '标题',
        minWidth: '10em',
        maxWidth: '20em',
        tooltip: (v) => v,
        ellipsis: true,
        render: (_, __, idx) => renderSubEditableCell(index, idx, 'title'),
      },
      {
        key: 'link',
        title: '链接',
        minWidth: '10em',
        maxWidth: '20em',
        tooltip: (v) => v,
        ellipsis: true,
        render: (_, __, idx) => renderSubEditableCell(index, idx, 'link'),
      },
      {
        key: 'time',
        title: '日期',
        ellipsis: true,
        minWidth: '5em',
        maxWidth: '20em',
        render: (value, __, idx) => (
          <DatePicker
            defaultValue={value * 1000}
            onChange={(e) => {
              this.setState((state) => {
                var { data } = state;
                data[index].posts[idx].time = e / 1000;
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
        key: 'op',
        title: '操作',
        minWidth: '5em',
        maxWidth: '10em',
        render: (_, record, idx) => (
          <Popover
            card
            shadow
            trigger={['click']}
            component={
              <Card>
                <Flex>
                  真的要删除么？
                  <Button
                    neumorphism
                    primary
                    danger
                    size="small"
                    onClick={() => {
                      this.setState((state) => {
                        var data = state.data;
                        data[index].posts = data[index].posts.filter(
                          (item) => item.title !== record.title,
                        );
                        data.map((d) => {
                          d.posts = d.posts.map((dd) => dd);
                          return d;
                        });
                        return { data };
                      });
                    }}
                  >
                    删除
                  </Button>
                </Flex>
              </Card>
            }
          >
            <Button size="small" neumorphism danger prefix={<Delete />}>
              删除
            </Button>
          </Popover>
        ),
      },
    ];
    const renderSubEditableCell = (index: number, idx: number, key: string) => {
      return (
        <Input
          transform
          value={this.state.data[index].posts[idx][key]}
          onChange={(value) => {
            this.setState((state) => {
              var { data } = state;
              data[index].posts[idx][key] = value;
              data.map((d) => {
                d.posts = d.posts.map((dd) => dd);
                return d;
              });
              return { data };
            });
          }}
        />
      );
    };
    return (
      <Flex direction="TB" fullWidth>
        {this.renderSubTableHead(index)}
        <Table<T2>
          columns={columns}
          data={record.posts}
          pagination={false}
          showHeader={false}
          onMove={(i, j) => {
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
        />
      </Flex>
    );
  };

  render() {
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`优秀博客订阅|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Flex direction="TB" fullWidth>
          {this.renderTableHead()}
          <Table<T>
            columns={this.columns}
            data={this.state.data}
            loading={this.state.loading}
            pagination={false}
            expand={this.renderExpand}
            onMove={(i, j) => {
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
          />
        </Flex>
      </Card>
    );
  }
}

export default AdminFriendList;
