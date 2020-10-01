import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import Popover, { PopoverProps } from '../popover';

import styles from './tooltip.module.scss';
import textStyles from '@/styles/text.module.scss';

export declare type TooltipProps = ComponentProps<{
  title?: string;
  ellipsis?: boolean;
}> &
  PopoverProps;

export default function Tooltip(props: TooltipProps) {
  const {
    ellipsis = false,
    className,
    style,
    children,
    title = children.toString(),
    ...restProps
  } = props;
  var classList = [className];
  if (ellipsis) classList.push(textStyles.ellipsis);

  return (
    <Popover
      component={title}
      className={concat(...classList)}
      style={style}
      popoverClass={styles.tooltip}
      {...restProps}
    >
      {children}
    </Popover>
  );
}
