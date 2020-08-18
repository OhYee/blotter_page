import React, { ComponentProps } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { layout } from '@/utils/api';
import { Context } from '@/utils/global';

import styles from '@/components/layout/layout.less';
import SiderRenderer from '@/components/layout/sider';
import FooterRenderer from '@/components/layout/footer';
import FixedButton from '@/components/layout/fixed_button';
import { Flex } from '@/components/container';

import '@/style/theme.less';

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
    return (
      <div className={[styles.root, this.context.theme].join(' ')}>
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
          style={{ width: this.context.big_screen ? 'calc(100vw - 320px)' : '90%', margin: 'auto' }}
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
      </div>
    );
  }
}

export default withRouter(BasicLayout);
