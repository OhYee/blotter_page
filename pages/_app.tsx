import React from 'react';

import App, { AppProps, AppContext } from 'next/app';
import Head from 'next/head';

import { getCookie } from '@/utils/cookies';
import { Context, defaultContext, GlobalProps } from '@/utils/global';
import BasicLayout from '@/components/layout';
const Layout = BasicLayout as any;

import ErrorPage from '@/pages/_error';

interface MyAppProps extends AppProps {
  globalProps: GlobalProps;
  status: number;
  message: string;
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

  static async getInitialProps({ Component, router, ctx }: AppContext) {
    const isServer = !!ctx.req;

    var globalProps = defaultContext;
    var pageProps = {};

    var status = 0;
    var message = '';

    try {
      if (isServer && Layout.getInitialProps) {
        globalProps = await Layout.getInitialProps(ctx);
      }
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status && ctx.res) {
        ctx.res.statusCode = status = e.response.status;
        message = e.response.body;
      }
    }

    return { pageProps, globalProps, status, message };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Context.Provider value={this.state}>
        <Head>
          <title>{this.state.blog_name}</title>
        </Head>
        <Layout>
          {this.props.status != 0 ? (
            <ErrorPage status={this.props.status} />
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </Context.Provider>
    );
  }
}
