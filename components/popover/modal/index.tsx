import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import Body from '../body';
import Card from '@/components/card';
import { Close } from '@/components/svg';
import Button from '@/components/button';

import styles from './modal.less';

export declare type ModalProps = ComponentProps<{ show?: boolean; close?: boolean | (() => void) }>;

const ModalContent = (
  props: ModalProps & { update: (child: React.ReactNode) => void; remove: () => void },
) => {
  const { show = true, className, style, children, update, remove, close = true } = props;
  return (
    <div style={{ visibility: show ? 'visible' : 'hidden' }}>
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
          <div style={{ clear: 'both' }}>
            {typeof children === 'function' ? children({ update, remove }) : children}
          </div>
        </Card>
      </div>
      <div className={styles.dimmed} onClick={remove}></div>
    </div>
  );
};

const Modal = (props: ModalProps) => {
  return (
    <Body>
      {({ update, remove }) => (
        <ModalContent
          {...props}
          close={!!props.close}
          update={update}
          remove={typeof props.close === 'function' ? props.close : () => {}}
        />
      )}
    </Body>
  );
};

const info = (props: ModalProps) => {
  console.log('info', props);
  const { update, remove } = Body.Insert(({ update, remove }) => (
    <ModalContent {...props} update={update} remove={remove} />
  ));
  return { update, remove };
};

export default Object.assign(Modal, { info });
