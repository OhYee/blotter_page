import React from 'react';

import { Flex } from '@/components/container';
import { Body } from '@/components/popover';
import { Close } from '@/components/svg';

import { concat, ComponentProps } from '@/utils/component';

import styles from './notification.module.scss';
import shadowStyles from '@/styles/shadow.module.scss';

export declare type NotificationProps = ComponentProps<{
  alertType?: 'info' | 'error' | 'warning' | 'success';
  icon?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  onClose?: () => void;
  shadow?: boolean;
}>;

function Notification(props: NotificationProps) {
  const {
    alertType = 'info',
    icon,
    title,
    content,
    className,
    onClose,
    shadow = false,
    ...restProps
  } = props;
  return (
    <Flex
      {...restProps}
      className={concat(
        styles.notification,
        styles[alertType],
        className,
        shadow ? shadowStyles.shadow : '',
      )}
      wrap={false}
      subAxis="flex-start"
    >
      {icon && (
        <Flex.Item style={{ flex: '0 0 5em' }}>
          <div className={styles.icon}>{icon}</div>
        </Flex.Item>
      )}
      <Flex.Item style={{ flex: '1 1 auto' }}>
        <Flex direction="TB" fullWidth>
          {title && (
            <div className={styles.title}>
              {title} {!!onClose && <Close style={{ float: 'right' }} onClick={onClose} />}
            </div>
          )}
          {content && <div className={styles.content}>{content}</div>}
        </Flex>
      </Flex.Item>
    </Flex>
  );
}

// 右上角的提醒，当存在多个提醒时，需要对应排序，因此需要向页面内插入一个元素。为了后续重用，该部分不需要 remove
type MessageProps = NotificationProps & { autoClose?: number };

type MessagePropsWithID = MessageProps & { _id: number };
var id = 0;
var messages: MessagePropsWithID[];
var update: (children: React.ReactNode) => void;

function addMessage(props: MessageProps) {
  if (id === 0) {
    update = Body.Insert(() => <div></div>).update;
    messages = [];
  }
  id += 1;

  const np: MessagePropsWithID = {
    autoClose: 5000,
    shadow: true,
    ...props,
    onClose: () => {
      removeMessage(np._id);
      if (!!props.onClose) props.onClose();
    },
    _id: id,
  };
  messages.push(np);
  update(<Messages messages={messages} />);
  if (np.autoClose > 0) {
    setTimeout(() => {
      removeMessage(np._id);
    }, np.autoClose);
  }
}

function removeMessage(id: number) {
  messages = messages.filter((p) => p._id !== id);
  update(<Messages messages={messages} />);
}

function Messages(props: { messages: MessagePropsWithID[] }) {
  const { messages } = props;
  return (
    <Flex
      direction="TB"
      style={{ position: 'fixed', top: 20, right: 20, width: '300px', zIndex: 2 }}
      itemStyle={{ width: '100%' }}
    >
      {messages.map((p, i) => {
        const { autoClose, _id, ...restProps } = p;
        return <Notification key={i} {...restProps} />;
      })}
    </Flex>
  );
}

export function message(props: MessageProps) {
  addMessage(props);
}

export default Object.assign(Notification, { message });
