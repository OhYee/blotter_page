import React from 'react';

import { concat, ComponentProps } from '@/utils/component';
import { Flex } from '@/components/container';
import { Option, TransfromOptions } from '../';

import styles from './radio.less';

export declare type RadioProps<T> = ComponentProps<{
  direction?: 'TB' | 'LR';
  options: Option<T>[];
  defaultKey?: string;
  selectedKey?: string;
  onChange?: (key: string, value: T | string) => void;
  setKeyCallback?: (callback: (key: string) => void) => void;
  getKeyCallback?: (callback: () => Option<T>) => void;
}>;

export default function Radio<T>(props: RadioProps<T>) {
  const {
    direction = 'LR',
    options,
    defaultKey = '',
    selectedKey,
    onChange = () => {},
    setKeyCallback = () => {},
    getKeyCallback = () => {},
    className,
    style,
    id,
  } = props;
  const opts = React.useMemo(() => TransfromOptions(options), [options]);
  const [state, setState] = React.useState(defaultKey);
  const nowKey = typeof selectedKey === 'undefined' ? state : selectedKey;
  React.useEffect(() => {
    setKeyCallback(setState);
  }, [setKeyCallback, setState]);
  React.useEffect(() => {
    getKeyCallback(() => options[nowKey]);
  }, [getKeyCallback, nowKey, options]);
  return (
    <Flex
      direction={direction}
      mainAxis="flex-start"
      subSize="middle"
      id={id}
      className={concat(className, styles.radio)}
      style={style}
    >
      {opts.map((option) => (
        <div
          key={option.key}
          className={styles.option}
          onClick={() => {
            onChange(option.key, option.value);
            setState(option.key);
          }}
        >
          <input type="radio" checked={option.key === nowKey} />
          {option.key}
        </div>
      ))}
    </Flex>
  );
}
