import React from 'react';

import Body from './body';

import { concat, ComponentProps } from '@/utils/component';

import styles from './popover.less';
import shadowStyles from '@/styles/shadow.less';

export declare type PopoverProps = ComponentProps<{
  component?: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  trigger?: ('click' | 'hover')[];
  popoverClass?: string;
  popoverStyle?: React.CSSProperties;
  closeDelay?: number;
  arrow?: boolean;
  card?: boolean;
  shadow?: boolean;
  debug?: boolean;
}>;

export default function Popover(props: PopoverProps) {
  const {
    placement = 'top',
    trigger = ['hover'],
    component,
    className,
    style,
    popoverClass,
    popoverStyle,
    children,
    closeDelay = 200,
    arrow = true,
    card = false,
    shadow = false,
    debug = false,
  } = props;
  const ref = React.useRef<HTMLDivElement>();
  const childRef = React.useRef<HTMLDivElement>();
  const [pos, setPos] = React.useState({} as React.CSSProperties);
  const [show, setShow] = React.useState(false);
  //   const [willClose, setWillClose] = React.useState(false);
  const getPosition = React.useCallback(() => {
    if (!ref.current || !childRef.current) return { top: -99999, left: -99999 };
    const origin = ref.current.getBoundingClientRect();
    const child = childRef.current.getBoundingClientRect();
    return {
      top:
        placement === 'top'
          ? origin.top + window.pageYOffset - child.height - 10
          : placement === 'bottom'
          ? origin.top + window.pageYOffset + origin.height + 10
          : origin.top + window.pageYOffset - (child.height - origin.height) / 2,
      left:
        placement === 'left'
          ? origin.left + window.pageXOffset - child.width - 10
          : placement === 'right'
          ? origin.left + window.pageXOffset + origin.width + 10
          : origin.left + window.pageXOffset - (child.width - origin.width) / 2,
    };
  }, [ref, childRef]);
  const classList = React.useMemo(
    () => [
      styles.popover,
      arrow ? styles.arrow : '',
      styles[placement],
      popoverClass,
      show ? styles.show : '',
      card ? styles.card : '',
      shadow ? shadowStyles.shadow : '',
    ],
    [placement, popoverClass, show, arrow, card, shadow],
  );
  const click = React.useMemo(() => trigger.indexOf('click') !== -1, [trigger]);
  const hover = React.useMemo(() => trigger.indexOf('hover') !== -1, [trigger]);
  var willClose = false;
  const moveIn = () => {
    if (!show) setPos(getPosition());
    setShow(true);
    willClose = false;
  };
  const moveOut = () => {
    if (debug) return;
    willClose = true;
    setTimeout(() => {
      if (willClose) {
        setPos({});
        setShow(false);
      }
    }, closeDelay);
  };
  return (
    <div
      ref={ref}
      className={concat(styles.popover_origin, className)}
      style={style}
      onClick={() => {
        if (click) moveIn();
      }}
      onMouseEnter={() => {
        if (hover) moveIn();
      }}
      onMouseLeave={moveOut}
    >
      <Body>
        <div
          ref={childRef}
          className={concat(...classList)}
          style={{ ...pos, ...popoverStyle }}
          onMouseEnter={moveIn}
          onMouseLeave={moveOut}
        >
          {component}
        </div>
      </Body>
      {children}
    </div>
  );
}
