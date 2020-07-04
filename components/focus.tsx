import React from 'react';

interface FocusDivProps {
  distance?: number;
  children: (inArea: boolean) => React.ReactNode;
}

interface FocusDivState {
  in: boolean;
}

class FocusDiv extends React.Component<FocusDivProps, FocusDivState> {
  ref = React.createRef<HTMLDivElement>();
  static defaultProps = {
    distance: 0.25,
  };

  constructor(props) {
    super(props);
    this.state = { in: false };
  }
  componentDidMount() {
    document.addEventListener('scroll', this.judgeHeight);
    this.judgeHeight();
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.judgeHeight);
  }

  judgeHeight = () => {
    const windowTop = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.clientHeight;
    const elementTop = this.ref.current.offsetTop;
    const elementHeight = this.ref.current.offsetHeight;

    const elementCenter = elementTop + elementHeight / 2;
    const windowCenter = windowTop + windowHeight / 2;
    const distance = Math.abs(elementCenter - windowCenter);

    if ((windowHeight * this.props.distance) / 2 >= distance) {
      this.setState({ in: true });
    } else {
      this.setState({ in: false });
    }
  };

  render() {
    return <div ref={this.ref}>{this.props.children(this.state.in)}</div>;
  }
}

export default FocusDiv;
