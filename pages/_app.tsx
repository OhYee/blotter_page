import React from 'react';
import App, { AppProps } from 'next/app';

import BasicLayout from '@/components/layout';
const Layout = BasicLayout as any;

import { Context, defaultContext, GlobalProps } from '@/utils/global';
import { getCookie } from '@/utils/cookies';

interface MyAppProps extends AppProps {
  globalProps: GlobalProps;
}
interface MyAppState extends GlobalProps {}

export default class MyApp extends App<MyAppProps, {}, MyAppState> {
  static contextType = Context;
  constructor(props: any) {
    super(props);
    this.state = {
      ...defaultContext,
      ...this.props.globalProps,
      token: getCookie('token'),
      callback: props => {
        this.setState(props);
      },
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    const isServer = !!ctx.req;

    var globalProps = defaultContext;
    var pageProps = {};

    try {
      if (isServer && Layout.getInitialProps) {
        globalProps = await Layout.getInitialProps(ctx);
      }
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
    } catch (e) {
      console.log(e);
    }

    return { pageProps, globalProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Context.Provider value={this.state}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Context.Provider>
    );
  }
}
