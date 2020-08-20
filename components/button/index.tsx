import React from 'react';

import { concat } from '@/utils/component';

import styles from './button.less';
import shadowStyles from '@/styles/shadow.less';

export declare type ButtonProps = {
  size?: 'small' | 'middle' | 'large' | number;

  icon?: React.ReactNode;
  circle?: boolean;
  primary?: boolean;
  shadow?: boolean;
  neumorphism?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function Button(props: React.PropsWithChildren<ButtonProps>, ref) {
  const {
    size = 'middle',
    icon,
    circle = false,
    primary = false,
    shadow = false,
    neumorphism = false,
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
  if (!!icon) classList.push(styles.icon);
  if (circle) classList.push(styles.circle);
  if (primary) classList.push(styles.primary);
  if (shadow) classList.push(shadowStyles.shadow, shadowStyles.clickable);
  if (neumorphism) classList.push(shadowStyles.neumorphism, shadowStyles.clickable);

  return (
    <button className={concat(...classList)} style={style} onClick={onClick}>
      {!!icon ? icon : children}
    </button>
  );
}

// Next.js 的 Link  组件需要子组件可以接收 ref（用于修i该子元素的 href）
export default React.forwardRef(Button);
