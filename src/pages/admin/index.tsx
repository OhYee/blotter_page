import React, { ComponentProps } from 'react';
import router from 'umi/router';
import { Card } from 'antd';
import PostList from '@/components/post_list';

import { InitialPropsParam } from '@/utils/api';
import Container from '@/components/container';

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
        <Card></Card>
      </Container>
    );
  }
}

export default AdminIndex;
