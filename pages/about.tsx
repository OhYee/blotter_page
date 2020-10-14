import React, { ComponentProps } from 'react';

import Head from 'next/head';

import If from '@/components/if';
import Card from '@/components/card';
import Avatar from '@/components/avatar';
import { Tooltip } from '@/components/popover';
import Button from '@/components/button';
import { QQ, Github, Mail, Zhihu, Alipay, Wechat } from '@/components/svg';
import { Flex } from '@/components/container';
import Table, { Column } from '@/components/table';
import Collapse from '@/components/collapse';

import { Context } from '@/utils/global';
import { showQR } from '@/utils/payment';
import { githubUser, githubRepos, githubRepo, about } from '@/utils/api';
import { formatDate } from '@/utils/time';
import { GithubRepo } from '@/types/github';

import moment from '@/utils/moment';

import textStyles from '@/styles/text.module.scss';

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
      try {
        var repos = (await githubRepos(this.props.github)).repos;
      } catch {
        repos = [];
      }
      this.setState({ repos, loading: false });
    }
  }
  render_pay = () => {
    const socialMedia: {
      name: string;
      icon: React.ReactNode;
    }[] = [
      { name: 'wechat', icon: <Wechat /> },
      { name: 'alipay', icon: <Alipay /> },
    ];
    return (
      <Flex mainAxis="space-around">
        {socialMedia.map((item) => (
          <Button
            key={item.name}
            size="large"
            icon={item.icon}
            onClick={() => showQR(item.name as 'wechat' | 'alipay')}
          />
        ))}
      </Flex>
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
        icon: () => <Github />,
      },
      {
        raw: this.props.qq,
        name: `QQ: ${this.props.qq}`,
        link: `https://wpa.qq.com/msgrd?v=3&uin=${this.props.qq}&site=qq&menu=yes`,
        icon: () => <QQ />,
      },
      {
        raw: this.props.email,
        name: `Email: ${this.props.email}`,
        link: `mailto:${this.props.email}`,
        icon: () => <Mail />,
      },
      {
        raw: this.props.zhihu,
        name: `知乎`,
        link: `https://www.zhihu.com/people/${this.props.zhihu}`,
        icon: () => <Zhihu />,
      },
    ].filter((item) => !!item.raw);

    return (
      <Flex mainAxis="space-around">
        {socialMedia.map((item) => (
          <Tooltip
            key={item.name}
            title={item.name}
            style={{ fontSize: 25 }}
            className={textStyles.primary}
          >
            <a href={item.link} target="_blank">
              {item.icon()}
            </a>
          </Tooltip>
        ))}
      </Flex>
    );
  };

  render_education = () => {
    const columns: Column<Education>[] = [
      {
        key: 'name',
        title: '名称',
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        width: '50%',
        minWidth: 100,
      },
      {
        key: 'major',
        title: '方向',
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        width: '25%',
        minWidth: 50,
      },
      {
        key: 'time',
        title: '时间',
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        width: '25%',
        minWidth: 50,
      },
    ];
    return (
      <Table<Education>
        // rowKey={(record) => record.name}
        data={this.props.edu}
        columns={columns}
        // pagination={false}
        // scroll={{ x: true }}
      />
    );
  };

  render_awards = () => {
    const columns: Column<Award>[] = [
      {
        key: 'name',
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        width: '50%',
        minWidth: 100,
      },
      {
        key: 'level',
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        width: '25%',
        minWidth: 50,
      },
      {
        key: 'count',
        render: (value) => `×${value}`,
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        width: '25%',
        minWidth: 50,
      },
    ];
    return <Table<Award> data={this.props.awards} columns={columns} showHeader={false} />;
  };

  render_projects = () => {
    if (!!!this.props.github) return null;
    const columns: Column<GithubRepo>[] = [
      {
        key: 'name',
        title: '项目名',
        minWidth: 100,
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        render: (value, record) => (
          <a target="_blank" href={record.html_url}>
            {value}
          </a>
        ),
      },
      {
        key: 'stargazers_count',
        title: 'star数',
        minWidth: 100,
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        sorter: (a, b) => a.stargazers_count - b.stargazers_count,
      },
      {
        key: 'forks_count',
        title: 'fork数',
        minWidth: 100,
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        sorter: (a, b) => a.forks_count - b.forks_count,
      },
      {
        key: 'pushed_at',
        title: '最新更新',
        minWidth: 100,
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        sorter: (a, b) => new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime(),
        render(text) {
          return formatDate(text);
        },
      },
      {
        key: 'language',
        title: '语言',
        minWidth: 100,
        headStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
        filter: {
          filters: Array.from(
            new Set(this.state.repos.map((item) => item.language).filter((l) => l !== null)),
          ),
          onFilter: (value, item) => item.language && value.indexOf(item.language) != -1,
        },
        width: 150,
      },
    ];
    return (
      <Table<GithubRepo>
        data={this.state.repos}
        columns={columns}
        defaultOrder={{
          sortKey: 'pushed_at',
          ascending: false,
        }}
        pagination
        loading={this.state.loading}
        expand={(record) => (
          <dl>
            <dt>创建时间</dt>
            <dd> {record.created_at}</dd>
            <dt>最近推送时间</dt>
            <dd> {record.pushed_at}</dd>
            <dt>数据更新时间</dt>
            <dd> {record.updated_at}</dd>
            <dt>描述</dt>
            <dd> {record.description}</dd>
          </dl>
        )}
      />
    );
  };

  render() {
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`关于我|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>

        <Flex direction="TB" fullWidth style={{ textAlign: 'center' }}>
          <Context.Consumer>
            {(context) => <Avatar style={{ fontSize: 64, margin: 'auto' }} src={context.avatar} />}
          </Context.Consumer>

          <strong>{this.props.author}</strong>

          <If condition={!!this.props.quote}>
            <em dangerouslySetInnerHTML={{ __html: this.props.quote }}></em>
          </If>

          <If condition={!!this.props.description}>
            <div dangerouslySetInnerHTML={{ __html: this.props.description }}></div>
          </If>

          {this.render_pay()}
          {this.render_social()}

          <Flex.Item style={{ textAlign: 'initial' }}>
            <Collapse title="教育、工作经历" defaultOpen>
              {this.render_education()}
            </Collapse>
            <Collapse title="抱大腿奖项" defaultOpen>
              {this.render_awards()}
            </Collapse>
            <Collapse title="开源项目" defaultOpen>
              {this.render_projects()}
            </Collapse>
          </Flex.Item>
        </Flex>
      </Card>
    );
  }
}

export default AboutPage;
