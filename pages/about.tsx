import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card } from 'antd';

import Container from '@/components/container';

import { GlobalProps } from '@/utils/global';

interface AboutPageProps extends GlobalProps, ComponentProps<'base'> {}
interface AboutPageState {}

export class AboutPage extends React.Component<AboutPageProps, AboutPageState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Head>
          <title>{`关于我|${this.props.blog_name}`}</title>
        </Head>
        <Card></Card>
      </Container>
    );
  }
}

export default AboutPage;
