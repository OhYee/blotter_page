import React, { ComponentProps } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { Card, Typography, Avatar, List, Row, Col, Button, Input, Space } from 'antd';

import Container from '@/components/container';

import { Context, defaultContext } from '@/utils/global';
import { info, userSet, avatar } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import If from '@/components/if';
import { NextPageContext } from 'next';

interface UserProps extends ComponentProps<'base'>, WithRouterProps {
  user: Blotter.User;
}

interface UserState {
  user: Blotter.User;
  loading: boolean;
  loadingAvatar: boolean;
  password: string;
}

class User extends React.Component<UserProps, UserState> {
  static defaultProps = {};
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  constructor(props: UserProps) {
    super(props);
    this.state = {
      user: this.props.user,
      loading: false,
      loadingAvatar: false,
      password: '',
    };
  }

  static async getInitialProps(args: NextPageContext) {
    const user = await info(args.query.username as string);
    return { user };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const user = await info(this.props.router.query.username as string);
    this.setState({ user });
  };

  onChange = (key: TypeUInT<Blotter.User, string>, value: string) => {
    this.setState((state) => {
      var { user } = state;
      user[key] = value;
      return { user };
    });
  };

  update = async () => {
    this.setState({ loading: true });

    const { username, email, ns_id, ns_name, ac_name, ac_island, qq, avatar } = this.state.user;
    const r = await userSet(
      username,
      email,
      avatar,
      ns_id,
      ns_name,
      ac_name,
      ac_island,
      qq,
      this.state.password,
    );
    if (ShowNotification(r)) {
      this.props.router.push('/user/[username]', `/user/${username}`);
      this.context.callback({ user: this.state.user });
    }

    this.setState({ loading: false });
  };

  render() {
    const allFields: { key: TypeUInT<Blotter.User, string>; name: string; self: boolean }[] = [
      { key: 'avatar', name: '头像', self: true },
      { key: 'username', name: '用户名', self: false },
      { key: 'email', name: '邮箱', self: false },
      { key: 'qq', name: 'QQ 号', self: true },
      { key: 'ns_id', name: 'NS ID', self: false },
      { key: 'ns_name', name: 'NS 名称', self: false },
      { key: 'ac_name', name: '动森名称', self: false },
      { key: 'ac_island', name: '动森岛名', self: false },
    ];
    const fields = this.state.user.self ? allFields : allFields.filter((item) => !item.self);

    return (
      <Container>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`${this.props.router.query.username}|用户页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <p style={{ textAlign: 'center' }}>
            <Avatar size={128} src={this.state.user.avatar} />
          </p>
          <If condition={this.state.user.self}>
            <Row justify="center" gutter={20}>
              <Col>
                <Button
                  loading={this.state.loadingAvatar}
                  onClick={async () => {
                    this.setState({ loadingAvatar: true });
                    const r = await avatar(this.state.user.email);
                    this.setState((state) => {
                      var { user } = state;
                      user.avatar = r.avatar;
                      return { user, loadingAvatar: false };
                    });
                  }}
                >
                  根据邮箱更新 Github、Gavatar 头像
                </Button>
              </Col>
              <Col>
                <a href="/api/user/qq_avatar" target="_blank">
                  <Button disabled={!this.state.user.qq_connected}>更新 QQ 头像</Button>
                </a>
              </Col>
              <Col>
                <Button onClick={() => this.getData()}>刷新数据</Button>
              </Col>
            </Row>
          </If>
          <List
            dataSource={fields}
            renderItem={(item) => (
              <List.Item key={item.key}>
                <Row style={{ width: '100%' }}>
                  <Col span={4}>
                    <Typography.Text strong>{item.name}</Typography.Text>
                  </Col>
                  <Col span={20}>
                    <Typography.Text
                      copyable
                      editable={
                        this.state.user.self
                          ? { onChange: (v) => this.onChange(item.key, v) }
                          : false
                      }
                    >
                      {this.state.user[item.key]}
                    </Typography.Text>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
          <If condition={this.state.user.self}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input
                type="password"
                placeholder="如果不需要修改密码请留空"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <Row justify="space-between">
                <Col>
                  {!this.state.user.qq_connected ? (
                    <a href="/api/user/jump_to_qq?state=connect" target="_blank">
                      <Button>绑定 QQ 登录</Button>
                    </a>
                  ) : (
                    <Button disabled={true}>已绑定 QQ 登录</Button>
                  )}
                </Col>
                <Col style={{ textAlign: 'right' }}>
                  <Button loading={this.state.loading} type="primary" onClick={this.update}>
                    更新信息
                  </Button>
                </Col>
              </Row>
            </Space>
          </If>
        </Card>
      </Container>
    );
  }
}

export default withRouter(User);
