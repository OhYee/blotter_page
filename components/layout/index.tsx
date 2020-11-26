import React, { ComponentProps } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { layout } from '@/utils/api';
import { Context } from '@/utils/global';

import styles from '@/components/layout/layout.module.scss';
import SiderRenderer from '@/components/layout/sider';
import FooterRenderer from '@/components/layout/footer';
import FixedButton from '@/components/layout/fixed_button';
import { Flex } from '@/components/container';

import { concat } from '@/utils/component';
import { message } from '../notification';

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

  componentDidMount() {
    this.context.callback({ big_screen: document.body.clientWidth > 1024 });
    window.addEventListener('resize', this.onResize);
    // 苹果用户提醒
    // https://github.com/facebook/react/issues/17258
    var issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    if (issafariBrowser) {
      message({
        alertType: 'warning',
        autoClose: 0,
        title: '苹果用户提醒',
        content: (
          <div>
            检测到您是苹果用户，IOS 13 后 Safari 的 Webkit 可能存在
            Bug，部分按钮可能难以触发，请快速多次点击或尝试长按触发。相关讨论可见{' '}
            <a href="https://github.com/facebook/react/issues/17258">Github</a>
          </div>
        ),
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const width = document.body.clientWidth;
    if (width > 1024 && !this.context.big_screen) {
      this.context.callback({ big_screen: true });
    } else if (width < 1024 && this.context.big_screen) {
      this.context.callback({ big_screen: false });
    }
  };

  render() {
    if (typeof document !== 'undefined')
      document.body.className = concat('default', this.context.theme);
    return (
      <div id="blotter_root" className={concat(styles.root)}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{context.blog_name}</title>
            </Head>
          )}
        </Context.Consumer>
        <SiderRenderer
          pathname={this.props.router.pathname}
          user={this.context.user}
          avatar={this.context.avatar}
          big_screen={this.context.big_screen}
          theme={this.context.theme}
          menus={this.context.menus}
          callback={this.context.callback}
        />
        <FixedButton />

        <Flex
          direction="TB"
          mainAxis="space-around"
          mainSize="large"
          style={{
            minHeight: '100vh',
            width: this.context.big_screen ? 'calc(100vw - 320px)' : 'calc(100vw - 20px)',
            margin: 'auto',
          }}
          itemStyle={{ width: '100%' }}
        >
          {this.props.children}
          <FooterRenderer
            beian={this.context.beian}
            friends={this.context.friends}
            view={this.context.view}
            from={this.context.from}
          />
        </Flex>
        {/* 
            不能在 HEAD 中插入 div 标签，故将其移动到后面 
            相关讨论：https://github.com/vercel/next.js/issues/12437
            报错提示：https://err.sh/next.js/next-head-count-missing
        */}
        {this.context.head && <div dangerouslySetInnerHTML={{ __html: this.context.head }}></div>}
      </div>
    );
  }
}

export default withRouter(BasicLayout);
