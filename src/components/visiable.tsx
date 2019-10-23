import React, { ComponentProps } from 'react';

import { Row, Col } from 'antd';

type screenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type screenSizeObject = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};
const screenSizeList: screenSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

type VisiableProps = {
  visiable_smaller?: screenSize;
  visiable_bigger?: screenSize;
} & ComponentProps<'base'>;

type VisiableState = {};

class Visiable extends React.Component<VisiableProps, VisiableState> {
  constructor(props: VisiableProps) {
    super(props);
  }
  render_children = () => {
    var size: screenSizeObject = {
      xs: 0,
      sm: 0,
      md: 0,
      lg: 0,
      xl: 0,
      xxl: 0,
    };
    var find = false;
    if (this.props.visiable_bigger) {
      screenSizeList.map((s: screenSize) => {
        if (s == this.props.visiable_bigger) find = true;
        size[s] = find ? 24 : 0;
      });
    }
    if (this.props.visiable_smaller) {
      screenSizeList.map((s: screenSize) => {
        if (s == this.props.visiable_smaller) find = true;
        size[s] = find ? 0 : 24;
      });
    }

    return (
      <Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
        {this.props.children}
      </Col>
    );
  }
  render() {
    return <Row>{this.render_children()}</Row>;
  }
}

export default Visiable;
