import React from 'react';

import { Flex } from '@/components/container';

import { concat, ComponentProps } from '@/utils/component';

import styles from './card.module.scss';
import shadowStyles from '@/styles/shadow.module.scss';

export declare type CardProps = ComponentProps<{
  shadow?: boolean;
  neumorphism?: boolean;
  neumorphismInset?: boolean;
  cover?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  mainStyle?: React.CSSProperties;
}>;

function Card(props: CardProps, ref?: React.LegacyRef<HTMLDivElement>) {
  const {
    shadow = false,
    neumorphism = false,
    neumorphismInset = false,
    cover,
    className,
    style,
    children,
    mainStyle,
    ...restProps
  } = props;
  var classList = [styles.card, className];
  if (shadow) classList.push(shadowStyles.shadow);
  if (neumorphism) classList.push(shadowStyles.neumorphism);
  if (neumorphismInset) classList.push(shadowStyles.neumorphism_inset);

  return (
    <div {...restProps} ref={ref} className={concat(...classList)} style={style}>
      <Flex direction="TB" fullWidth>
        {cover}
        <div className={styles.main} style={mainStyle}>
          {children}
        </div>
      </Flex>
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, CardProps>(Card);
