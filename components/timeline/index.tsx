import React, { Fragment } from 'react';

import { Flex } from '@/components/container';

import { concat, ComponentProps } from '@/utils/component';

import styles from './timeline.module.scss';

export default function Timeline(
  props: ComponentProps<{
    direction?: 'LR' | 'TB';
    data: { time: React.ReactNode; name: React.ReactNode }[];
  }>,
) {
  const { direction = 'TB', data, className, style, id } = props;
  const subDirection = direction == 'TB' ? 'LR' : 'TB';
  return (
    <div id={id} className={concat(styles.timeline, className)} style={style}>
      {data.map((item, index) => (
        // <div >
        <React.Fragment key={index}>
          <div className={styles.time}>{item.time}</div>
          <div className={styles.circle}></div>
          <div className={styles.line}></div>
          <div className={styles.name}>{item.name}</div>
        </React.Fragment>
        // </div>
      ))}
    </div>
  );
}
