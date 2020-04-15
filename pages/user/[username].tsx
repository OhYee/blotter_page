import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { Card, Descriptions, Typography, Avatar, List, Row, Col, Button, Input, Space } from 'antd';

import Container from '@/components/container';

import { Context, defaultContext } from '@/utils/global';
import { info, userSet } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import If from '@/components/if';

interface UserProps extends ComponentProps<'base'>, WithRouterProps {}

interface UserState {
  user: Blotter.User;
  loading: boolean;
  password: string;
}

class User extends React.Component<UserProps, UserState> {
  static defaultProps = {};
  static contextType = Context;

  constructor(props: any) {
    super(props);
    this.state = {
      user: defaultContext.user,
      loading: false,
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
    const fields: { key: TypeUInT<Blotter.User, string>; name: string; self: boolean }[] = [
      { key: 'avatar', name: '头像', self: true },
      { key: 'username', name: '用户名', self: false },
      { key: 'ns', name: 'NS 账户', self: false },
      { key: 'email', name: '邮箱', self: false },
      { key: 'qq', name: 'qq号', self: false },
    ];
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
              <Button loading={this.state.loading} onClick={() => this.update()}>
                更新信息
              </Button>
            </Space>
          </If>
        </Card>
      </Container>
    );
  }
}

export default withRouter(User);
