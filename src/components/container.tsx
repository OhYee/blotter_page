import React, { ComponentProps } from 'react';
import { Row, Col } from 'antd';
import { Gutter } from 'antd/lib/grid/row';

type ContainerProps = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  gutter_h?: number;
  gutter_v?: number;
} & ComponentProps<'base'>;

type ContainerState = {};

class Container extends React.Component<ContainerProps, ContainerState> {
  static defaultProps: ContainerProps = {
    xs: 20,
    sm: undefined,
    md: undefined,
    lg: 12,
    xl: undefined,
    gutter_h: 20,
    gutter_v: 40,
  };
  constructor(props: ContainerProps) {
    super(props);
  }
  render() {
    return (
      <Row
        type="flex"
        justify="center"
        gutter={[this.props.gutter_h, this.props.gutter_v] as [Gutter, Gutter]}
      >
        <Col
          xs={this.props.xs}
          sm={this.props.sm}
          md={this.props.md}
          lg={this.props.lg}
          xl={this.props.xl}
        >
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default Container;
