import React from 'react';

import { Edit } from '@/components/svg';

import { concat, ComponentProps } from '@/utils/component';

import { BasePartProps, InputPartProps, TransformPartProps } from '../input';

import shadowStyles from '@/styles/shadow.less';
import styles from './textarea.less';

export declare type Option<T> = {
  key?: string;
  value?: T;
};

export declare type TextAreaProps = ComponentProps<
  {
    rows?: number;
  } & BasePartProps &
    InputPartProps &
    TransformPartProps
>;

export default function TextArea(props: TextAreaProps) {
  const {
    defaultValue,
    value,
    placeholder = '',
    size = 'middle',
    label = '',
    autoFocus = false,
    lablePlacement = 'top',
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
    transform = false,
  } = props;
  const ref = React.useRef<HTMLTextAreaElement>();
  React.useEffect(() => getValueCallback(() => ref.current.value), [ref, getValueCallback]);
  React.useEffect(() => setValueCallback((value: string) => (ref.current.value = value)), [
    ref,
    setValueCallback,
  ]);

  const [showInput, setShowInput] = React.useState(false);
  return (
    <div
      className={concat(styles.wrapper, className, styles[size], styles[lablePlacement])}
      style={style}
      onBlur={() => {
        if (transform) setShowInput(false);
        if (!!onBlur) onBlur();
      }}
      onClick={() => {
        if (transform) setShowInput(true);
      }}
    >
      {!transform || (transform && showInput) ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : (
        <div className={styles.transform}>
          <span className={styles.transform_value}>{value}</span>
          <span className={styles.transform_icon}>
            <Edit />
          </span>
        </div>
      )}
    </div>
  );
}
