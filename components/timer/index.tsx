import React from 'react';

import moment from '@/utils/moment';
import { concat, ComponentProps } from '@/utils/component';

import styles from './timer.module.scss';

export declare type TimerProps = ComponentProps<{
  target?: number;
  format?: (now: number, target: number) => string;
  onFinished?: () => string | void;
  ms?: number;
  title?: React.ReactNode;
}>;

type TimerState = {
  f: string;
  target: number;
};

export default class Timer extends React.Component<TimerProps, TimerState> {
  timer: NodeJS.Timeout;

  static staticProps: TimerProps = {
    target: 0,
    ms: 100,
    format: () => '',
    onFinished: () => {},
    title: '',
  };
  constructor(props) {
    super(props);
    this.state = { f: '', target: 0 };
  }

  componentDidMount() {
    this.begin();
  }

  componentDidUpdate() {
    if (this.state.target !== this.props.target) {
      this.begin();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  begin = () => {
    this.setState({ target: this.props.target });
    this.stop();
    this.timer = setInterval(() => {
      const now = moment.now();
      if (this.props.target <= now) {
        this.stop();
        const newString = this.props.onFinished();
        if (typeof newString === 'string') this.setState({ f: newString });
        return;
      }
      this.setState({ f: this.props.format(now, this.props.target) });
    }, this.props.ms);
  };

  stop = () => {
    if (!!this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  };

  render() {
    const { target, format, onFinished, ms, title, className, ...restProps } = this.props;
    return (
      <div {...restProps} className={concat(styles.timer, className)}>
        <div className={styles.title}>{title}</div>
        <div className={styles.time}>{this.state.f}</div>
      </div>
    );
  }
}
