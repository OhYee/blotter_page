import { PropsWithChildren, CSSProperties, ReactNode } from 'react';

export declare type ComponentProps<T> = PropsWithChildren<
  {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  } & T
>;

export function concat(...classList: string[]) {
  return classList.filter((s) => !!s).join(' ');
}
