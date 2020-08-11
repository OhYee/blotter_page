import React, { ComponentProps } from 'react';
import { Row, Col, Space as S } from 'antd';
import { Gutter } from 'antd/lib/grid/row';
import { ObjectFilter } from '@/utils/object';

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
  flex?:
    | 'baseline'
    | 'flex-start'
    | 'flex-end'
    | 'start'
    | 'center'
    | 'end'
    | 'left'
    | 'right'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'stretch';
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
    flex,
  } = props;

  var flexStyle = {};
  if (!!flex) flexStyle = { flex: 'auto', justifyContent: flex };

  var classNames: string[] = [className, 'fullWidth'];
  if (flexCenter) classNames.push('flexCenter');
  if (textCenter) classNames.push('textCenter');
  return (
    <S
      className={classNames.join(' ')}
      direction={direction}
      size={size}
      style={{ ...flexStyle, ...style }}
    >
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

export declare type SizeProp = number | 'none' | 'small' | 'middle' | 'large';

function getSize(size: SizeProp): number {
  return size === 'large'
    ? 20
    : size === 'middle'
    ? 10
    : size === 'small'
    ? 5
    : size === 'none'
    ? 0
    : size;
}

export const Flex: React.FC<{
  direction?: 'LR' | 'TB' | 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: true | false | 'nowrap' | 'wrap' | 'wrap-reverse';
  mainAxis?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  subAxis?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  mainSize?: SizeProp;
  subSize?: SizeProp;
  subAxisSizeEnable?: boolean;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  className?: string;
}> = (props) => {
  const {
    direction = 'LR',
    wrap = true,
    mainSize = 'middle',
    subSize = 0,
    mainAxis = 'space-between',
    subAxis = 'center',
    itemStyle = {},
    children,
    style,
    className,
  } = props;
  const list = Array.isArray(children) ? children : [children];
  const dir = direction === 'LR' ? 'row' : direction === 'TB' ? 'column' : direction;
  const mSize = getSize(mainSize);
  const sSize = getSize(subSize);

  // 容器样式
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: dir,
    flexWrap: wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap,
    justifyContent: mainAxis,
    alignItems: subAxis,
  };

  // 元素样式 - 计算每个元素之间的边距
  var defaultStyle = {};
  var specialStyle = {};
  var after = 'marginRight';
  var before = 'marginLeft';
  var subAxis1 = 'marginTop';
  var subAxis2 = 'marginBottom';
  const specialPos =
    mainAxis === 'space-around'
      ? dir === 'row' || dir === 'column'
        ? 0
        : list.length - 1
      : dir === 'row' || dir === 'column'
      ? list.length - 1
      : 0;
  switch (dir) {
    case 'row': {
      after = 'marginRight';
      before = 'marginLeft';
      subAxis1 = 'marginTop';
      subAxis2 = 'marginBottom';
      break;
    }
    case 'column': {
      after = 'marginBottom';
      before = 'marginTop';
      subAxis1 = 'marginLeft';
      subAxis2 = 'marginRight';
      break;
    }
    case 'row-reverse': {
      after = 'marginLeft';
      before = 'marginRight';
      subAxis1 = 'marginTop';
      subAxis2 = 'marginBottom';
      break;
    }
    case 'column-reverse': {
      after = 'marginTop';
      before = 'marginBottom';
      subAxis1 = 'marginLeft';
      subAxis2 = 'marginRight';
      break;
    }
  }

  if (mainAxis === 'space-around') {
    defaultStyle = { [after]: mSize, [subAxis1]: sSize, [subAxis2]: sSize };
    specialStyle = { [after]: mSize, [before]: mSize, [subAxis1]: sSize, [subAxis2]: sSize };
  } else {
    defaultStyle = { [after]: mSize, [subAxis2]: sSize };
    specialStyle = { [subAxis2]: sSize };
  }

  // 删除为 0 的值
  defaultStyle = ObjectFilter(defaultStyle, (_, value) => value != 0);
  specialStyle = ObjectFilter(specialStyle, (_, value) => value != 0);

  return (
    <div className={className} style={{ ...containerStyles, ...style }}>
      {list.map((child, idx) => (
        <div
          key={idx}
          style={{
            ...(idx === specialPos ? specialStyle : defaultStyle),
            ...itemStyle,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
