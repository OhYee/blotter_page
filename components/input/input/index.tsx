import React from 'react';

import { Edit, Left } from '@/components/svg';
import Popover from '@/components/popover';

import { concat, ComponentProps } from '@/utils/component';
import { waitUntil } from '@/utils/debounce';
import randomString from '@/utils/random';

import shadowStyles from '@/styles/shadow.module.scss';
import styles from './input.module.scss';

export declare type Option<T = any> =
  | {
      key: string;
      value: T | string;
    }
  | string;

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
  debounce?: number;
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
};

export declare type TransformPartProps = {
  transform?: boolean;
};

export declare type InputProps<SelectType = any> = Combine<
  ComponentProps<BasePartProps & InputPartProps & SelectPartProps<SelectType> & TransformPartProps>,
  React.HTMLAttributes<HTMLInputElement>
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
    onEnterPressed = () => {},
    onBlur,
    hint,
    type,
    style,
    className,
    transform = false,
    debounce = 200,
    ...restProps
  } = props;
  const ref = React.useRef<HTMLInputElement>();
  const key = React.useMemo(() => randomString(), []);

  const opts = React.useMemo(() => TransfromOptions(options), [options]);
  React.useEffect(() => getValueCallback(() => (!!ref && !!ref.current ? ref.current.value : '')), [
    ref,
    getValueCallback,
  ]);
  React.useEffect(
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const cb = () => onChange(value);
      if (debounce > 0) waitUntil(key, cb, debounce);
      else cb();
    },
    [debounce, onChange],
  );

  return (
    <div
      className={concat(styles.wrapper, className, styles[size])}
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
          <div
            className={concat(
              styles.inner,
              styles[lablePlacement],
              ...(disabled ? ['disabled'] : []),
            )}
          >
            {!!label ? <div className={concat(styles.label)}>{label}</div> : null}
            <div className={concat(styles.input, shadowStyles.neumorphism_inset)}>
              {!!prefix ? <span className={styles.prefix}>{prefix}</span> : null}
              <Popover
                card
                arrow={false}
                placement="bottom"
                trigger={selectTrigger}
                style={{ width: '100%' }}
                component={
                  <div className={styles.select}>
                    <ul className={shadowStyles.neumorphism}>
                      {opts.map((o, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            if (!disabled) {
                              onSelect(o.key, o.value);
                            }
                          }}
                        >
                          {o.key}
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              >
                <input
                  {...restProps}
                  ref={ref}
                  defaultValue={defaultValue}
                  onChange={onInputChange}
                  placeholder={placeholder}
                  type={type}
                  readOnly={!editable}
                  onKeyUp={(e) => {
                    if (e.keyCode == 13 && !!onEnterPressed) onEnterPressed();
                  }}
                  autoFocus={autoFocus || transform}
                />
              </Popover>
              {!!suffix ? (
                <span className={styles.suffix}>{suffix}</span>
              ) : !!options && options.length !== 0 ? (
                <Left style={{ transform: 'rotate(270deg)' }} />
              ) : null}
            </div>
          </div>
          {!!hint ? <div className={styles.hint}>{hint}</div> : null}
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
