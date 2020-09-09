import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import shadowStyles from '@/styles/shadow.less';
import styles from './input.less';

export declare type Option<T = any> =
  | {
      key: string;
      value: T | string;
    }
  | T;

export declare type StrictOption<T = any> = {
  key?: string;
  value?: T | string;
};

export function TransfromOptions<T = any>(options: Option<T>[]): StrictOption<T>[] {
  return options.map((opt) => (typeof opt === 'string' ? { key: opt, value: opt } : opt));
}

export declare type BasePartProps = {
  label?: string;
  lablePlacement?: 'left' | 'top';
  size?: 'small' | 'middle' | 'large';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  onEnterPressed?: () => void;
  onBlur?: () => void;
  hint?: React.ReactNode;
};

export declare type InputPartProps = {
  // Input
  value?: string;
  defaultValue?: string;
  editable?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  getValueCallback?: (callback: () => string) => void;
  setValueCallback?: (callback: (value: string) => void) => void;
  type?: string;
  autoFocus?: boolean;
};

export declare type SelectPartProps<SelectType = any> = {
  // Select
  selectTrigger?: ('click' | 'hover')[];
  options?: Option<SelectType>[];
  onSelect?: (key: string, value: SelectType | string) => void;
  getSelectShow?: (callback: () => boolean) => void;
  setSelectShow?: (callback: (show: boolean) => void) => void;
};

export declare type InputProps<SelectType = any> = ComponentProps<
  BasePartProps & InputPartProps & SelectPartProps<SelectType>
>;

export default function Input<SelectType>(props: InputProps<SelectType>) {
  const {
    prefix,
    suffix,
    defaultValue,
    value,
    placeholder = '',
    size = 'middle',
    label = '',
    autoFocus = false,
    lablePlacement = 'left',
    options = [],
    selectTrigger = ['click'],
    disabled = false,
    editable = true,
    onChange = () => {},
    onSelect = () => {},
    getValueCallback = () => {},
    setValueCallback = () => {},
    getSelectShow = () => {},
    setSelectShow = () => {},
    onEnterPressed = () => {},
    onBlur,
    hint,
    type,
    style,
    className,
  } = props;
  const ref = React.useRef<HTMLInputElement>();
  const opts = React.useMemo(() => TransfromOptions(options), [options]);
  React.useEffect(() => getValueCallback(() => ref.current.value), [ref, getValueCallback]);
  React.useEffect(() => setValueCallback((value: string) => (ref.current.value = value)), [
    ref,
    setValueCallback,
  ]);

  const [show, setShow] = React.useState(false);
  const click = React.useMemo(() => selectTrigger.indexOf('click') !== -1, [selectTrigger]);
  const hover = React.useMemo(() => selectTrigger.indexOf('hover') !== -1, [selectTrigger]);
  React.useEffect(() => setSelectShow(setShow), [setSelectShow, setShow]);
  React.useEffect(() => getSelectShow(() => show), [getSelectShow, show]);

  return (
    <div
      className={concat(styles.wrapper, className, styles[size], styles[lablePlacement])}
      style={style}
      onBlur={onBlur}
    >
      {!!label ? <div className={concat(styles.label)}>{label}</div> : null}
      <div className={concat(styles.inner, ...(disabled ? ['disabled'] : []))}>
        <div className={concat(styles.input, shadowStyles.neumorphism_inset)}>
          {!!prefix ? <span className={styles.prefix}>{prefix}</span> : null}
          <input
            ref={ref}
            defaultValue={!!value ? undefined : defaultValue}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            type={type}
            style={{ paddingLeft: !!prefix ? '2em' : 0, paddingRight: !!suffix ? '2em' : 0 }}
            onClick={() => {
              if (click) setShow(true);
            }}
            onMouseEnter={() => {
              if (hover) setShow(true);
            }}
            onMouseLeave={() => setShow(false)}
            readOnly={!editable}
            onKeyUp={(e) => {
              if (e.keyCode == 13 && !!onEnterPressed) onEnterPressed();
            }}
            autoFocus={autoFocus}
          />
          {!!suffix ? <span className={styles.suffix}>{suffix}</span> : null}
        </div>
        {options.length > 0 ? (
          <div className={styles.select}>
            <ul
              className={shadowStyles.neumorphism}
              style={
                show ? { opacity: 1, visibility: 'visible' } : { opacity: 0, visibility: 'hidden' }
              }
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              {opts.map((o, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    if (!disabled) {
                      onSelect(o.key, o.value);
                      setShow(false);
                    }
                  }}
                >
                  {o.key}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      {!!hint ? <div className={styles.hint}>{hint}</div> : null}
    </div>
  );
}
