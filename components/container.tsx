import React, { ComponentProps } from 'react';
import { Row, Col, Space as S } from 'antd';
import { Gutter } from 'antd/lib/grid/row';
import '@/components/layout.less';

interface ContainerProps extends ComponentProps<'base'> {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  gutter_h?: number;
  gutter_v?: number;
}

interface ContainerState {}

class Container extends React.Component<ContainerProps, ContainerState> {
  static defaultProps: ContainerProps = {
    xs: 24,
    sm: 20,
    md: 18,
    lg: 16,
    xl: undefined,
    xxl: undefined,
    gutter_h: 20,
    gutter_v: 40,
  };
  constructor(props: ContainerProps) {
    super(props);
  }
  render() {
    return (
      <Row justify="center" gutter={[this.props.gutter_h, this.props.gutter_v] as [Gutter, Gutter]}>
        <Col
          xs={this.props.xs}
          sm={this.props.sm}
          md={this.props.md}
          lg={this.props.lg}
          xl={this.props.xl}
          xxl={this.props.xxl}
        >
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export interface SpaceProps extends ComponentProps<'base'> {
  direction?: 'horizontal' | 'vertical';
  size?: number | 'small' | 'middle' | 'large';
  textCenter?: boolean;
  flexCenter?: boolean;
}

const Space: React.FC<SpaceProps> = (props) => {
  const {
    direction = 'vertical',
    size,
    textCenter = false,
    flexCenter = false,
    className,
    children,
    style,
  } = props;

  var classNames: string[] = [className, 'fullWidth'];
  if (flexCenter) classNames.push('flexCenter');
  if (textCenter) classNames.push('textCenter');
  return (
    <S className={classNames.join(' ')} direction={direction} size={size} style={style}>
      {children}
    </S>
  );
};

const TextCenter: React.FC = (props) => {
  return <div className="textCenter">{props.children}</div>;
};

const FlexCenter: React.FC = (props) => {
  return <div className="flexCenter">{props.children}</div>;
};

export default Container;
export { Space, TextCenter, FlexCenter };
