import React, { ComponentProps } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { Card, Anchor } from 'antd';

import Container from '@/components/container';
import CommentPart from '@/components/comment';

import { GlobalProps } from '@/utils/global';

interface CommentPageProps extends GlobalProps, ComponentProps<'base'>, WithRouterProps {}
interface CommentPageState {}

class CommentPage extends React.Component<CommentPageProps, CommentPageState> {
  constructor(props: CommentPageProps) {
    super(props);
  }

  render() {
    return (
      <Container lg={16}>
        <Head>
          <title>{`评论区|${this.props.blog_name}`}</title>
        </Head>
        <Card>
          <CommentPart url={this.props.router.asPath} />
        </Card>
      </Container>
    );
  }
}

export default withRouter(CommentPage);
