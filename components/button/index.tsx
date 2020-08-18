import React from 'react';

import styles from './button.less';

export declare type ButtonProps = {
  size?: 'small' | 'middle' | 'large' | number;

  icon?: React.ReactNode;
  circle?: boolean;
  primary?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function Button(props: React.PropsWithChildren<ButtonProps>) {
  const {
    size = 'middle',
    icon,
    circle = false,
    primary = false,
    onClick,
    style = {},
    className,
    children,
  } = props;
  var classList = [styles.button, className];
  if (typeof size === 'string') {
    classList.push(styles[size]);
  } else {
    style.fontSize = `${size}em`;
    style.width = `${size + 1}em`;
    style.height = `${size + 1}em`;
  }
  if (!!icon && !primary) classList.push(styles.icon);
  if (circle) classList.push(styles.circle);
  if (primary) classList.push(styles.primary);

  return (
    <button className={classList.filter((s) => s != '').join(' ')} style={style} onClick={onClick}>
      {!!icon ? icon : children}
    </button>
  );
}
