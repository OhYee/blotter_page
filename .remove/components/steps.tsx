import React from 'react';
import { Steps as AntdSteps } from 'antd';
import { StepsProps, StepProps } from 'antd/lib/steps';
import { Space, FlexCenter } from '@/components/container';

export default class Steps extends React.Component<StepsProps, any> {
  static Step = AntdSteps.Step;
  static defaultProps: {
    current: number;
  };
  render() {
    const child = this.props.children[this.props.current];
    return (
      <Space>
        <AntdSteps {...this.props} />
        <div style={{ marginTop: 20 }}>
          {!!child && !!child.props && !!child.props.children ? child.props.children : null}
        </div>
      </Space>
    );
  }
}
