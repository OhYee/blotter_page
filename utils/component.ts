import { PropsWithChildren, CSSProperties } from 'react';

export declare type ComponentProps<T> = PropsWithChildren<
  {
    className?: string;
    style?: CSSProperties;
  } & T
>;

export function concat(...classList: string[]) {
  return classList.filter((s) => !!s).join(' ');
}
