import React, { ComponentProps } from 'react';

interface IfProps {
  condition: boolean;
}

interface IfState {}

class If extends React.Component<IfProps & ComponentProps<'base'>, IfState> {
  static defaultProps = {
    condition: true,
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return this.props.condition ? this.props.children : null;
  }
}

export default If;
