import React, { ComponentProps } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import Card from '@/components/card';
import CommentPart from '@/components/comment';

import { Context } from '@/utils/global';

interface CommentPageProps extends ComponentProps<'base'>, WithRouterProps {}
interface CommentPageState {}

class CommentPage extends React.Component<CommentPageProps, CommentPageState> {
  constructor(props: CommentPageProps) {
    super(props);
  }

  render() {
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`评论区|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <CommentPart url={this.props.router.asPath} />
      </Card>
    );
  }
}

export default withRouter(CommentPage);
