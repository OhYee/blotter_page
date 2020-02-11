import React, { ComponentProps } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { Affix, Button, Layout, BackTop, Row, Divider, Form, Menu, Icon, Modal, Input } from 'antd';
const { Footer, Sider, Content } = Layout;
import { FormComponentProps } from 'antd/lib/form';

import Container from '@/components/container';

import { layout, login, logout } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import { GlobalProps } from '@/utils/global';

import styles from './layout.less';

interface BasicLayoutProps
  extends GlobalProps,
    ComponentProps<'base'>,
    FormComponentProps,
    WithRouterProps {
  menus: Blotter.Menu[];
  beian: string;
  view: number;
  blog_name: string;
}
interface BasicLayoutState {
  collapsed: boolean;
  broken: boolean;
  loginModel: boolean;
  password: string;
  okDisabled: boolean;
  token: string;
}

class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
  static async getInitialProps(args: any) {
    var r = await layout();
    return r;
  }

  constructor(props: BasicLayoutProps) {
    super(props);
    this.state = {
      collapsed: true,
      broken: false,
      loginModel: false,
      password: '',
      okDisabled: false,
      token: '',
    };
    // setSiteName(this.props.blog_name);
    // setTitle('首页');
    // console.log(this.props.menus);
  }

  onCollapse = (collapsed: boolean, type: string) => {
    if (type == 'responsive') {
      this.setState({ collapsed: true });
    } else {
      this.setState({ collapsed });
    }
  };

  onBreakpoint = (broken: boolean) => {
    this.setState(() => ({ broken: broken }));
    this.setState(() => ({ collapsed: true }));
  };

  onCollapseButtonClick = () => this.setState(state => ({ collapsed: !state.collapsed }));

  renderCollapseButton = () => (
    <Affix
      offsetTop={this.state.broken ? window.innerHeight - 60 : 20}
      style={Object.assign(
        { position: 'fixed', marginLeft: 20, zIndex: 100 },
        this.state.broken ? { bottom: 20 } : { top: 20 },
      )}
    >
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={this.state.collapsed ? 'bars' : 'left'}
        className="shadow"
        onClick={this.onCollapseButtonClick}
      />
    </Affix>
  );

  onLoginClick = () => {
    this.setState({ loginModel: true });
  };

  onLogoutClick = async () => {
    var r = await logout();
    if (ShowNotification(r)) {
      //   this.props.dispatch({ type: 'token/set', token: '' });
    }
  };

  loginOK = async () => {
    // console.log(this.props.form.getFieldValue('password'));
    this.setState({ okDisabled: true });
    var { username, password } = this.props.form.getFieldsValue(['username', 'password']);
    var r = await login(username, password);
    if (ShowNotification(r)) {
      this.setState({ loginModel: false, okDisabled: false });
    } else {
      this.setState({ okDisabled: false });
    }
  };
  loginCancel = () => {
    this.setState({ loginModel: false });
  };

  renderMenus = () => {
    var hasLogin = this.state.token !== '';
    return (
      <Menu
        theme="light"
        selectedKeys={[this.props.router.pathname]}
        mode="inline"
        inlineIndent={10}
      >
                
        {this.props.menus.map((item: Blotter.Menu) => {
          return (
            <Menu.Item key={item.link}>
              <Link href={item.link}>
                <a>
                  {item.link ? <Icon type={item.icon} /> : null}
                  <span> {item.name}</span>
                </a>
              </Link>
            </Menu.Item>
          );
        })}
        {hasLogin ? (
          <Menu.Item key="login" onClick={this.onLoginClick}>
            <Link href="/admin">
              <a>
                <Icon type="setting" />
                <span>后台</span>
              </a>
            </Link>
          </Menu.Item>
        ) : null}
        {!hasLogin ? (
          <Menu.Item key="login" onClick={this.onLoginClick}>
            <Icon type="login" />
            <span>登录</span>
          </Menu.Item>
        ) : (
          <Menu.Item key="logout" onClick={this.onLogoutClick}>
            <Icon type="logout" />
            <span>登出</span>
          </Menu.Item>
        )}
                
        <Modal
          title="登录"
          visible={this.state.loginModel}
          onOk={this.loginOK}
          onCancel={this.loginCancel}
          okButtonProps={{ disabled: this.state.okDisabled }}
        >
          <Form>
            <Form.Item>
              {this.props.form.getFieldDecorator('username')(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {this.props.form.getFieldDecorator(`password`)(
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="密码"
                />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Menu>
    );
  };

  renderSider = () => {
    return (
      <Sider
        theme="light"
        trigger={null}
        breakpoint="xl"
        collapsible={true}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        collapsedWidth={this.state.broken ? 0 : 80}
        onBreakpoint={this.onBreakpoint}
      >
        <div className={styles.sider}>
          <Row type="flex" justify="center" className={styles.avatar}>
            <img
              src="/static/img/logo.svg"
              width={'100%'}
              height={'100%'}
              style={{ background: 'white', borderRadius: '100px' }}
            />
          </Row>

          <Divider className={this.state.collapsed ? styles.divider : undefined}>
            <b className={styles.divider}>OhYee</b>
          </Divider>

          {this.renderMenus()}
        </div>
      </Sider>
    );
  };

  renderFooter = () => {
    return (
      <Container>
        <div className={styles.footer}>
          <p>© 2017 – {new Date().getFullYear()}</p>
          <p>
            <Icon type="eye" style={{ fontSize: '0.75em' }} /> 全站访问量 {this.props.view}
          </p>
          <p>
            <a href="http://beian.miit.gov.cn/">{this.props.beian}</a>
          </p>
          <p>
            Powered by
            <a href="https://github.com/OhYee/blotter">Blotter</a>
            (Go + React)
          </p>
        </div>
      </Container>
    );
  };

  render() {
    return (
      <Layout
        style={{ minHeight: '100%' }}
        className={this.state.collapsed ? undefined : styles.dimmed}
      >
        <Head>
          <title>{this.props.blog_name}</title>
        </Head>
        <Layout
          className={'shadow'}
          style={{ position: 'fixed', zIndex: 100, height: '100vh', overflow: 'auto' }}
        >
          {this.renderSider()}
          <Content>{this.renderCollapseButton()}</Content>
        </Layout>
        <Layout style={this.state.collapsed ? {} : {}}>
          <Content>
            <div className={styles.main_content}>{this.props.children}</div>
            <BackTop />
          </Content>
          <Footer>{this.renderFooter()}</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Form.create<BasicLayoutProps>({ name: 'BasicLayout' })(withRouter(BasicLayout));