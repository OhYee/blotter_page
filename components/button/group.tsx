import React from 'react';

import { Flex } from '@/components/container';

import Button, { ButtonProps } from '.';

export default function ButtonGroup<T>(props: {
  direction?: 'TB' | 'LR';
  selected: T;
  buttons: { key: string; value: T }[];
  onClick?: (key: string, value: T) => void;
  buttonProps?: ButtonProps;
}) {
  const { direction = 'LR', buttons, buttonProps, selected, onClick = () => {} } = props;

  return (
    <Flex direction={direction} mainSize="small">
      {buttons.map((item, idx) => (
        <Button
          key={idx}
          neumorphism
          size="small"
          {...buttonProps}
          clicked={item.value == selected}
          onClick={() => onClick(item.key, item.value)}
        >
          {item.key}
        </Button>
      ))}
    </Flex>
  );
}
