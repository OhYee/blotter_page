import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import Body from '../body';
import Card from '@/components/card';
import { Close } from '@/components/svg';
import Button from '@/components/button';

import styles from './modal.less';

export declare type ModalProps = ComponentProps<{ show?: boolean; onClose?: () => void }>;

const ModalContent = (props: ModalProps) => {
  const { onClose, className, style, children } = props;
  return (
    <div>
      <div className={concat(className, styles.modal)} style={style}>
        <Card style={{ background: 'var(--background)' }}>
          {!!onClose ? (
            <Button
              icon={<Close />}
              style={{
                position: 'relative',
                top: -15,
                right: -15,
                marginBottom: -15,
                float: 'right',
              }}
              onClick={() => onClose()}
            />
          ) : null}
          <div style={{ clear: 'both' }}>{children}</div>
        </Card>
      </div>
      <div className={styles.dimmed} onClick={() => onClose()}></div>
    </div>
  );
};

const Modal = (props: ModalProps) => {
  const { show = true } = props;
  return show ? (
    <Body>
      <ModalContent {...props} />
    </Body>
  ) : null;
};

const info = (props: ModalProps) => {
  const { update, remove } = Body.Insert(({ update, remove }) => (
    <ModalContent {...props} onClose={remove} />
  ));
  return { update, remove };
};

export default Object.assign(Modal, { info });
