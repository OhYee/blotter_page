import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import styles from './drawer.module.scss';

export declare type DrawerProps = ComponentProps<{
  //   getContainer: () => HTMLElement;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  show: boolean;
  onClose?: () => void;
  containerStyle?: React.CSSProperties;
}>;

export default function Drawer(props: DrawerProps) {
  const {
    // getContainer = () => document,
    placement = 'left',
    show,
    onClose = () => {},
    children,
    className,
    style,
    id,
    containerStyle,
  } = props;
  return (
    <div className={concat(styles.drawer, show ? styles.show : '')} style={containerStyle}>
      <div className={styles.dimmend} onClick={onClose}></div>
      <div id={id} className={concat(styles.inner, styles[placement], className)} style={style}>
        {children}
      </div>
    </div>
  );
}
