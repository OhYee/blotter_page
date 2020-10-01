import React from 'react';

import { Left } from '@/components/svg';

import { concat, ComponentProps } from '@/utils/component';

import styles from './collapse.module.scss';

export declare type CollapseProps = ComponentProps<{
  title?: string;
  defaultOpen?: boolean;
  open?: boolean;
  status?: boolean;
  onChange?: (status: boolean) => void;
}>;

export default function Collapse(props: CollapseProps) {
  const {
    title,
    defaultOpen = false,
    open,
    onChange = () => {},
    className,
    style,
    children,
  } = props;
  const [state, setState] = React.useState(defaultOpen);
  const controlled = open === true || open === false;
  const nowStatus = controlled ? open : state;

  return (
    <div
      className={concat(styles.collspase, className, ...(nowStatus ? [styles.open] : []))}
      style={style}
    >
      <div
        className={styles.title}
        onClick={() => (controlled ? onChange(!open) : setState(!state))}
      >
        <span className={styles.prefix}>
          <Left />
        </span>
        {title}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
