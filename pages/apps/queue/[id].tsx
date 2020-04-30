import React, { ComponentProps, Fragment } from 'react';
import Head from 'next/head';

import {
  Card,
  Button,
  PageHeader,
  Table,
  Tooltip,
  Row,
  Col,
  Statistic,
  Space,
  Form,
  Input,
  InputNumber,
  Typography,
  Tag,
  Descriptions,
  Modal,
  Popconfirm,
  Alert,
  Popover,
} from 'antd';
import Link from 'next/link';
import { PaginationConfig } from 'antd/lib/pagination';
import { ColumnsType } from 'antd/lib/table/interface';
import {
  UserOutlined,
  SolutionOutlined,
  CheckOutlined,
  TeamOutlined,
  GlobalOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';

import Container from '@/components/container';
import { Context, defaultContext } from '@/utils/global';
import Steps from '@/components/steps';
import { LoginModal } from '@/components/login';

import { Queue, Member } from '@/extensions/queue/types';
import { get, finish, update, insert, land, out } from '@/extensions/queue/api';

import moment from 'moment';
import { FormInstance } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import ShowNotification, { H5Notification } from '@/utils/notification';
import { NextPageContext } from 'next';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import If from '@/components/if';

interface QueueDetailProps extends ComponentProps<'base'>, WithRouterProps {
  queue: Queue;
}

interface QueueDetailState {
  loading: boolean;
  formLoading: boolean;
  opLoading: boolean;
  queue: Queue;
  total: number;
  all: boolean;
  page: number;
  size: number;
  refresh: number;
  loginModal: boolean;
}

class QueueDetail extends React.Component<QueueDetailProps, QueueDetailState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  ws: WebSocket;
  formRef = React.createRef<FormInstance>();

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      formLoading: false,
      total: 0,
      queue: {
        id: '',
        leader: defaultContext.user,
        password: '',
        description: '',
        max: 0,
        create_time: 0,
        finish_time: 0,
        queue: [],
      },
      all: false,
      page: 1,
      size: 10,
      opLoading: false,
      refresh: 0,
      loginModal: false,
    };
  }

  static async getInitialProps(args: NextPageContext) {
    const r = await get(args.query.id as string);
    return { queue: r.queue } as QueueDetailProps;
  }

  componentDidMount() {
    this.getData();
    this.ws = new WebSocket(
      `${window.location.origin.replace('http', 'ws')}/api/notification/ws?name=queue`,
    );
    this.ws.onmessage = (msg) => {
      const obj = JSON.parse(msg.data);
      console.log(obj);
      if (typeof obj.data === 'object' && typeof obj.data.message === 'string') {
        H5Notification(obj.data.message);
        ShowNotification({ success: true, title: '排队通知', content: obj.data.message });
        this.getData();
      }
    };
    window.addEventListener('beforeunload', this.componentWillMount);
  }
  componentWillUnmount() {
    if (!!this.ws) this.ws.close();
  }

  getData = () => {
    this.setState({ loading: true });
    get(this.props.router.query.id as string)
      .then((r) => this.setState({ queue: r.queue }))
      .finally(() => this.setState({ loading: false, refresh: moment.now() + 30 * 1000 }));
  };

  update = () => {
    const forms = [
      {
        key: 'max',
        name: '同时登岛人数',
        children: <InputNumber max={7} min={1} placeholder="不包括自己" />,
        initial: this.state.queue.max,
      },
      {
        key: 'password',
        name: '登岛密码',
        children: <Input placeholder="登岛密码(无密码留空)" />,
        initial: this.state.queue.password,
      },
      {
        key: 'description',
        name: '描述',
        children: <TextArea autoSize={{ minRows: 5 }} />,
        initial: this.state.queue.description,
      },
    ];
    const initialValues = Object.assign({}, ...forms.map((item) => ({ [item.key]: item.initial })));
    Modal.confirm({
      title: '编辑信息',
      okText: '修改信息',
      cancelText: '取消修改',
      content: (
        <Form
          ref={this.formRef}
          initialValues={initialValues}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          {forms.map((item) => (
            <Form.Item key={item.key} name={item.key} label={item.name}>
              {item.children}
            </Form.Item>
          ))}
        </Form>
      ),
      okButtonProps: { loading: this.state.formLoading },
      onOk: async () => {
        this.setState({ formLoading: true });
        const { max, password, description } = this.formRef.current.getFieldsValue(true);
        const r = await update(this.props.queue.id, max, password, description);
        this.setState({ formLoading: false });
        if (ShowNotification(r)) {
          this.getData();
        } else {
          return Promise.reject();
        }
      },
    });
  };

  insert = () => {
    this.setState({ opLoading: true });
    insert(this.props.queue.id)
      .then((r) => {
        ShowNotification(r);
        this.getData();
        H5Notification('入队成功，请密切关注队伍更新状态');
      })
      .finally(() => this.setState({ opLoading: false }));
  };
  land = (memberID: string) => {
    this.setState({ opLoading: true });
    land(this.props.queue.id, memberID)
      .then((r) => {
        ShowNotification(r);
        this.getData();
      })
      .finally(() => this.setState({ opLoading: false }));
  };
  out = (memberID: string) => {
    this.setState({ opLoading: true });
    out(this.props.queue.id, memberID)
      .then((r) => {
        ShowNotification(r);
        this.getData();
      })
      .finally(() => this.setState({ opLoading: false }));
  };

  onPageChange = (pagination: PaginationConfig) => {
    var { current, pageSize } = pagination;
    if (typeof current === 'undefined') current = this.state.page;
    if (typeof pageSize === 'undefined') pageSize = this.state.size;
    this.setState({ page: current, size: pageSize }, this.getData);
  };

  renderHeader = () => {
    return (
      <PageHeader
        title="动森候机大厅"
        subTitle={`前往 ${this.props.queue.leader.ac_island}岛(${this.props.queue.leader.ac_name})`}
      >
        <Typography.Paragraph>
          使用该系统需要注册账号，并填写 Nintendo 账号名、ID，动森名称、岛名，QQ 号以及绑定 QQ
          一键登录
        </Typography.Paragraph>
        <Typography.Paragraph>
          QQ 号将于用于 QQ 机器人提醒（需要和 QQ
          机器人为好友关系，或在同一个群内，可加群：797585867）
        </Typography.Paragraph>
        <Typography.Paragraph>
          多趟买卖大头菜，请多次排队，以提升效率（买完直接减号键回家，单人上岛，效率更高）
        </Typography.Paragraph>
        <Typography.Paragraph>
          当轮到你登机起飞时，请尽快起飞。落地、回家后请及时按下相关按钮。如果多次在状态更新后未按下按钮修改状态，将会被系统拉黑，无法使用该系统。
        </Typography.Paragraph>
        <Typography.Paragraph>
          为了避免炸岛，联机游戏请尽可能使用流量开热点并开启
          <a href="https://lingti.paiyou.co/signup?c=ir9bam" target="_blank">
            加速器
          </a>
          （部分加速器加速后更慢，请不要用）
        </Typography.Paragraph>
        <Typography.Paragraph>
          如果富裕，请给岛民代表留下礼物。不要乱动岛民代表的东西，请严格遵守岛民代表的要求
        </Typography.Paragraph>
      </PageHeader>
    );
  };
  renderInfo = () => {
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Descriptions title="候机厅信息" bordered>
          <Descriptions.Item label="岛屿名称">
            {this.state.queue.leader.ac_island}岛
          </Descriptions.Item>
          <Descriptions.Item label="岛民代表">
            <Popover
              title="个人信息"
              content={
                <Descriptions size="small" column={2} bordered>
                  <Descriptions.Item label="岛屿名称">
                    {this.state.queue.leader.ac_island}岛
                  </Descriptions.Item>
                  <Descriptions.Item label="岛民代表">
                    {this.state.queue.leader.ac_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nintendo Switch ID">
                    SW-{this.state.queue.leader.ns_id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nintendo Switch 用户名">
                    {this.state.queue.leader.ns_name}
                  </Descriptions.Item>
                </Descriptions>
              }
            >
              <span>
                <Link href="/user/[username]" as={`/user/${this.state.queue.leader.username}`}>
                  <a target="_blank">{this.state.queue.leader.ac_name}</a>
                </Link>
              </span>
            </Popover>
          </Descriptions.Item>
          <Descriptions.Item label="最大同时上岛人数限制">{this.state.queue.max}</Descriptions.Item>
          <Descriptions.Item label="描述信息" style={{ whiteSpace: 'pre' }}>
            {this.state.queue.description}
          </Descriptions.Item>
        </Descriptions>
        <If
          condition={
            this.context.user.id == this.props.queue.leader.id ||
            (this.context.user.permission & 1) === 1
          }
        >
          <Row justify="center" gutter={[10, 10]}>
            <Col>
              <Button onClick={this.update}>编辑信息</Button>
            </Col>
            <Col>
              <Popconfirm
                title="确定要关闭机场？关闭机场后该队伍不在会产生变动，且除联系管理员外，无法恢复。"
                onConfirm={async () => {
                  const r = await finish(this.props.router.query.id as string);
                  ShowNotification(r);
                }}
                okText="关闭！"
                cancelText="算了"
              >
                <Button type="danger">关闭机场</Button>
              </Popconfirm>
            </Col>
          </Row>
        </If>
      </Space>
    );
  };

  renderTable = () => {
    type Keys = 'in_time' | 'land_time' | 'out_time';
    const keys: { key: Keys; name: string; color: string; time: string }[] = [
      { key: 'in_time', name: '排队中', color: 'gold', time: '入队时间' },
      { key: 'land_time', name: '已着陆', color: 'green', time: '着陆时间' },
      { key: 'out_time', name: '已出队', color: 'red', time: '返回时间' },
    ];
    var columns: ColumnsType<Member> = [
      {
        title: '玩家信息',
        key: 'username',
        width: 200,
        ellipsis: true,
        render: (_, record) => (
          <Link href="/user/[username]" as={`/user/${record.user.username}`}>
            <a target="_blank">
              {record.user.ac_island}岛 - {record.user.ac_name}
            </a>
          </Link>
        ),
      },
      {
        title: '入队时间',
        key: 'in_time',
        sorter: (a, b) => a.in_time - b.in_time,
        defaultSortOrder: 'ascend',
        width: 200,
        ellipsis: true,
        render: (_, record) => {
          const time = moment(record.in_time, 'X');
          return (
            <Tooltip title={time.format('YYYY-MM-DD HH:mm:ss')}>
              <span>{time.fromNow()}</span>
            </Tooltip>
          );
        },
      },
      {
        title: '状态',
        key: 'status',
        width: 200,
        ellipsis: true,
        filters: keys.map((item) => ({ text: item.name, value: item.key })),
        defaultFilteredValue: ['in_time', 'land_time'],
        onFilter: (value: Keys, record) => {
          switch (value) {
            case 'in_time':
              return record.in_time != 0 && record.land_time == 0 && record.out_time == 0;
            case 'land_time':
              return record.in_time != 0 && record.land_time != 0 && record.out_time == 0;
            case 'out_time':
              return record.out_time != 0;
            default:
              return false;
          }
        },
        render: (_, record) => {
          var res = <Tag>未知状态</Tag>;
          for (var i = 0; i < keys.length; i++) {
            if (record[keys[i].key] !== 0) {
              res = <Tag color={keys[i].color}>{keys[i].name}</Tag>;
            }
          }
          return res;
        },
      },
    ];
    if (
      (this.context.user.permission & 1) === 1 ||
      this.context.user.id === this.props.queue.leader.id
    ) {
      columns.push({
        title: '操作',
        key: 'op',
        ellipsis: true,
        render: (_, record) => {
          return (
            <Popconfirm title="确认强制出队？" onConfirm={() => this.out(record.id)}>
              <Button type="danger">强制出队</Button>
            </Popconfirm>
          );
        },
      });
    }

    const doingQueue = this.state.queue.queue.filter((item) => item.out_time === 0);
    const waitingQueue = this.state.queue.queue.filter(
      (item) => item.out_time === 0 && item.land_time === 0,
    );

    var memberID = '';
    var status = 2;

    if (!this.context.user.existed) {
      status = 0;
    } else if (
      this.context.user.qq_connected == false ||
      this.context.user.ns_id == '' ||
      this.context.user.ns_name == '' ||
      this.context.user.ac_name == '' ||
      this.context.user.ac_island == ''
    ) {
      status = 1;
    } else {
      for (var i = 0; i < doingQueue.length; i++) {
        if (doingQueue[i].user.id === this.context.user.id) {
          memberID = doingQueue[i].id;
          for (var j = 0; j < keys.length; j++) {
            if (doingQueue[i][keys[j].key] === 0) {
              status = 2 + j;
              break;
            }
          }
          break;
        }
      }
    }

    return (
      <Space direction="vertical" style={{ width: '100%' }} size={20}>
        {waitingQueue.length > 0 ? (
          <Alert
            showIcon
            message={
              <span>
                请{' '}
                <Typography.Text strong>
                  {waitingQueue[0].user.ac_island}岛的{waitingQueue[0].user.ac_name}
                </Typography.Text>{' '}
                准备发射！已服务{' '}
                <Typography.Text strong>
                  {this.state.queue.queue.length - waitingQueue.length}
                </Typography.Text>{' '}
                名乘客，还有 <Typography.Text strong>{waitingQueue.length}</Typography.Text>{' '}
                名乘客在等待
              </span>
            }
            type="info"
          />
        ) : doingQueue.length > 0 ? (
          <Alert
            showIcon
            message={
              <span>
                <Typography.Text strong>
                  {doingQueue[0].user.ac_island}岛的{doingQueue[0].user.ac_name}
                </Typography.Text>{' '}
                正在操作！已服务{' '}
                <Typography.Text strong>{this.state.queue.queue.length}</Typography.Text> 名乘客
              </span>
            }
            type="info"
          />
        ) : (
          <Alert
            showIcon
            message={`所有乘客已登机落地,共服务乘客 ${this.state.queue.queue.length} 名`}
            type="success"
          />
        )}

        <If
          condition={
            this.state.queue.password != '' &&
            waitingQueue.length > 0 &&
            waitingQueue[0].user.id == this.context.user.id
          }
        >
          <Alert
            showIcon
            message={
              <span>
                上岛密码：
                <Typography.Text strong>{this.state.queue.password.toUpperCase()}</Typography.Text>
                ，请尽快上岛！
              </span>
            }
            type="success"
          />
        </If>

        <Row justify="center">
          <Col>
            <Space direction="vertical" size={10} style={{ textAlign: 'center' }}>
              <Statistic.Countdown
                title="下次自动刷新倒计时"
                value={this.state.refresh}
                onFinish={this.getData}
                format="HH:mm:ss:SSS"
              />
              <Button loading={this.state.loading} onClick={this.getData}>
                刷新数据
              </Button>
            </Space>
          </Col>
        </Row>

        <Steps current={status} size="small">
          <Steps.Step title="注册并登录" icon={<UserOutlined />}>
            <Row justify="center">
              <Col>
                <Button type="primary" onClick={() => this.setState({ loginModal: true })}>
                  注册/登录
                </Button>
              </Col>
            </Row>
          </Steps.Step>
          <Steps.Step title="完善信息" icon={<SolutionOutlined />}>
            <Row justify="center">
              <Col>
                <Space direction="vertical" size={10} style={{ textAlign: 'center' }}>
                  <Link href="/user/[username]" as={`/user/${this.context.user.username}`}>
                    <a target="_blank">
                      <Button type="primary">完善个人信息</Button>
                    </a>
                  </Link>
                  <p>填写完成后，你需要刷新当前页面</p>
                </Space>
              </Col>
            </Row>
          </Steps.Step>
          <Steps.Step title="未排队" icon={<CoffeeOutlined />}>
            <Row justify="center" gutter={[20, 20]}>
              <Col>
                <Button loading={this.state.opLoading} onClick={this.insert}>
                  我要排队
                </Button>
              </Col>
            </Row>
          </Steps.Step>
          <Steps.Step title="正在排队" icon={<TeamOutlined />}>
            <Row justify="center" gutter={[20, 20]}>
              <Col>
                <Button loading={this.state.opLoading} onClick={() => this.land(memberID)}>
                  我已降落
                </Button>
              </Col>
              <Col>
                <Button loading={this.state.opLoading} onClick={() => this.out(memberID)}>
                  取消排队
                </Button>
              </Col>
            </Row>
          </Steps.Step>
          <Steps.Step title="已着陆" icon={<GlobalOutlined />}>
            <Row justify="center" gutter={[20, 20]}>
              <Col>
                <Button loading={this.state.opLoading} onClick={() => this.out(memberID)}>
                  我已返航
                </Button>
              </Col>
            </Row>
          </Steps.Step>
          <Steps.Step title="已返航" icon={<CheckOutlined />}></Steps.Step>
        </Steps>

        <Table<Member>
          rowKey={(record) => record.id}
          dataSource={this.state.queue.queue}
          scroll={{ x: 'auto' }}
          onChange={this.onPageChange}
          loading={this.state.loading}
          pagination={{
            current: this.state.page,
            total: this.state.total,
            pageSize: this.state.size,
            showSizeChanger: true,
          }}
          columns={columns}
          expandable={{
            expandedRowRender: (record: Member) => (
              <Descriptions bordered>
                {keys.map((item) => {
                  const time = moment(record[item.key], 'X');

                  return (
                    <Descriptions.Item key={item.name} label={item.time}>
                      {record[item.key] == 0 ? (
                        '未到达该状态'
                      ) : (
                        <Tooltip title={time.fromNow()}>
                          <span>{time.format('YYYY-MM-DD HH:mm:ss')}</span>
                        </Tooltip>
                      )}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            ),
          }}
        />
      </Space>
    );
  };

  render() {
    return (
      <Container>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`前往${this.props.queue.leader.ac_island}岛(${this.props.queue.leader.ac_name})|动森候机大厅|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card>{this.renderHeader()}</Card>
          <Card>{this.renderInfo()}</Card>
          <Card>{this.renderTable()}</Card>
        </Space>
        <LoginModal
          show={this.state.loginModal}
          onCancel={() => this.setState({ loginModal: false })}
          callback={(success) => {
            if (success) this.setState({ loginModal: false });
          }}
        />
      </Container>
    );
  }
}

export default withRouter(QueueDetail);
