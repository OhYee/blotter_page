import React from 'react';
import { Steps as AntdSteps, Space } from 'antd';
import { StepsProps, StepProps } from 'antd/lib/steps';

export default class Steps extends React.Component<StepsProps, any> {
  static Step = AntdSteps.Step;
  static defaultProps: {
    current: number;
  };
  render() {
    const child = this.props.children[this.props.current];
    return (
      <Space direction="vertical" size={20} style={{ width: '100%' }}>
        <AntdSteps {...this.props} />
        {!!child && !!child.props && !!child.props.children ? child.props.children : null}
      </Space>
    );
  }
}
