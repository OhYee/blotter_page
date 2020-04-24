import React, { ComponentProps, Fragment } from 'react';
import Head from 'next/head';

import {
  Card,
  List,
  Button,
  PageHeader,
  Table,
  Tooltip,
  Switch,
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
} from 'antd';
import Link from 'next/link';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult, TableCurrentDataSource, ColumnsType } from 'antd/lib/table/interface';

import Container from '@/components/container';
import { Context, defaultContext } from '@/utils/global';

import { Queue, Member } from '@/extensions/queue/types';
import { get, finish, update, insert } from '@/extensions/queue/api';

import moment from 'moment';
import { FormInstance } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import ShowNotification from '@/utils/notification';
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
}

class QueueDetail extends React.Component<QueueDetailProps, QueueDetailState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

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
    };
  }

  static async getInitialProps(args: NextPageContext) {
    const r = await get(args.query.id as string);
    return { queue: r.queue } as QueueDetailProps;
  }

  componentDidMount() {
    this.getData();
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
        children: <TextArea />,
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
      })
      .finally(() => this.setState({ opLoading: false }));
  };
  land = () => {
    this.setState({ opLoading: true });

    this.setState({ opLoading: false });
  };
  back = () => {
    this.setState({ opLoading: true });

    this.setState({ opLoading: false });
  };
  cancel = () => {
    this.setState({ opLoading: true });

    this.setState({ opLoading: false });
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
          输入自己的 群ID 或者 游戏ID 点击 "我要候机" 加入排队
        </Typography.Paragraph>
        <Typography.Paragraph>
          成功落地后请点击 "我要降落" 并在群里@下一名乘客（如果是要求单人上岛则在返程后@）
        </Typography.Paragraph>
        <Typography.Paragraph>
          多趟买卖大头菜，请多次排队，以提升效率（买完直接减号键回家，单人上岛，效率更高）
        </Typography.Paragraph>
        <Typography.Paragraph>
          数据会每20秒自动刷新（也可以自己手动
          "刷新数据"），默认只显示候机乘客，可以自行修改筛选条件，
          <a
            target="_blank"
            href="https://www.oyohyee.com/post/writting_animal_crossing#waiting-area"
          >
            使用帮助
          </a>
        </Typography.Paragraph>
        <Typography.Paragraph>
          为了避免炸岛，联机游戏请尽可能使用流量开热点并开启
          <a href="https://lingti.paiyou.co/signup?c=ir9bam" target="_blank">
            加速器
          </a>
          （部分加速器加速后更慢，请不要用）
        </Typography.Paragraph>
        <Typography.Paragraph>
          如果富裕，请给岛民代表留下礼物。不要乱动岛民代表的东西。
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
            <Link href="/user/[username]" as={`/user/${this.state.queue.leader.username}`}>
              <a target="_blank">{this.state.queue.leader.ac_name}</a>
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="最大同时上岛人数限制">{this.state.queue.max}</Descriptions.Item>
          <Descriptions.Item label="描述信息">{this.state.queue.description}</Descriptions.Item>
        </Descriptions>
        <If condition={this.context.user.id == this.props.queue.leader.id}>
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
    const columns: ColumnsType<Member> = [
      {
        title: '玩家信息',
        key: 'username',
        width: 200,
        render: (_, record) => (
          <Link href="/user/[username]" as={`/user/${record.user.username}`}>
            <a target="_blank">
              {record.user.ac_island}岛 - {record.user.ac_name}
            </a>
          </Link>
        ),
      },
      {
        title: '开始时间',
        key: 'create_time',
        width: 100,
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
        width: 100,
        filters: [
          { text: '排队中', value: 0 },
          { text: '已上岛', value: 1 },
          { text: '已返回', value: 2 },
          { text: '已取消', value: 3 },
        ],
        defaultFilteredValue: ['0', '1'],
        onFilter: (value, record) => value === record.status,
        render: (_, record) => {
          switch (record.status) {
            case 0:
              return <Tag color="gold">排队中</Tag>;
            case 1:
              return <Tag color="green">已上岛</Tag>;
            case 2:
              return <Tag color="red">已返回</Tag>;
            case 3:
              return <Tag>已取消</Tag>;
          }
          return <Tag>未知状态</Tag>;
        },
      },
    ];
    const doingQueue = this.state.queue.queue.filter((item) => item.out_time == 0);
    var status = 2;
    for (var i = 0; i < doingQueue.length; i++) {
      if (doingQueue[i].user.id === this.context.user.id) {
        status = doingQueue[i].status;
        break;
      }
    }

    return (
      <Space direction="vertical" style={{ width: '100%' }} size={20}>
        {doingQueue.length > 0 ? (
          <Alert
            showIcon
            message={
              <span>
                请{' '}
                <Typography.Text strong>
                  {doingQueue[0].user.ac_island}岛的{doingQueue[0].user.ac_name}
                </Typography.Text>{' '}
                准备发射！已服务{' '}
                <Typography.Text strong>
                  {this.state.queue.queue.length - doingQueue.length}
                </Typography.Text>{' '}
                名乘客，还有 <Typography.Text strong>{doingQueue.length}</Typography.Text>{' '}
                名乘客在等待
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

        <Row justify="center">
          <Col>
            <Statistic.Countdown
              title="下次自动刷新倒计时"
              value={this.state.refresh}
              onFinish={this.getData}
              format="HH:mm:ss:SSS"
            />
          </Col>
        </Row>

        <Row justify="center" gutter={20}>
          <Col>
            <Button disabled={!(status >= 2)} loading={this.state.opLoading} onClick={this.insert}>
              我要排队
            </Button>
          </Col>
          <Col>
            <Button disabled={!(status == 0)} loading={this.state.opLoading} onClick={this.land}>
              我已降落
            </Button>
          </Col>
          <Col>
            <Button disabled={!(status == 1)} loading={this.state.opLoading} onClick={this.back}>
              我已返航
            </Button>
          </Col>
          <Col>
            <Button disabled={!(status <= 1)} loading={this.state.opLoading} onClick={this.cancel}>
              取消排队
            </Button>
          </Col>
          <Col>
            <Button loading={this.state.loading} onClick={this.getData}>
              刷新数据
            </Button>
          </Col>
        </Row>
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
      </Container>
    );
  }
}

export default withRouter(QueueDetail);
