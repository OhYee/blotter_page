import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import Button from '@/components/button';
import { Flex } from '@/components/container';
import Input, { BasePartProps, InputPartProps } from '../input';
import { Plus, Minus } from '@/components/svg';

type LocalInputNumberProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  getValueCallback?: (callback: () => number) => void;
  setValueCallback?: (callback: (value: number) => void) => void;
  max?: number;
  min?: number;
};

export declare type InputNumberProps = ComponentProps<
  Omit<BasePartProps & InputPartProps, keyof LocalInputNumberProps> & LocalInputNumberProps
>;

export default function InputNumber(props: InputNumberProps) {
  const {
    value,
    defaultValue = 0,
    onChange,
    getValueCallback = () => {},
    setValueCallback = () => {},
    max,
    min,
    ...restProps
  } = props;
  const [state, setState] = React.useState(defaultValue);
  const nowValue = typeof value === 'undefined' ? state : value;
  const onInputChange = React.useCallback(
    (value: string) => {
      var num = parseFloat(value);
      if (isNaN(num)) num = 0;
      if (typeof max !== 'undefined' && num > max) num = max;
      if (typeof min !== 'undefined' && num < min) num = min;
      setState(num);
      if (!!onChange) onChange(num);
    },
    [max, min, setState, onChange],
  );
  React.useEffect(() => {
    setValueCallback((value: number) => {
      setState(value);
    });
  }, [setState, setValueCallback]);
  React.useEffect(() => {
    getValueCallback(() => nowValue);
  }, [nowValue, getValueCallback]);

  return (
    <Input
      {...restProps}
      value={nowValue.toString()}
      onChange={onInputChange}
      prefix={<Minus onClick={() => onInputChange((nowValue - 1).toString())} />}
      suffix={<Plus onClick={() => onInputChange((nowValue + 1).toString())} />}
    />
  );
}
