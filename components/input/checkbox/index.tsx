import React from 'react';

import { Right } from '@/components/svg';

import { concat, ComponentProps } from '@/utils/component';

import styles from './checkbox.less';

export declare type CheckBoxProps = ComponentProps<{
  value?: boolean;
  switchStyle?: boolean;
  checkText?: React.ReactNode;
  uncheckText?: React.ReactNode;
  onChange?: (value: boolean) => void;
}>;
export default function CheckBox(props: CheckBoxProps) {
  const {
    value = false,
    switchStyle = false,
    checkText,
    uncheckText,
    onChange = () => {},
    children,
  } = props;
  return (
    <div
      className={concat(
        switchStyle ? styles.switch : styles.checkbox,
        ...(value ? [styles.checked] : []),
      )}
      onClick={() => onChange(!value)}
    >
      <div className={styles.icon}>{value && !switchStyle ? <Right /> : null}</div>
      <div className={styles.text}>
        {value && !!checkText ? checkText : !value && !!uncheckText ? uncheckText : children}
      </div>
    </div>
  );
}
