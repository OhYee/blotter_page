import React, { ComponentProps, Fragment } from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import {
  Input,
  Card,
  Button,
  Row,
  Col,
  Checkbox,
  List,
  Tooltip,
  Typography,
  PageHeader,
  Tag,
  Table,
  Alert,
  Popconfirm,
} from 'antd';
import { Icon } from '@ant-design/compatible';

import Container from '@/components/container';
import PostList from '@/components/post_list';

import { Context } from '@/utils/global';

import { request } from '@/utils/request';

import moment from 'moment';
import ShowNotification from '@/utils/notification';
import { ColumnsType } from 'antd/lib/table';

interface QueueItem {
  _id: string;
  id: string;
  name: string;
  time: number;
  finish: boolean;
}

interface QueueProps extends ComponentProps<'base'>, WithRouterProps {}

interface QueueState {
  queue: QueueItem[];
  value: string;
  loading: boolean;
}

class Queue extends React.Component<QueueProps, QueueState> {
  static defaultProps = { posts: [] };
  static contextType = Context;

  constructor(props: any) {
    super(props);
    this.state = {
      queue: [],
      value: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getData();
    setInterval(this.getData, 5000);
  }

  getData = async () => {
    this.setState({ loading: true });
    const r = (await request('get', '/api/extensions/queue', {
      id: this.props.router.query['id'],
    })) as {
      queue: QueueItem[];
    };
    this.setState({ queue: r.queue, loading: false });
  };

  render() {
    const waiting = this.state.queue.filter((item) => !item.finish);
    var columns: ColumnsType<QueueItem> = [
      {
        dataIndex: 'name',
        title: '乘客信息',
      },
      {
        title: '候机时间',
        dataIndex: 'time',
        sorter: (a, b) => a.time - b.time,
        render: (value) => (
          <Tooltip title={moment(value, 'X').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(value, 'X').fromNow()}</span>
          </Tooltip>
        ),
      },
      {
        title: '状态',
        dataIndex: 'finish',
        filters: [
          { text: '已降落', value: true },
          { text: '候机中', value: false },
        ],
        onFilter: (value, record) => value == record.finish,
        render: (value) =>
          value ? <Tag color="green">已降落</Tag> : <Tag color="red">未登机</Tag>,
      },
    ];

    if (this.context.token != '') {
      columns.push({
        title: '操作',
        key: 'op',
        render: (_, record) => {
          return (
            <Row gutter={10}>
              <Col>
                <Button
                  size="small"
                  onClick={async (e) => {
                    this.setState({ loading: true });
                    const r = (await request('get', '/api/extensions/queue/admin', {
                      _id: record._id,
                      id: record.id,
                      type: record.finish ? 'unfinish' : 'finish',
                    })) as Blotter.APIResponse;
                    ShowNotification(r);
                    this.getData();
                  }}
                >
                  修改状态
                </Button>
              </Col>
              <Col>
                <Popconfirm
                  title="确定删除？"
                  onConfirm={async (e) => {
                    this.setState({ loading: true });
                    const r = (await request('get', '/api/extensions/queue/admin', {
                      _id: record._id,
                      id: record.id,
                      type: 'delete',
                    })) as Blotter.APIResponse;
                    ShowNotification(r);
                    this.getData();
                  }}
                >
                  <Button size="small">删除记录</Button>
                </Popconfirm>
              </Col>
            </Row>
          );
        },
      });
    }
    return (
      <div>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`${this.props.router.query['id']}|动森候机室|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Container>
          <Card>
            <PageHeader title="动森候机室" subTitle={this.props.router.query['id']} />
            <Alert
              showIcon
              message="登岛规范"
              description={
                <span>
                  <Typography.Paragraph>
                    输入自己的群ID或者游戏ID点击我要我要候机加入排队
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    成功落地后请点击“我要降落”并在群里@下一名乘客（如果是要求单人上岛则在返程后@）
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    为了避免炸岛，联机游戏请尽可能使用流量开热点并开启加速器（部分加速器加速后更慢，请不要用）
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    如果富裕，请给岛民代表留下礼物。不要乱动岛民代表的东西。
                  </Typography.Paragraph>
                </span>
              }
              type="info"
            />
            <br />
            {waiting.length > 0 ? (
              <Alert
                showIcon
                message={
                  <span>
                    请 <Typography.Text strong>{waiting[0].name}</Typography.Text> 准备发射！ 共{' '}
                    <Typography.Text strong>{waiting.length}</Typography.Text> 名乘客在等待
                  </span>
                }
                type="info"
              />
            ) : (
              <Alert showIcon message={`所有乘客已登机落地`} type="success" />
            )}

            <Row justify="space-between" style={{ margin: 10 }}>
              <Col>
                <Input
                  placeholder="乘客信息"
                  value={this.state.value}
                  onChange={(e) => this.setState({ value: e.target.value })}
                />
              </Col>
              <Col>
                <Button
                  loading={this.state.loading}
                  onClick={async (e) => {
                    this.setState({ loading: true });
                    const r = (await request('get', '/api/extensions/queue/push', {
                      id: this.props.router.query['id'],
                      name: this.state.value,
                    })) as Blotter.APIResponse;
                    ShowNotification(r);
                    this.getData();
                  }}
                >
                  我要候机
                </Button>
              </Col>
              <Col>
                <Popconfirm
                  disabled={waiting.length == 0}
                  title={`确定你已降落，并且你就是当前候机乘客 ${
                    waiting.length && waiting[0].name
                  } ？`}
                  onConfirm={async (e) => {
                    this.setState({ loading: true });
                    const r = (await request('get', '/api/extensions/queue/pop', {
                      id: this.props.router.query['id'],
                    })) as Blotter.APIResponse;
                    ShowNotification(r);
                    this.getData();
                  }}
                >
                  <Button disabled={waiting.length == 0} loading={this.state.loading}>
                    我要降落
                  </Button>
                </Popconfirm>
              </Col>
            </Row>

            <Table<QueueItem>
              rowKey={(record) => record._id}
              loading={this.state.loading}
              dataSource={this.state.queue}
              columns={columns}
            />
          </Card>
        </Container>
      </div>
    );
  }
}

export default withRouter(Queue);
