import React from 'react';

import { Edit } from '@/components/svg';

import { concat, ComponentProps } from '@/utils/component';
import { waitUntil } from '@/utils/debounce';
import randomString from '@/utils/random';

import { BasePartProps, InputPartProps, TransformPartProps } from '../input';

import shadowStyles from '@/styles/shadow.less';
import styles from './textarea.less';

export declare type Option<T> = {
  key?: string;
  value?: T;
};

export declare type TextAreaProps = Omit<
  Combine<
    ComponentProps<
      {
        rows?: number;
      } & BasePartProps &
        InputPartProps &
        TransformPartProps
    >,
    React.HTMLAttributes<HTMLTextAreaElement>
  >,
  'prefix' | 'suffix'
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
    debounce = 200,

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

    ...restProps
  } = props;
  const ref = React.useRef<HTMLTextAreaElement>();
  const key = React.useMemo(() => randomString(), []);

  React.useEffect(() => getValueCallback(() => (!!ref ? ref.current.value : '')), [
    ref,
    getValueCallback,
  ]);
  /*
     TODO: 尽管原则上 setValueCallback 不需要判断
     但是在 ctypto.tsx 页面切换 UInt8Array 输入框的单选框时，在成功 setValue 后会奇怪地调用一次 setValue(undefined)，导致出错
     因此这里按道理应该进行一次判断，但是目前还未曾得知为什么会有一次错误的调用
     */ React.useEffect(
    () =>
      setValueCallback((value: string) => {
        if (!!ref && !!ref.current && typeof value === 'string') ref.current.value = value;
      }),
    [ref, setValueCallback],
  );

  const [showInput, setShowInput] = React.useState(false);
  React.useEffect(() => {
    if (!!ref && !!ref.current && typeof value === 'string') ref.current.value = value;
  }, [ref, value, showInput]);

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const cb = () => onChange(value);
      if (debounce > 0) waitUntil(key, cb, debounce);
      else cb();
    },
    [debounce, onChange],
  );

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
                {...restProps}
                ref={ref}
                defaultValue={defaultValue}
                onChange={onInputChange}
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
