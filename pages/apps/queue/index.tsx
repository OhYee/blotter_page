import React, { ComponentProps, Fragment } from 'react';
import Head from 'next/head';

import {
  Card,
  Button,
  PageHeader,
  Table,
  Tooltip,
  Switch,
  Row,
  Col,
  Statistic,
  Form,
  Input,
  InputNumber,
  Typography,
} from 'antd';
import Link from 'next/link';
import { PaginationConfig } from 'antd/lib/pagination';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table/interface';
import { UserOutlined, SolutionOutlined, CheckOutlined } from '@ant-design/icons';

import { Space, TextCenter } from '@/components/container';
import Steps from '@/components/steps';
import { Context } from '@/utils/global';
import { LoginModal } from '@/components/login';

import { Queue } from '@/extensions/queue/types';
import { getAll, create } from '@/extensions/queue/api';

import moment from '@/utils/moment';
import { FormInstance } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import ShowNotification from '@/utils/notification';

interface QueuesProps extends ComponentProps<'base'> {}

interface QueuesState {
  loading: boolean;
  total: number;
  queues: Queue[];
  all: boolean;
  page: number;
  size: number;
  loginModal: boolean;
}

class Queues extends React.Component<QueuesProps, QueuesState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  static defaultProps: QueuesProps = {};
  formRef = React.createRef<FormInstance>();

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      total: 0,
      queues: [],
      all: false,
      page: 1,
      size: 10,
      loginModal: false,
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    const r = await getAll(this.state.all, 1, 10);
    this.setState({ total: r.total, queues: r.queues });
  };

  onPageChange = (pagination: TablePaginationConfig) => {
    var { current, pageSize } = pagination;
    if (typeof current === 'undefined') current = this.state.page;
    if (typeof pageSize === 'undefined') pageSize = this.state.size;
    this.setState({ page: current, size: pageSize }, this.getData);
  };

  onSubmit = async () => {
    this.setState({ loading: true });
    const { max, password, description } = this.formRef.current.getFieldsValue(true);
    const r = await create(max, password, description);
    if (ShowNotification(r)) {
      this.getData();
    }
    this.setState({ loading: false });
  };

  renderHeader = () => {
    return (
      <PageHeader title="动森候机大厅" subTitle="优秀的上岛排队工具">
        <Typography.Paragraph strong>
          建立候机队伍请严格遵守法律法规！所有违规内容将被提交至相关部门。同时如果您发现有违规内容被发布，也请通过邮箱、
          QQ 等方式联系我
        </Typography.Paragraph>
        <Typography.Paragraph>
          要创建建立自己的候机厅供他人登岛，请先注册账号，并完善您的 Nintendo Switch{' '}
          以及动物森友会部分设置
        </Typography.Paragraph>
        <Typography.Paragraph>
          如果想要获得 QQ 提醒、<Typography.Text delete>微信提醒</Typography.Text>、
          <Typography.Text delete>邮箱提醒</Typography.Text>，请绑定相关账号。 其中 QQ
          一键登录仅用于快速登录，仍然需要输入您的 QQ 号
        </Typography.Paragraph>
      </PageHeader>
    );
  };

  renderForm = () => {
    const forms = [
      {
        key: 'max',
        name: '同时登岛人数',
        children: <InputNumber max={7} min={1} placeholder="不包括自己" />,
        initial: 1,
      },
      {
        key: 'password',
        name: '登岛密码',
        children: <Input placeholder="登岛密码(无密码留空)" />,
        initial: '',
      },
      {
        key: 'description',
        name: '描述',
        children: <TextArea />,
        initial: '本岛大头菜 xx 元（非时间旅行），请秩序上岛，不收手续费',
      },
    ];
    const initialValues = Object.assign({}, ...forms.map((item) => ({ [item.key]: item.initial })));

    var status = 2;
    var help: string = '';
    if (!this.context.user.existed) {
      status = 0;
      help = '请先登录';
    } else if (
      this.context.user.qq_connected == false ||
      this.context.user.ns_id == '' ||
      this.context.user.ns_name == '' ||
      this.context.user.ac_name == '' ||
      this.context.user.ac_island == ''
    ) {
      status = 1;
      help = '请完善您的QQ号、NS账号、动森账号，并绑定 QQ 互联';
    }
    return (
      <Space size={50}>
        <Steps current={status}>
          <Steps.Step title="注册并登录" icon={<UserOutlined />}>
            <TextCenter>
              <Button type="primary" onClick={() => this.setState({ loginModal: true })}>
                注册/登录
              </Button>
            </TextCenter>
          </Steps.Step>
          <Steps.Step title="完善信息" icon={<SolutionOutlined />}>
            <Space textCenter>
              <Link href="/user/[username]" as={`/user/${this.context.user.username}`}>
                <a target="_blank">
                  <Button type="primary">完善个人信息</Button>
                </a>
              </Link>
              <p>填写完成后，你需要刷新当前页面</p>
            </Space>
          </Steps.Step>
          <Steps.Step title="开始使用" icon={<CheckOutlined />}>
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
              <Form.Item
                key="submit"
                style={{ textAlign: 'right' }}
                validateStatus={help == '' ? 'success' : 'error'}
                help={help}
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
              >
                <Button
                  disabled={help != ''}
                  type="primary"
                  onClick={this.onSubmit}
                  loading={this.state.loading}
                >
                  打开机场大门
                </Button>
              </Form.Item>
            </Form>
          </Steps.Step>
        </Steps>
      </Space>
    );
  };

  renderTable = () => {
    const columns: ColumnsType<Queue> = [
      {
        title: '岛主信息',
        key: 'username',
        width: 200,
        ellipsis: true,
        render: (_, record) => (
          <Link href="/apps/queue/[id]" as={`/apps/queue/${record.id}`}>
            <a target="_blank">
              {record.leader.ac_island}岛 - {record.leader.ac_name}
            </a>
          </Link>
        ),
      },
      {
        title: '描述',
        key: 'description',
        dataIndex: 'description',
        // width: 300,
        // ellipsis: true,
        render: (value) => (
          <Typography.Text ellipsis={true} style={{ width: 300 }}>
            {value}
          </Typography.Text>
        ),
      },
      {
        title: '同时人数',
        key: 'max',
        dataIndex: 'max',
        width: 150,
        ellipsis: true,
      },
      {
        title: '排队人数',
        key: 'queue',
        width: 150,
        ellipsis: true,
        render: (_, record) => (
          <Statistic
            value={record.queue.filter((item) => item.out_time == 0).length}
            suffix={`/${record.queue.length}`}
          />
        ),
      },
      {
        title: '开始时间',
        key: 'create_time',
        width: 150,
        ellipsis: true,
        render: (_, record) => {
          const time = moment(record.create_time, 'X');
          return (
            <Tooltip title={time.format('YYYY-MM-DD HH:mm:ss')}>
              <span>{time.fromNow()}</span>
            </Tooltip>
          );
        },
      },
      {
        title: '状态',
        key: 'finish_time',
        width: 150,
        ellipsis: true,
        render: (_, record) => {
          const time = moment(record.create_time, 'X');
          return record.finish_time == 0 ? (
            '进行中'
          ) : (
            <Tooltip title={time.format('YYYY-MM-DD HH:mm:ss')}>
              <span>{time.fromNow()}</span>
            </Tooltip>
          );
        },
      },
    ];

    return (
      <Space size={20}>
        <Row justify="end" gutter={[20, 20]}>
          <Col>
            <Button onClick={this.getData}>刷新数据</Button>
          </Col>
          <Col>
            <Switch
              checkedChildren="显示所有"
              unCheckedChildren="显示进行中"
              checked={this.state.all}
              onChange={(all) => this.setState({ all }, this.getData)}
            />
          </Col>
        </Row>
        <Table<Queue>
          rowKey={(record) => record.id}
          dataSource={this.state.queues}
          scroll={{ x: 'auto' }}
          onChange={this.onPageChange}
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
      <div>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`动森候机大厅|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Space>
          <Card>{this.renderHeader()}</Card>
          <Card>{this.renderForm()}</Card>
          <Card>{this.renderTable()}</Card>
        </Space>
        <LoginModal
          show={this.state.loginModal}
          onClose={() => this.setState({ loginModal: false })}
        />
      </div>
    );
  }
}

export default Queues;
