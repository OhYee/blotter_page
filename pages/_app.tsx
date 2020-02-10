import React from 'react';
import App from 'next/app';

import BasicLayout from '@/components/layout';
const Layout = BasicLayout as any;

export default class MyApp extends App {
  constructor(props: any) {
    super(props);
    console.log('APP', props);
  }
  static pageProps = {
    layoutProps: {},
    componentProps: {},
  };
  static async getInitialProps({ Component, router, ctx }) {
    const isServer = !!ctx.req;
    try {
      var layoutPromise = {};
      var componentPromise = {};

      console.log(Layout.getInitialProps);
      if (isServer && Layout.getInitialProps) {
        layoutPromise = Layout.getInitialProps(ctx);
      }
      if (Component.getInitialProps) {
        componentPromise = Component.getInitialProps(ctx);
      }
      if (isServer) {
        MyApp.pageProps.layoutProps = await layoutPromise;
      }
      MyApp.pageProps.componentProps = await componentPromise;
    } catch (e) {
      console.log(e);
    }

    return { pageProps: MyApp.pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout {...pageProps.layoutProps}>
        <Component {...pageProps.layoutProps} {...pageProps.componentProps} />
      </Layout>
    );
  }
}
