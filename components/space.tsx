import React, { ComponentProps } from 'react';
import { Space as S } from 'antd';
import styles from '@/components/layout.less';

interface SpaceProps extends ComponentProps<'base'> {
  direction: 'horizontal' | 'vertical';
  size?: number | 'small' | 'middle' | 'large';
  center: boolean;
}

interface SpaceState {}

class Space extends React.Component<SpaceProps, SpaceState> {
  static defaultProps: SpaceProps = {
    direction: 'vertical',
    size: undefined,
    center: false,
  };

  render() {
    var classNames: string[] = [styles.fullWidth];
    if (this.props.center) [classNames.push(styles.textCenter)];
    return (
      <S className={classNames.join(' ')} direction={this.props.direction} size={this.props.size}>
        {this.props.children}
      </S>
    );
  }
}

class TextCenter extends React.Component {
  render() {
    return <div className="textCenter">{this.props.children}</div>;
  }
}

class FlexCenter extends React.Component {
  render() {
    return <div className="flexCenter">{this.props.children}</div>;
  }
}

export default Space;
export { TextCenter, FlexCenter };
