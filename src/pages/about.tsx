import React, { ComponentProps } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Card } from 'antd';

import PostList from '@/components/post_list';
import Container from '@/components/container';
import { setTitle } from '@/utils/prerender';

type AboutPageProps = {};

type AboutPageState = {};

export class AboutPage extends React.Component<
  AboutPageProps & ComponentProps<'base'> & RouteComponentProps,
  AboutPageState
> {
  static defaultProps: AboutPageProps = {};

  constructor(props: any) {
    super(props);
    this.state = {};
    setTitle('关于我');
  }

  render() {
    return (
      <Container>
        <Card></Card>
      </Container>
    );
  }
}

export default AboutPage;
