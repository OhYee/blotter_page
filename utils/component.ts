import { PropsWithChildren, CSSProperties, ReactNode } from 'react';

type DefaultProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  onClick?: () => void;
};

export declare type ComponentProps<T> = Omit<DefaultProps, keyof T> & T;

export function concat(...classList: string[]) {
  return classList.filter((s) => !!s).join(' ');
}

