import React from 'react';

import { Flex } from '@/components/container';

import { concat } from '@/utils/component';

import styles from './card.less';
import shadowStyles from '@/styles/shadow.less';
import { CardProps } from 'antd/lib/card';

export default function Card(
  props: React.PropsWithChildren<{
    shadow?: boolean;
    neumorphism?: boolean;
    neumorphismInset?: boolean;
    cover?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }>,
) {
  const {
    shadow = false,
    neumorphism = false,
    neumorphismInset = false,
    cover,
    className,
    style,
    children,
  } = props;
  var classList = [styles.card, className];
  if (shadow) classList.push(shadowStyles.shadow);
  if (neumorphism) classList.push(shadowStyles.neumorphism);
  if (neumorphismInset) classList.push(shadowStyles.neumorphism_inset);

  return (
    <div className={concat(...classList)} style={style}>
      <Flex direction="TB" fullWidth>
        {cover}
        <div className={styles.main}>{children}</div>
      </Flex>
    </div>
  );
}
