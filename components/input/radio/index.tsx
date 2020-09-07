import React from 'react';

import { concat, ComponentProps } from '@/utils/component';
import { Flex } from '@/components/container';
import { Option } from '../';

import styles from './radio.less';

export declare type RadioProps<T> = ComponentProps<{
  direction?: 'TB' | 'LR';
  options: Option<T>[];
  defaultValue?: string;
  value?: string;
  onChange?: (key: string, value: any) => void;
  setValueCallback?: (callback: (key: string) => void) => void;
  getValueCallback?: (callback: () => Option<T>) => void;
}>;

export default function Radio<T>(props: RadioProps<T>) {
  const {
    direction = 'LR',
    options,
    defaultValue = '',
    value,
    onChange = () => {},
    setValueCallback = () => {},
    getValueCallback = () => {},
    className,
    style,
    id,
  } = props;
  const [state, setState] = React.useState(defaultValue);
  const nowValue = typeof value === 'undefined' ? state : value;
  React.useEffect(() => {
    setValueCallback(setState);
  }, [setValueCallback, setState]);
  React.useEffect(() => {
    getValueCallback(() => options[nowValue]);
  }, [getValueCallback, nowValue, options]);
  return (
    <Flex
      direction={direction}
      mainAxis="flex-start"
      subSize="middle"
      id={id}
      className={concat(className, styles.radio)}
      style={style}
    >
      {options.map((option) => (
        <div
          key={option.key}
          className={styles.option}
          onClick={() => {
            onChange(option.key, option.value);
            setState(option.key);
          }}
        >
          <input type="radio" checked={option.key === nowValue} />
          {option.key}
        </div>
      ))}
    </Flex>
  );
}
