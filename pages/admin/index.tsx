import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card } from 'antd';

import Container from '@/components/container';

import { GlobalProps } from '@/utils/global';

interface AdminIndexProps extends GlobalProps, ComponentProps<'base'> {}

interface AdminIndexState {}

class AdminIndex extends React.Component<AdminIndexProps, AdminIndexState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <Container>
        <Head>
          <title>{`后台|${this.props.blog_name}`}</title>
        </Head>
        <Card></Card>
      </Container>
    );
  }
}

export default AdminIndex;
