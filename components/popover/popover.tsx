import React from 'react';

import Body from './body';

import { concat, ComponentProps } from '@/utils/component';

import { getOffsetTop, getOffsetLeft } from '@/utils/offset';

import styles from './popover.less';

export declare type PopoverProps = ComponentProps<{
  component?: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  trigger?: ('click' | 'hover')[];
  popoverClass?: string;
  popoverStyle?: React.CSSProperties;
  closeDelay?: number;
  getOffset?: () => { top?: number; left?: number };
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
    closeDelay = 500,
    getOffset = () => ({ top: 0, left: 0 }),
  } = props;
  const ref = React.useRef<HTMLDivElement>();
  const childRef = React.useRef<HTMLDivElement>();
  const [pos, setPos] = React.useState({} as React.CSSProperties);
  const [show, setShow] = React.useState(false);
  const [willClose, setWillClose] = React.useState(false);
  const getPosition = React.useCallback(() => {
    const { top = 0, left = 0 } = getOffset();
    return {
      top:
        top +
        (placement === 'top'
          ? getOffsetTop(ref.current) - childRef.current.offsetHeight - 10
          : placement === 'bottom'
          ? getOffsetTop(ref.current) + ref.current.offsetHeight + 10
          : getOffsetTop(ref.current) -
            (childRef.current.offsetHeight - ref.current.offsetHeight) / 2),
      left:
        left +
        (placement === 'left'
          ? getOffsetLeft(ref.current) - childRef.current.offsetWidth - 10
          : placement === 'right'
          ? getOffsetLeft(ref.current) + ref.current.offsetWidth + 10
          : getOffsetLeft(ref.current) -
            childRef.current.offsetWidth / 2 +
            ref.current.offsetWidth / 2),
    };
  }, [ref]);
  var classList = [styles.popover, styles[placement], popoverClass];
  if (show) classList.push(styles.show);
  const click = React.useMemo(() => trigger.indexOf('click') !== -1, [trigger]);
  const hover = React.useMemo(() => trigger.indexOf('hover') !== -1, [trigger]);
  const moveIn = () => {
    if (!show) setPos(getPosition());
    setShow(true);
    setWillClose(false);
  };
  const moveOut = () => {
    setPos({});
    setWillClose(true);
    setTimeout(() => {
      if (willClose) setShow(false);
    }, closeDelay);
  };
  return (
    <div
      ref={ref}
      className={className}
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
