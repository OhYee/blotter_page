import React from 'react';
import styles from './avatar.less';

export default function Avatar(
  props: React.PropsWithChildren<{
    src?: string;
    className?: string;
    style?: React.CSSProperties;
  }>,
) {
  const { src, className, style, children } = props;
  return (
    <div className={[className, styles.avatar].join(' ')} style={style}>
      {!!!children && !!src ? <img src={src} /> : children}
    </div>
  );
}
