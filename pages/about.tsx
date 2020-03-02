import React, { ComponentProps } from 'react';

import Head from 'next/head';
import { NextPageContext } from 'next';

import { Card } from 'antd';

import Container from '@/components/container';

import { Context } from '@/utils/global';

interface AboutPageProps extends ComponentProps<'base'> {}
interface AboutPageState {}

class AboutPage extends React.Component<AboutPageProps, AboutPageState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`关于我|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card></Card>
      </Container>
    );
  }
}

export default AboutPage;
