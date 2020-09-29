import React, { ComponentProps } from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { Flex } from '@/components/container';
import Button from '@/components/button';
import Card from '@/components/card';
import Input from '@/components/input';
import Avatar from '@/components/avatar';
import If from '@/components/if';

import { Context } from '@/utils/global';
import { info, userSet, avatar } from '@/utils/api';
import ShowNotification from '@/utils/notification';

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
    const allFields: {
      key: TypeUInT<Blotter.User, string>;
      name: string;
      self: boolean;
      prefix?: string;
      suffix?: string;
      rewrite?: (string) => string;
    }[] = [
      {
        key: 'avatar',
        name: '头像',
        self: true,
        rewrite: (url) => url.replace('http://', 'https://'),
      },
      { key: 'username', name: '用户名', self: false },
      { key: 'email', name: '邮箱', self: false },
      { key: 'qq', name: 'QQ 号', self: true },
      {
        key: 'ns_id',
        name: 'NS ID',
        self: false,
        prefix: 'SW',
        rewrite: (value) => value.replace(/[^0-9\-]/g, ''),
      },
      { key: 'ns_name', name: 'NS 名称', self: false },
      { key: 'ac_name', name: '动森名称', self: false },
      {
        key: 'ac_island',
        name: '动森岛名',
        self: false,
        suffix: '岛',
        rewrite: (value) => {
          if (value.length > 0 && value[value.length - 1] == '岛') {
            value = value.slice(0, value.length - 1);
          }
          return value;
        },
      },
    ];
    const fields = this.state.user.self ? allFields : allFields.filter((item) => !item.self);

    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`${this.props.router.query.username}|用户页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Flex direction="TB" fullWidth>
          <Avatar style={{ fontSize: 128, margin: 'auto' }} src={this.state.user.avatar} />
          <If condition={this.state.user.self}>
            <Flex>
              <Button
                neumorphism
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

              <a href="/api/user/qq_avatar" target="_blank">
                <Button neumorphism disabled={!this.state.user.qq_connected}>
                  更新 QQ 头像
                </Button>
              </a>

              <Button neumorphism onClick={() => this.getData()}>
                刷新数据
              </Button>
            </Flex>
          </If>
          <Flex direction="TB" fullWidth>
            {fields.map((item) =>
              this.state.user.self ? (
                <Input
                  key={item.key}
                  label={item.name}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  value={this.state.user[item.key]}
                  onChange={(value) => {
                    if (!!item.rewrite) value = item.rewrite(value);
                    this.setState((state) => {
                      var { user } = state;
                      user[item.key] = value;
                      return { user };
                    });
                  }}
                />
              ) : (
                <p>
                  {item.prefix} {this.state.user[item.key]} {item.suffix}
                </p>
              ),
            )}
          </Flex>

          <If condition={this.state.user.self}>
            <Flex>
              <Input
                type="password"
                placeholder="如果不需要修改密码请留空"
                value={this.state.password}
                onChange={(value) => this.setState({ password: value })}
              />

              {!this.state.user.qq_connected ? (
                <a href="/api/user/jump_to_qq?state=connect" target="_blank">
                  <Button neumorphism>绑定 QQ 登录</Button>
                </a>
              ) : (
                <Button neumorphism disabled={true}>
                  已绑定 QQ 登录
                </Button>
              )}

              {!this.state.user.github_connected ? (
                <a href="/api/user/jump_to_github?state=connect" target="_blank">
                  <Button neumorphism>绑定 Github 登录</Button>
                </a>
              ) : (
                <Button neumorphism disabled={true}>
                  已绑定 Github 登录
                </Button>
              )}

              <Button neumorphism loading={this.state.loading} primary onClick={this.update}>
                更新信息
              </Button>
            </Flex>
          </If>
        </Flex>
      </Card>
    );
  }
}

export default withRouter(User);
