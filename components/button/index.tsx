import React from 'react';

import { Loading } from '@/components/svg';
import { concat, ComponentProps } from '@/utils/component';

import styles from './button.module.scss';
import shadowStyles from '@/styles/shadow.module.scss';

export declare type ButtonProps = Combine<
  ComponentProps<{
    size?: 'small' | 'middle' | 'large' | number;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    icon?: React.ReactNode;
    circle?: boolean;
    primary?: boolean;
    shadow?: boolean;
    neumorphism?: boolean;
    danger?: boolean;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    clicked?: boolean;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
  }>,
  React.DOMAttributes<HTMLButtonElement | HTMLAnchorElement>
>;

function parseProps(props: ButtonProps) {
  const {
    size = 'middle',
    icon,
    prefix,
    suffix,
    circle = false,
    primary = false,
    shadow = false,
    neumorphism = false,
    disabled = false,
    clicked = false,
    loading = false,
    onClick,
    style = {},
    className,
    children,
    danger = false,
    ...restProps
  } = props;
  const classList = React.useMemo(() => {
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
    if (shadow) classList.push(shadowStyles.shadow);
    if (neumorphism && !clicked) classList.push(shadowStyles.neumorphism);
    if (neumorphism && clicked) classList.push(shadowStyles.neumorphism_inset);
    if (loading || disabled) classList.push('disabled');
    if ((shadow || neumorphism) && !disabled) classList.push(shadowStyles.clickable);
    if (danger) classList.push(styles.danger);
    return classList;
  }, [
    className,
    size,
    icon,
    circle,
    primary,
    shadow,
    neumorphism,
    clicked,
    loading,
    disabled,
    shadow,
    danger,
  ]);

  return {
    classList,
    style,
    onClick: disabled ? () => {} : onClick,
    icon: loading && !!icon ? <Loading /> : icon,
    prefix,
    suffix: loading && !icon ? <Loading /> : suffix,
    children,
    disabled: loading || disabled,
    ...restProps,
  };
}

function Button(props: ButtonProps, ref) {
  const {
    classList,
    style,
    onClick,
    icon,
    children,
    disabled,
    prefix,
    suffix,
    ...restProps
  } = parseProps(props);
  return (
    <button
      {...restProps}
      className={concat(...classList)}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {!!prefix ? <span className={styles.prefix}>{prefix}</span> : null}
      {!!icon ? icon : children}
      {!!suffix ? <span className={styles.suffix}>{suffix}</span> : null}
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
  const {
    classList,
    style,
    onClick,
    icon,
    children,
    disabled,
    prefix,
    suffix,
    ...restProps
  } = parseProps(props);
  const { href, target, rel, linkType } = props;
  return (
    <a
      {...restProps}
      ref={ref}
      className={concat(...classList)}
      style={{ ...style, ...(disabled ? { pointerEvents: 'none', opacity: 0.5 } : {}) }}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      type={linkType}
    >
      {!!prefix ? <span className={styles.prefix}>{prefix}</span> : null}
      {!!icon ? icon : children}
      {!!suffix ? <span className={styles.suffix}>{suffix}</span> : null}
    </a>
  );
}

import ButtonGroup from './group';
export { ButtonGroup };

// Next.js 的 Link  组件需要子组件可以接收 ref（用于修i该子元素的 href）
export default Object.assign(React.forwardRef(Button), { Group: ButtonGroup });
export const A = React.forwardRef(ALink);
