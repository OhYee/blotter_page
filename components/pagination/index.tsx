import React from 'react';

import { Flex } from '@/components/container';
import Button from '@/components/button';
import { Dots, Pre, Next } from '@/components/svg';

import { ComponentProps } from '@/utils/component';

function defaultRender(
  current: number,
  pageNumber: number,
  page: number,
  callback: (page: number) => void,
) {
  switch (page) {
    case -2: {
      return (
        <Button
          size="small"
          neumorphism
          disabled={current - 1 < 1}
          onClick={() => callback(current - 1)}
          icon={<Pre />}
        />
      );
    }
    case -3: {
      return (
        <Button
          size="small"
          neumorphism
          disabled={current + 1 > pageNumber}
          onClick={() => callback(current + 1)}
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
          size="small"
          neumorphism
          disabled={current === page}
          clicked={current === page}
          onClick={() => callback(page)}
        >
          {page}
        </Button>
      );
    }
  }
}
export declare type PaginationProps = ComponentProps<{
  page?: number;
  size?: number;
  total?: number;
  range?: number;
  callback?: (page: number) => void;
  render?: (
    current: number,
    pageNumber: number,
    page: number,
    callback: (page: number) => void,
  ) => React.ReactNode; // -2 prepage -3 next page -1 dots
}>;

export default function Pagination(props: PaginationProps) {
  const {
    page = 1,
    size = 10,
    total = 0,
    range = 3,
    render = defaultRender,
    callback = () => {},
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

  console.log(pages);

  return (
    <Flex mainAxis="flex-end">
      {pages.map((p) => (
        <Flex.Item key={p}>{render(page, pageNumber, p, callback)}</Flex.Item>
      ))}
    </Flex>
  );
}
