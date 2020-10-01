import React from 'react';

import App, { AppProps, AppContext } from 'next/app';
import Head from 'next/head';

import { getCookie } from '@/utils/storage';
import { Context, defaultContext, GlobalProps, getTimeTheme } from '@/utils/global';
import BasicLayout from '@/components/layout';
const Layout = BasicLayout as any;

import ErrorPage from '@/pages/_error';

import { view, info } from '@/utils/api';

import '@/styles/global.scss';
import '@/styles/theme.scss';
import '@/components/image/image.scss';

interface MyAppProps extends AppProps {
  globalProps: GlobalProps;
  status: number;
  message: string;
}
interface MyAppState extends GlobalProps {}

export default class MyApp extends App<MyAppProps, {}, MyAppState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  constructor(props: any) {
    super(props);
    this.state = {
      ...defaultContext,
      ...this.props.globalProps,
      //   token: getCookie('token'),
      callback: (props, callback) => {
        this.setState(
          (state) => ({
            ...state,
            ...props,
          }),
          callback,
        );
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

  async componentDidMount() {
    view();
    const user = await info();
    this.setState({ user, theme: getTimeTheme() });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Context.Provider value={this.state}>
        <Head>
          <title>{this.state.blog_name}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {this.state.grey ? (
            <style
              id="grey-style"
              type="text/css"
              dangerouslySetInnerHTML={{
                __html: 'html{filter:gray;-webkit-filter: grayscale(100%);}',
              }}
            ></style>
          ) : null}
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
