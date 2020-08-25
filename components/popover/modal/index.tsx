import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import Body from '../body';
import Card from '@/components/card';
import { Close } from '@/components/svg';
import Button from '@/components/button';

import styles from './modal.less';

export declare type ModalProps = ComponentProps<{ show?: boolean; close?: boolean }>;

const Modal = (props: ModalProps) => {
  const { show = true, className, style, children } = props;
  return (
    <Body>
      <div className={concat(className, styles.modal)} style={style}>
        {children}
      </div>
    </Body>
  );
};

const info = (props: ModalProps) => {
  const { show = true, className, style, children, close = true } = props;
  const { update, remove } = Body.Insert(({ update, remove }) => (
    <div>
      <div className={concat(className, styles.modal)} style={style}>
        <Card style={{ background: 'var(--background)' }}>
          {close ? (
            <Button
              icon={<Close />}
              style={{
                position: 'relative',
                top: -15,
                right: -15,
                marginBottom: -15,
                float: 'right',
              }}
              onClick={remove}
            />
          ) : null}
          <div style={{ clear: 'both' }}>{children}</div>
        </Card>
      </div>
      <div className={styles.dimmed} onClick={remove}></div>
    </div>
  ));
  return { update, remove };
};

export default Object.assign(Modal, { info });
