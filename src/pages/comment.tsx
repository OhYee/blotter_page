import React, { ComponentProps } from 'react';

import { Card, Anchor } from 'antd';
const { Link } = Anchor;

import Container from '@/components/container';
import CommentPart from '@/components/comment';

import { withRouter, RouteComponentProps } from 'react-router';
import { InitialPropsParam } from '@/utils/api';
import { setTitle } from '@/utils/prerender';

type CommentPageProps = {};

type CommentPageState = {};

class CommentPage extends React.Component<
  CommentPageProps & ComponentProps<'base'> & RouteComponentProps,
  CommentPageState
> {
  static defaultProps: CommentPageProps = {};

  //   static async getInitialProps(args: InitialPropsParam) {}

  constructor(props: CommentPageProps & ComponentProps<'base'> & RouteComponentProps) {
    super(props);
    setTitle('评论区');
  }

  render() {
    return (
      <Container lg={16}>
        <Card>
          <CommentPart url={this.props.location.pathname} />
        </Card>
      </Container>
    );
  }
}

export default withRouter(CommentPage);
