import React, { ComponentProps } from 'react';

import Head from 'next/head';
import { NextPageContext } from 'next';

import {
  Avatar,
  Card,
  List,
  Table,
  Typography,
  Popover,
  Descriptions,
  Row,
  Col,
  Collapse,
  Button,
  Modal,
} from 'antd';
import {
  GithubOutlined,
  QqOutlined,
  MailOutlined,
  ZhihuOutlined,
  WechatOutlined,
  AlipayOutlined,
} from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { ColumnCount } from 'antd/lib/list';
import { ColumnsType } from 'antd/lib/table';

import Container from '@/components/container';
import If from '@/components/if';

import { Context } from '@/utils/global';
import { showQR } from '@/utils/payment';
import { JsxElement } from 'typescript';
import { githubUser, githubRepos, githubRepo, about } from '@/utils/api';
import { GithubRepo } from '@/types/github';
import Visiable from '@/components/visiable';
import moment from 'moment';

interface Education {
  name: string;
  major: string;
  time: string;
}
interface Award {
  name: string;
  level: string;
  count: number;
}

interface AboutPageProps extends ComponentProps<'base'> {
  qq: string;
  email: string;
  github: string;
  edu: Education[];
  zhihu: string;
  awards: Award[];
  quote: string;
  description: string;
  author: string;
}
interface AboutPageState {
  repos: GithubRepo[];
  loading: boolean;
}

function ToColumnCount(num: number): ColumnCount {
  const count: ColumnCount[] = [1, 2, 3, 4, 6, 8, 12, 24];
  for (var i = 0; i < count.length; i++) {
    if (count[i] >= num) return count[i];
  }
  return count[count.length - 1];
}

class AboutPage extends React.Component<AboutPageProps, AboutPageState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = { repos: [], loading: false };
  }

  static async getInitialProps() {
    var r = await about();
    return r as AboutPageProps;
  }

  async componentDidMount() {
    if (!!this.props.github) {
      this.setState({ loading: true });
      var repos = [];
      for (var i = 1; i <= 1; i++) {
        var r = await githubRepos(this.props.github, i);
        if (r.length == 0) break;
        repos = repos.concat(r);
      }
      this.setState({ repos, loading: false });
    }
  }
  render_pay = () => {
    return (
      <List
        dataSource={[
          { name: 'wechat', icon: <WechatOutlined /> },
          { name: 'alipay', icon: <AlipayOutlined /> },
        ]}
        grid={{ column: 2 }}
        style={{ textAlign: 'center' }}
        renderItem={(item, idx) => (
          <List.Item key={idx}>
            <Button
              size="large"
              shape="circle"
              icon={item.icon}
              onClick={() => showQR(item.name as 'wechat' | 'alipay')}
            />
          </List.Item>
        )}
      />
    );
  };
  render_social = () => {
    const socialMedia: {
      raw: string;
      name: string;
      link: string;
      icon: () => JSX.Element;
    }[] = [
      {
        raw: this.props.github,
        name: `Github: ${this.props.github}`,
        link: `https://github.com/${this.props.github}`,
        icon: () => <GithubOutlined />,
      },
      {
        raw: this.props.qq,
        name: `QQ: ${this.props.qq}`,
        link: `https://wpa.qq.com/msgrd?v=3&uin=${this.props.qq}&site=qq&menu=yes`,
        icon: () => <QqOutlined />,
      },
      {
        raw: this.props.email,
        name: `Email: ${this.props.email}`,
        link: `mailto:${this.props.email}`,
        icon: () => <MailOutlined />,
      },
      {
        raw: this.props.zhihu,
        name: `知乎`,
        link: `https://www.zhihu.com/people/${this.props.zhihu}`,
        icon: () => <ZhihuOutlined />,
      },
    ].filter(item => !!item.raw);

    return (
      <List
        grid={{ column: ToColumnCount(socialMedia.length), gutter: 10 }}
        dataSource={socialMedia}
        style={{ fontSize: '25px', textAlign: 'center' }}
        renderItem={item => (
          <List.Item key={item.name}>
            <a href={item.link} target="_blank">
              <Popover content={item.name}>
                <span className="text-color">{item.icon()}</span>
              </Popover>
            </a>
          </List.Item>
        )}
      />
    );
  };

  render_education = () => {
    const columns: ColumnsType<Education> = [
      {
        dataIndex: 'name',
        title: '名称',
        align: 'center',
      },
      {
        dataIndex: 'major',
        title: '方向',
        align: 'center',
        width: 250,
        ellipsis: true,
      },
      {
        dataIndex: 'time',
        title: '时间',
        align: 'center',
        width: 250,
        ellipsis: true,
      },
    ];
    return (
      <Table<Education>
        rowKey={record => record.name}
        dataSource={this.props.edu}
        columns={columns}
        pagination={false}
        scroll={{ x: true }}
      />
    );
  };

  render_awards = () => {
    const columns: ColumnsType<Award> = [
      {
        dataIndex: 'name',
        align: 'center',
      },
      {
        dataIndex: 'level',
        align: 'center',
        width: 250,
        ellipsis: true,
      },
      {
        dataIndex: 'count',
        render: value => `×${value}`,
        align: 'center',
        width: 250,
        ellipsis: true,
      },
    ];
    return (
      <Table<Award>
        dataSource={this.props.awards}
        rowKey={record => record.name}
        columns={columns}
        size="small"
        showHeader={false}
        pagination={false}
        scroll={{ x: true }}
      />
    );
  };

  render_projects = () => {
    if (!!!this.props.github) return null;
    const columns: ColumnsType<GithubRepo> = [
      {
        dataIndex: 'name',
        title: '项目名',
        ellipsis: true,
        align: 'center',
        render: (value, record) => (
          <a target="_blank" href={record.html_url}>
            {value}
          </a>
        ),
      },
      {
        dataIndex: 'stargazers_count',
        title: 'star数',
        align: 'center',
        width: 100,
        ellipsis: true,
        sorter: (a, b) => a.stargazers_count - b.stargazers_count,
      },
      {
        dataIndex: 'forks_count',
        title: 'fork数',
        align: 'center',
        width: 100,
        ellipsis: true,
        sorter: (a, b) => a.forks_count - b.forks_count,
      },
      {
        dataIndex: 'pushed_at',
        title: '最新更新',
        align: 'center',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime(),
        render(text) {
          return moment(text).format('YYYY-MM-DD hh:mm:ss');
        },
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'language',
        title: '语言',
        filters: Array.from(
          new Set(this.state.repos.map(item => item.language).filter(l => l !== null)),
        ).map(l => ({ text: l, value: l })),
        onFilter: (value, record) => record.language && record.language.includes(value),
        align: 'center',
        width: 150,
        ellipsis: true,
      },
    ];
    return (
      <Table<GithubRepo>
        rowKey={record => record.name}
        dataSource={this.state.repos}
        columns={columns}
        loading={this.state.loading}
        scroll={{ x: true }}
        expandable={{
          expandedRowRender: record => (
            <Descriptions bordered size="small">
              <Descriptions.Item key="created_at" label="创建时间">
                {record.created_at}
              </Descriptions.Item>
              <Descriptions.Item key="pushed_at" label="最近推送时间">
                {record.pushed_at}
              </Descriptions.Item>
              <Descriptions.Item key="updated_at" label="数据更新时间">
                {record.updated_at}
              </Descriptions.Item>
              <Descriptions.Item key="description" label="描述">
                {record.description}
              </Descriptions.Item>
            </Descriptions>
          ),
        }}
        pagination={{ pageSize: 10 }}
      />
    );
  };

  render() {
    return (
      <Container>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`关于我|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <Typography>
            <Typography.Paragraph style={{ textAlign: 'center' }}>
              <Avatar size={64} src="/static/img/logo.svg" />
              <br />
              <Typography.Text strong>{this.props.author}</Typography.Text>
            </Typography.Paragraph>

            <If condition={!!this.props.quote}>
              <Typography.Paragraph style={{ textAlign: 'center' }}>
                <em dangerouslySetInnerHTML={{ __html: this.props.quote }}></em>
              </Typography.Paragraph>
            </If>

            <If condition={!!this.props.description}>
              <Typography.Paragraph style={{ textAlign: 'center' }}>
                <div dangerouslySetInnerHTML={{ __html: this.props.description }}></div>
              </Typography.Paragraph>
            </If>

            <Typography.Paragraph>{this.render_pay()}</Typography.Paragraph>
            <Typography.Paragraph>{this.render_social()}</Typography.Paragraph>
            <Collapse defaultActiveKey={['education', 'awards', 'projects']}>
              <Collapse.Panel header="教育、工作经历" key="education">
                {this.render_education()}
              </Collapse.Panel>
              <Collapse.Panel header="抱大腿奖项" key="awards">
                {this.render_awards()}
              </Collapse.Panel>
              <Collapse.Panel
                header="开源项目（需要访问 Github API，部分网络可能会出错）"
                key="projects"
              >
                {this.render_projects()}
              </Collapse.Panel>
            </Collapse>
          </Typography>
        </Card>
      </Container>
    );
  }
}

export default AboutPage;
