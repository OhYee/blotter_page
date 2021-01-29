import React from 'react';

import { Flex } from '@/components/container';
import Button from '@/components/button';
import { Dots, Pre, Next } from '@/components/svg';
import Input from '@/components/input';

import { ComponentProps } from '@/utils/component';

function defaultRender(
  current: number,
  pageNumber: number,
  size: number,
  page: number,
  onChange: (page: number, size: number) => void,
  disabled: boolean,
) {
  switch (page) {
    case -2: {
      return (
        <Button
          disabled={disabled || current - 1 < 1}
          onClick={() => onChange(current - 1, size)}
          icon={<Pre />}
        />
      );
    }
    case -3: {
      return (
        <Button
          disabled={disabled || current + 1 > pageNumber}
          onClick={() => onChange(current + 1, size)}
          icon={<Next />}
        />
      );
    }
    case -1: {
      return <Dots />;
    }
    default: {
      return (
        <Button
          disabled={disabled || current === page}
          clicked={current === page}
          onClick={() => onChange(page, size)}
        >
          {page}
        </Button>
      );
    }
  }
}

export declare type PaginationPropsRenderFunction = (
  current: number,
  pageNumber: number,
  size: number,
  page: number,
  onChange: (page: number, size: number) => void,
  disabled: boolean,
  extend?: any,
) => React.ReactNode; // -2 prepage -3 next page -1 dots

export declare type PaginationProps = ComponentProps<{
  page?: number;
  size?: number;
  total?: number;
  range?: number;
  sizeSelect?: number[];
  onChange?: (page: number, size: number) => void;
  render?: PaginationPropsRenderFunction;
  disabled?: boolean;
  extend?: any;
}>;

export default function Pagination(props: PaginationProps) {
  const {
    page = 1,
    size = 10,
    total = 0,
    range = 3,
    sizeSelect = [],
    render = defaultRender,
    onChange = () => {},
    className,
    style,
    disabled = false,
    extend,
  } = props;
  const pageNumber = React.useMemo(() => Math.ceil(total / size), [total, size]);

  var pages: number[] = Array(range * 2 + 1)
    .fill(0)
    .map((_, idx) => idx + page - range)
    .filter((p) => p >= 1 && p <= pageNumber);
  if (pages.length > 0) {
    if (pages[0] === 2) pages.unshift(1);
    else if (pages[0] > 2) pages.unshift(1, -1);
    if (pages[pages.length - 1] === pageNumber - 1) pages.push(pageNumber);
    else if (pages[pages.length - 1] < pageNumber - 1) pages.push(-1, pageNumber);
  }
  pages.unshift(-2);
  pages.push(-3);

  var items = pages.map((p) => (
    <Flex.Item key={p}>{render(page, pageNumber, size, p, onChange, disabled, extend)}</Flex.Item>
  ));
  if (!!sizeSelect && sizeSelect.length > 1)
    items.push(
      <Input<number>
        key="size"
        editable={false}
        value={`${size}个/页`}
        options={sizeSelect.map((s) => ({ key: `${s}个/页`, value: s }))}
        onSelect={(_, v: number) => onChange(page, v)}
      />,
    );

  return (
    <Flex mainAxis="flex-end" subSize="middle" className={className} style={style}>
      {items}
    </Flex>
  );
}
