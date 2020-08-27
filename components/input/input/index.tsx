import React from 'react';

import { concat, ComponentProps } from '@/utils/component';

import shadowStyles from '@/styles/shadow.less';
import styles from './input.less';

export declare type Option = {
  key?: string;
  value?: any;
};

export declare type InputProps = ComponentProps<{
  label?: string;
  lablePlacement?: 'left' | 'top';
  size?: 'small' | 'middle' | 'large';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;

  // Input
  value?: string;
  defaultValue?: string;
  editable?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  getValueCallback?: (callback: () => string) => void;
  setValueCallback?: (callback: (value: string) => void) => void;

  // Select
  selectTrigger?: ('click' | 'hover')[];
  options?: Option[];
  onSelect?: (key: string, value: any) => void;
  getSelectShow?: (callback: () => boolean) => void;
  setSelectShow?: (callback: (show: boolean) => void) => void;
}>;

export default function Input(props: InputProps) {
  const {
    prefix,
    suffix,
    defaultValue,
    value,
    placeholder = '',
    size = 'middle',
    label = '',
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
    style,
    className,
  } = props;
  const ref = React.useRef<HTMLInputElement>();
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
    <div className={concat(styles.wrapper, className)} style={style}>
      {!!label ? <span className={styles.label}>{label}</span> : null}
      <div className={concat(styles.inner, ...(disabled ? ['disabled'] : []))}>
        <div className={concat(styles.input, shadowStyles.neumorphism_inset, styles[size])}>
          {!!prefix ? <span className={styles.prefix}>{prefix}</span> : null}
          <input
            ref={ref}
            defaultValue={!!value ? undefined : defaultValue}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ paddingLeft: !!prefix ? '2em' : 0, paddingRight: !!suffix ? '2em' : 0 }}
            onClick={() => {
              if (click) setShow(true);
            }}
            onMouseEnter={() => {
              if (hover) setShow(true);
            }}
            onMouseLeave={() => setShow(false)}
            readOnly={!editable}
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
              {options.map((o, idx) => (
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
    </div>
  );
}
