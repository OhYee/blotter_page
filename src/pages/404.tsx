import React, { ComponentProps } from 'react';

import Container from '../components/container';

type PageNotFountProps = {} & ComponentProps<'base'>;

type PageNotFountState = {};

class PageNotFount extends React.Component<PageNotFountProps, PageNotFountState> {
  constructor(props: PageNotFountProps) {
    super(props);
  }
  render() {
    return <Container>Page Not Found</Container>;
  }
}

export default PageNotFount;
