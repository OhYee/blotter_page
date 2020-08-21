import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import styles from './button.less';
import shadowStyles from '@/styles/shadow.less';

export declare type ButtonProps = ComponentProps<{
  size?: 'small' | 'middle' | 'large' | number;

  icon?: React.ReactNode;
  circle?: boolean;
  primary?: boolean;
  shadow?: boolean;
  neumorphism?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
}>;

function parseProps(props: ButtonProps) {
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
  return { classList, style, onClick, icon, children };
}

function Button(props: ButtonProps, ref) {
  const { classList, style, onClick, icon, children } = parseProps(props);
  return (
    <button className={concat(...classList)} style={style} onClick={onClick}>
      {!!icon ? icon : children}
    </button>
  );
}

export declare type ALinkProps = ButtonProps & {
  href?: string;
  target?: string;
  rel?: string;
  linkType?: string;
};
function ALink(props: ALinkProps, ref: React.LegacyRef<HTMLAnchorElement>) {
  const { classList, style, onClick, icon, children } = parseProps(props);
  const { href, target, rel, linkType } = props;
  return (
    <a
      ref={ref}
      className={concat(...classList)}
      style={style}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      type={linkType}
    >
      {!!icon ? icon : children}
    </a>
  );
}

// Next.js 的 Link  组件需要子组件可以接收 ref（用于修i该子元素的 href）
export default React.forwardRef(Button);
export const A = React.forwardRef(ALink);
