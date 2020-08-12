import React from 'react';

import styles from './svg.less';

function SVG(props: React.PropsWithChildren<{ style?: React.CSSProperties; className?: string }>) {
  const { style, className, children } = props;

  return (
    <div className={[styles.svg, className].join(' ')} style={{ ...style }}>
      {children}
    </div>
  );
}
export function RSS(props: { style?: React.CSSProperties; className?: string }) {
  const { style, className } = props;
  return (
    <SVG style={style} className={className}>
      <svg viewBox="0 0 1024 1024" focusable="false" fill="currentColor" aria-hidden="true">
        <path
          d="M42.666667 853.333333a128 128 0 1 1 256 0 128 128 0 0 1-256 0z m938.666666 128h-178.773333c0-418.986667-340.906667-759.893333-759.893333-759.893333V42.666667c517.546667 0 938.666667 421.12 938.666666 938.666666z m-298.666666 0h-182.826667c0-252.074667-205.098667-457.130667-457.173333-457.130666V341.333333c352.896 0 640 287.104 640 640z"
          fill="#EE802F"
          p-id="1116"
        ></path>
      </svg>
    </SVG>
  );
}

export function Light(props: { style?: React.CSSProperties; className?: string }) {
  const { style, className } = props;
  return (
    <SVG style={style} className={className}>
      <svg viewBox="0 0 21 21" focusable="false" fill="currentColor" aria-hidden="true">
        <g fill="none" fill-rule="evenodd">
          <path
            fill="currentColor"
            fill-rule="nonzero"
            d="M21 10.5l-3 3V18h-4.5l-3 3-3-3H3v-4.5l-3-3 3-3V3h4.5l3-3 3 3H18v4.5z"
          ></path>
          <circle stroke="#FFF" stroke-width="1.5" cx="10.5" cy="10.5" r="4"></circle>
        </g>
      </svg>
    </SVG>
  );
}

export function Dark(props: { style?: React.CSSProperties; className?: string }) {
  const { style, className } = props;
  return (
    <SVG style={style} className={className}>
      <svg viewBox="0 0 21 21" focusable="false" fill="currentColor" aria-hidden="true">
        <g fill="none" fill-rule="evenodd">
          <circle fill="currentColor" cx="10.5" cy="10.5" r="10.5"></circle>
          <path
            d="M13.396 11c0-3.019-1.832-5.584-4.394-6.566A6.427 6.427 0 0111.304 4C15.002 4 18 7.135 18 11c0 3.866-2.998 7-6.698 7A6.42 6.42 0 019 17.566c2.564-.98 4.396-3.545 4.396-6.566z"
            fill="#FFF"
            fill-rule="nonzero"
          ></path>
        </g>
      </svg>
    </SVG>
  );
}

export function Bar(props: { style?: React.CSSProperties; className?: string }) {
  const { style, className } = props;
  return (
    <SVG style={style} className={className}>
      <svg viewBox="0 0 1024 1024" focusable="false" fill="currentColor" aria-hidden="true">
        <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
      </svg>
    </SVG>
  );
}

export function Left(props: { style?: React.CSSProperties; className?: string }) {
  const { style, className } = props;
  return (
    <SVG style={style} className={className}>
      <svg viewBox="64 64 896 896" data-icon="left" fill="currentColor" aria-hidden="true">
        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
      </svg>
    </SVG>
  );
}

export default SVG;
