import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import shadowStyles from '@/styles/shadow.less';
import styles from './textarea.less';

export declare type Option<T> = {
  key?: string;
  value?: T;
};

export declare type TextAreaProps = ComponentProps<{
  label?: string;
  lablePlacement?: 'left' | 'top';
  size?: 'small' | 'middle' | 'large';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  onEnterPressed?: () => void;
  onBlur?: () => void;
  hint?: React.ReactNode;

  // textarea
  value?: string;
  defaultValue?: string;
  editable?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  getValueCallback?: (callback: () => string) => void;
  setValueCallback?: (callback: (value: string) => void) => void;
  autoFocus?: boolean;
  rows?: number;
}>;

export default function TextArea(props: TextAreaProps) {
  const {
    defaultValue,
    value,
    placeholder = '',
    size = 'middle',
    label = '',
    autoFocus = false,
    lablePlacement = 'left',
    rows,

    disabled = false,
    editable = true,
    onChange = () => {},
    getValueCallback = () => {},
    setValueCallback = () => {},
    onBlur,
    hint,
    style,
    className,
  } = props;
  const ref = React.useRef<HTMLTextAreaElement>();
  React.useEffect(() => getValueCallback(() => ref.current.value), [ref, getValueCallback]);
  React.useEffect(() => setValueCallback((value: string) => (ref.current.value = value)), [
    ref,
    setValueCallback,
  ]);

  return (
    <div className={concat(styles.wrapper, className, styles[size])} style={style} onBlur={onBlur}>
      {!!label ? <div className={styles.label}>{label}</div> : null}
      <div className={concat(styles.inner, ...(disabled ? ['disabled'] : []))}>
        <div className={concat(styles.textarea, shadowStyles.neumorphism_inset)}>
          <textarea
            ref={ref}
            defaultValue={!!value ? undefined : defaultValue}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            readOnly={!editable}
            autoFocus={autoFocus}
            rows={rows}
          />
        </div>
        {!!hint ? <div className={styles.hint}>{hint}</div> : null}
      </div>
    </div>
  );
}
