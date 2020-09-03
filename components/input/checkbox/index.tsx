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
  getValueCallback?: (callback: () => boolean) => void;
  setValueCallback?: (callback: (checked: boolean) => void) => void;
  hint?: React.ReactNode;
}>;
export default function CheckBox(props: CheckBoxProps) {
  const [checked, setChecked] = React.useState(false);
  const {
    value,
    switchStyle = false,
    checkText,
    uncheckText,
    onChange = typeof value === 'undefined' ? (v) => setChecked(v) : () => {},
    children,
    getValueCallback = () => {},
    setValueCallback = () => {},
    hint,
  } = props;
  const isChecked = !!value || checked;
  React.useEffect(() => getValueCallback(() => isChecked), [getValueCallback]);
  React.useEffect(() => setValueCallback(setChecked), [setValueCallback]);
  return (
    <div>
      <div
        className={concat(
          switchStyle ? styles.switch : styles.checkbox,
          isChecked ? styles.checked : '',
        )}
        onClick={() => onChange(!isChecked)}
      >
        <div className={styles.icon}>{isChecked && !switchStyle ? <Right /> : null}</div>
        <div className={styles.text}>
          {isChecked && !!checkText
            ? checkText
            : !isChecked && !!uncheckText
            ? uncheckText
            : children}
        </div>
      </div>
      {!!hint ? <div className={styles.hint}>{hint}</div> : null}
    </div>
  );
}
