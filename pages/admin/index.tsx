import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card } from 'antd';

import Container from '@/components/container';

import { Context } from '@/utils/global';
import Link from 'next/link';

interface AdminIndexProps extends ComponentProps<'base'> {}

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
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <Link href="/admin/posts">
            <a>文章管理</a>
          </Link>
        </Card>
      </Container>
    );
  }
}

export default AdminIndex;
