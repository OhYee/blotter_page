import React, { ComponentProps, Fragment } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import {
  Affix,
  Button,
  Layout,
  BackTop,
  Row,
  Menu,
  Modal,
  Col,
  Avatar,
  Popover,
  Typography,
} from 'antd';
import { Icon } from '@ant-design/compatible';
const { Footer, Sider, Content } = Layout;
import { UserOutlined } from '@ant-design/icons';
// import { FormComponentProps } from 'antd/lib/form';

import Container, { Space } from '@/components/container';

import changeTheme from 'next-dynamic-antd-theme';

import { layout, logout, info } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import { GlobalProps, Context, defaultContext } from '@/utils/global';
import { setCookie } from '@/utils/storage';

import styles from './layout.less';
import { AvatarProps } from 'antd/lib/avatar';
import If from './if';
import { LoginModal } from '@/components/login';
import Paragraph from 'antd/lib/skeleton/Paragraph';

interface BasicLayoutProps extends ComponentProps<'base'>, WithRouterProps {}
interface BasicLayoutState {
  collapsed: boolean;
  loginModal: boolean;
  password: string;
  okDisabled: boolean;
  feedback: boolean;
}

class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  static async getInitialProps(args: any) {
    var r = await layout();
    return r;
  }

  constructor(props: BasicLayoutProps) {
    super(props);
    this.state = {
      collapsed: true,
      loginModal: false,
      password: '',
      okDisabled: false,
      feedback: false,
    };
  }

  onCollapse = (collapsed: boolean, type: string) => {
    if (type == 'responsive') {
      this.setState({ collapsed: true });
    } else {
      this.setState({ collapsed });
    }
  };

  onBreakpoint = (broken: boolean) => {
    this.context.callback({ big_screen: !broken });
    this.setState(() => ({ collapsed: true }));
  };

  onCollapseButtonClick = () => this.setState((state) => ({ collapsed: !state.collapsed }));

  renderLight = (props) => (
    <div
      className="primary-color"
      dangerouslySetInnerHTML={{
        __html: `
   <svg width="1em" height="1em" viewBox="0 0 21 21">
      <g fill="none" fill-rule="evenodd">
        <path
          fill="currentColor"
          fill-rule="nonzero"
          d="M21 10.5l-3 3V18h-4.5l-3 3-3-3H3v-4.5l-3-3 3-3V3h4.5l3-3 3 3H18v4.5z"
        ></path>
        <circle stroke="#FFF" stroke-width="1.5" cx="10.5" cy="10.5" r="4"></circle>
      </g>
    </svg>
        `,
      }}
    />
  );
  renderDark = (props) => (
    <div
      className="primary-color"
      dangerouslySetInnerHTML={{
        __html: `
   <svg width="1em" height="1em" viewBox="0 0 21 21">
      <g fill="none" fill-rule="evenodd">
        <circle fill="currentColor" cx="10.5" cy="10.5" r="10.5"></circle>
        <path
          d="M13.396 11c0-3.019-1.832-5.584-4.394-6.566A6.427 6.427 0 0111.304 4C15.002 4 18 7.135 18 11c0 3.866-2.998 7-6.698 7A6.42 6.42 0 019 17.566c2.564-.98 4.396-3.545 4.396-6.566z"
          fill="#FFF"
          fill-rule="nonzero"
        ></path>
      </g>
    </svg>
        `,
      }}
    />
  );

  renderCollapseButton = () => (
    <Affix
      //   offsetTop={
      //     // !this.context.big_screen && typeof window !== 'undefined' ? window.innerHeight - 60 : 20
      //     20
      //   }
      style={{ position: 'fixed', marginLeft: 20, zIndex: 100, top: 20 }}
    >
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={this.state.collapsed ? <Icon type="bars" /> : <Icon type="left" />}
        className="shadow"
        onClick={this.onCollapseButtonClick}
      />
    </Affix>
  );

  renderBackToTop = () => (
    <BackTop style={{ position: 'fixed', right: '20px', bottom: '60px' }}>
      <Button
        shape="circle"
        className="shadow"
        size="large"
        icon={<Icon type="rocket" theme="twoTone" />}
      />
    </BackTop>
  );

  renderFeedback = () => (
    <Context.Consumer>
      {(context) => (
        <Button
          shape="circle"
          size="large"
          icon={<Icon type="message" theme="twoTone" />}
          className="shadow"
          onClick={() => {
            Modal.info({
              title: '反馈Bug！',
              content: (
                <div>
                  <p>
                    有一个{' '}
                    <a href="https://github.com/OhYee/blotter_page/issues" target="__blank">
                      前端的Bug
                    </a>
                    ，包括但不限于页面渲染不正常
                  </p>
                  <p>
                    有一个{' '}
                    <a href="https://github.com/OhYee/blotter/issues" target="__blank">
                      后端的Bug
                    </a>
                    ，包括但不限于各种功能性故障
                  </p>
                  <p>
                    直接使用
                    <a href={`mailto:${context.email}`} target="__blank">
                      {' '}
                      <Icon type="mail" /> 邮件
                    </a>{' '}
                    反馈bug
                  </p>
                  <p>
                    直接使用
                    <a
                      href={`//wpa.qq.com/msgrd?v=3&uin=${context.qq}&site=qq&menu=yes`}
                      target="__blank"
                    >
                      {' '}
                      <Icon type="qq" /> QQ
                    </a>{' '}
                    反馈bug
                  </p>
                  <p>
                    直接在评论区
                    <a href="/comment" target="__blank">
                      {' '}
                      <Icon type="comment" /> 评论区
                    </a>{' '}
                    反馈bug
                  </p>
                </div>
              ),
            });
          }}
          style={{ position: 'fixed', right: '20px', bottom: '120px' }}
        />
      )}
    </Context.Consumer>
  );

  renderChangeTheme = () => (
    <Button
      shape="circle"
      size="large"
      icon={
        <Icon component={this.context.theme == 'default' ? this.renderDark : this.renderLight} />
      }
      className="shadow"
      onClick={() => {
        const newTheme = this.context.theme == 'default' ? 'dark' : 'default';
        this.context.callback({ theme: newTheme }, () => {
          changeTheme(this.context.theme);
        });
      }}
      style={{ position: 'fixed', right: '20px', bottom: '180px' }}
    />
  );

  onLoginClick = () => {
    this.setState({ loginModal: true });
  };

  onLogoutClick = async () => {
    var r = await logout();
    ShowNotification(r);
    setCookie('token', '', 0);
    this.context.callback({ user: defaultContext.user });
  };

  renderMenus = (menus: Blotter.Menu[], theme: 'light' | 'dark') => {
    return (
      <Menu
        theme={theme}
        selectedKeys={[this.props.router.pathname]}
        mode="inline"
        inlineIndent={10}
      >
        {menus.map((item: Blotter.Menu) => {
          return (
            <Menu.Item key={item.link}>
              {item.link.length > 0 && item.link[0] !== '/' ? (
                <a target="_blank" href={item.link}>
                  {item.icon ? <Icon type={item.icon} /> : null}
                  <span> {item.name}</span>
                </a>
              ) : (
                <Link href={item.link}>
                  <a>
                    {item.icon ? <Icon type={item.icon} /> : null}
                    <span> {item.name}</span>
                  </a>
                </Link>
              )}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  renderSider = () => {
    const theme = this.context.theme === 'default' ? 'light' : 'dark';
    return (
      <Sider
        theme={theme}
        trigger={null}
        breakpoint="xl"
        collapsible={true}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        collapsedWidth={!this.context.big_screen ? 0 : 80}
        onBreakpoint={this.onBreakpoint}
      >
        <div className={styles.sider}>
          <div className={[styles.avatar, 'textCenter'].join(' ')}>
            <img
              src={this.context.avatar}
              width={'100%'}
              height={'100%'}
              style={{ background: 'white', borderRadius: '100px', maxWidth: '120px' }}
            />
          </div>
          {/* <Divider className={this.state.collapsed ? styles.divider : undefined}>
            <b className={styles.divider}>OhYee</b>
          </Divider> */}

          <Context.Consumer>
            {(context) => (
              <Fragment>
                <div className={[styles.avatar, 'textCenter'].join(' ')}>
                  {!context.user.existed ? (
                    <a onClick={this.onLoginClick}>
                      <Avatar icon={<UserOutlined />} />
                    </a>
                  ) : (
                    <Popover
                      placement="right"
                      trigger={['click', 'hover']}
                      title={context.user.username}
                      content={
                        <div>
                          <Row gutter={[10, 10]}>
                            <Col span={12}>
                              <Link href="/user/[username]" as={`/user/${context.user.username}`}>
                                <a>设置</a>
                              </Link>
                            </Col>

                            <Col span={12}>
                              <a onClick={this.onLogoutClick}>登出</a>
                            </Col>
                          </Row>

                          <If condition={(context.user.permission & 1) != 0}>
                            <Row gutter={10}>
                              <Col span={12}>
                                <Link href="/admin">
                                  <a>管理</a>
                                </Link>
                              </Col>
                            </Row>
                          </If>
                        </div>
                      }
                    >
                      <span style={{ cursor: 'pointer' }}>
                        {context.user.avatar ? (
                          <Avatar src={context.user.avatar} style={{ background: 'unset' }} />
                        ) : (
                          <Avatar icon={<UserOutlined />} />
                        )}
                      </span>
                    </Popover>
                  )}
                </div>
                {this.renderMenus(context.menus, theme)}
              </Fragment>
            )}
          </Context.Consumer>
        </div>
      </Sider>
    );
  };

  renderRSSIcon = () => (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1115"
      data-spm-anchor-id="a313x.7781069.0.i1"
    >
      <path
        d="M42.666667 853.333333a128 128 0 1 1 256 0 128 128 0 0 1-256 0z m938.666666 128h-178.773333c0-418.986667-340.906667-759.893333-759.893333-759.893333V42.666667c517.546667 0 938.666667 421.12 938.666666 938.666666z m-298.666666 0h-182.826667c0-252.074667-205.098667-457.130667-457.173333-457.130666V341.333333c352.896 0 640 287.104 640 640z"
        fill="#EE802F"
        p-id="1116"
      ></path>
    </svg>
  );

  renderFooter = () => {
    return (
      <Container>
        <Context.Consumer>
          {(context) => (
            <Typography.Paragraph className={styles.footer}>
              <Typography.Paragraph>
                <a href="/rss.xml">
                  <Icon style={{ width: '1em' }} component={this.renderRSSIcon} />
                  RSS订阅
                </a>
              </Typography.Paragraph>
              <Typography.Paragraph>
                <Icon type="eye" style={{ fontSize: '0.75em' }} /> 全站访问量 {context.view}
              </Typography.Paragraph>
              <Typography.Paragraph>
                <span className="right5">
                  {this.context.from} – {new Date().getFullYear()}
                </span>
                <a href="http://beian.miit.gov.cn/">{context.beian}</a>
              </Typography.Paragraph>
              <Typography.Paragraph>
                Powered by <a href="https://github.com/OhYee/blotter">Blotter</a>
                (Go + React)
              </Typography.Paragraph>
              <Typography.Paragraph>
                <span className="right5">
                  <a href="/sitemap.txt">站点地图(TXT)</a>
                </span>
                <span>
                  <a href="/sitemap.xml">站点地图(XML)</a>
                </span>
              </Typography.Paragraph>
              <If condition={context.friends.length > 0}>
                <Typography.Paragraph className={styles.friends}>
                  <strong>优秀博客订阅：</strong>
                  {context.friends.map((friend) => (
                    <span key={friend.name}>
                      <a href={friend.link}>{friend.name}</a>
                    </span>
                  ))}
                </Typography.Paragraph>
              </If>
            </Typography.Paragraph>
          )}
        </Context.Consumer>
      </Container>
    );
  };

  render() {
    return (
      <Layout style={{ minHeight: '100%' }} className={`${this.context.theme}`}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{context.blog_name}</title>
            </Head>
          )}
        </Context.Consumer>
        {this.state.collapsed ? null : (
          <div className={styles.dimmed} onClick={(e) => this.setState({ collapsed: true })} />
        )}
        <Layout
          className={'shadow'}
          style={{ position: 'fixed', zIndex: 100, top: 0, bottom: 0, overflow: 'auto' }}
        >
          {this.renderSider()}
          <Content>{this.renderCollapseButton()}</Content>
        </Layout>
        <Layout>
          <Content>
            <div className={styles.main_content}>{this.props.children}</div>
            {/* <BackTop /> */}
            {this.renderBackToTop()}
            {this.renderFeedback()}
            {this.renderChangeTheme()}
            <LoginModal
              show={this.state.loginModal}
              onCancel={() => this.setState({ loginModal: false })}
              callback={(success) => {
                if (success) this.setState({ loginModal: false });
              }}
            />
          </Content>
          <Footer>{this.renderFooter()}</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
