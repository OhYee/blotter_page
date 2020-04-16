import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { Card, Descriptions, Typography, Avatar, List, Row, Col, Button, Input, Space } from 'antd';

import Container from '@/components/container';

import { Context, defaultContext } from '@/utils/global';
import { info, userSet, avatar } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import If from '@/components/if';
import Link from 'next/link';

interface UserProps extends ComponentProps<'base'>, WithRouterProps {}

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

  constructor(props: any) {
    super(props);
    this.state = {
      user: defaultContext.user,
      loading: false,
      loadingAvatar: false,
      password: '',
    };
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

    const { username, email, ns, qq, avatar } = this.state.user;
    const r = await userSet(username, email, avatar, ns, qq, this.state.password);
    ShowNotification(r);

    this.setState({ loading: false });
  };

  render() {
    const self = this.context.user.id == this.state.user.id;
    const allFields: { key: TypeUInT<Blotter.User, string>; name: string; self: boolean }[] = [
      { key: 'avatar', name: '头像', self: true },
      { key: 'username', name: '用户名', self: false },
      { key: 'email', name: '邮箱', self: false },
      { key: 'qq', name: 'QQ 号', self: false },
      { key: 'ns', name: 'NS 账户', self: false },
    ];
    const fields = self ? allFields : allFields.filter((item) => !item.self);

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
          <If condition={self}>
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
                  <Button disabled={this.state.user.qq_union_id === ''}>更新 QQ 头像</Button>
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
                      editable={self ? { onChange: (v) => this.onChange(item.key, v) } : false}
                    >
                      {this.state.user[item.key]}
                    </Typography.Text>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
          <If condition={self}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input
                type="password"
                placeholder="如果不需要修改密码请留空"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <Row justify="space-between">
                <Col>
                  {this.state.user.qq_union_id === '' ? (
                    <Link href="/api/user/jump_to_qq?state=connect">
                      <a target="_blank">
                        <Button>绑定 QQ 登录</Button>
                      </a>
                    </Link>
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
