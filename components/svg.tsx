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
          <circle stroke-width="1.5" cx="10.5" cy="10.5" r="4">
            <clipPath d="M21 10.5l-3 3V18h-4.5l-3 3-3-3H3v-4.5l-3-3 3-3V3h4.5l3-3 3 3H18v4.5z" />
          </circle>
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

export function Message(props: { style?: React.CSSProperties; className?: string }) {
  const { style, className } = props;
  return (
    <SVG style={style} className={className}>
      <svg viewBox="64 64 896 896" data-icon="message" fill="currentColor" aria-hidden="true">
        <path d="M664 512a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0z"></path>
        <path d="M925.2 338.4c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
        <path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0z"></path>
      </svg>
    </SVG>
  );
}

export function Rocket(props: { style?: React.CSSProperties; className?: string }) {
  const { style, className } = props;
  return (
    <SVG style={style} className={className}>
      <svg viewBox="64 64 896 896" data-icon="rocket" fill="currentColor" aria-hidden="true">
        <path d="M864 736c0-111.6-65.4-208-160-252.9V317.3c0-15.1-5.3-29.7-15.1-41.2L536.5 95.4C530.1 87.8 521 84 512 84s-18.1 3.8-24.5 11.4L335.1 276.1a63.97 63.97 0 00-15.1 41.2v165.8C225.4 528 160 624.4 160 736h156.5c-2.3 7.2-3.5 15-3.5 23.8 0 22.1 7.6 43.7 21.4 60.8a97.2 97.2 0 0043.1 30.6c23.1 54 75.6 88.8 134.5 88.8 29.1 0 57.3-8.6 81.4-24.8 23.6-15.8 41.9-37.9 53-64a97 97 0 0043.1-30.5 97.52 97.52 0 0021.4-60.8c0-8.4-1.1-16.4-3.1-23.8L864 736zm-540-68h-84.8c5.5-16.3 13.1-32 22.5-46.6 16.3-25.2 37.5-46.5 62.3-62.7V668zm64-184.9V318.8l124-147 124 147V668H388V483.1zm240.1 301.1c-5.2 3-11.2 4.2-17.1 3.4l-19.5-2.4-2.8 19.4c-5.4 37.9-38.4 66.5-76.7 66.5s-71.3-28.6-76.7-66.5l-2.8-19.5-19.5 2.5a27.7 27.7 0 01-17.1-3.5c-8.7-5-14.1-14.3-14.1-24.4 0-10.6 5.9-19.4 14.6-23.8h231.3c8.8 4.5 14.6 13.3 14.6 23.8-.1 10.2-5.5 19.6-14.2 24.5zM700 668V558.7a211.6 211.6 0 0162.3 62.7c9.4 14.6 17 30.3 22.5 46.6H700z"></path>
        <path d="M464 400a48 48 0 1096 0 48 48 0 10-96 0z"></path>
      </svg>
    </SVG>
  );
}

export default SVG;
