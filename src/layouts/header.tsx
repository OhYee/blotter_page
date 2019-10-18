import React from 'react';
import { PageHeader, Breadcrumb } from 'antd';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';

type HeaderProps = {
  title: string;
  router: BreadcrumbProps;
};

class HeaderPart extends React.Component<HeaderProps, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <PageHeader
        // style={{
        //   border: '1px solid rgb(235, 237, 240)',
        // }}
        title={this.props.title}
        breadcrumb={this.props.router}
      />
    );
  }
}

export default HeaderPart;
