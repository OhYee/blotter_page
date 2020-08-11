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
export function RSS(props: { style: React.CSSProperties }) {
  const { style } = props;
  return (
    <SVG>
      <svg
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1115"
        data-spm-anchor-id="a313x.7781069.0.i1"
      >
        <path
          d="M42.666667 853.333333a128 128 0 1 1 256 0 128 128 0 0 1-256 0z m938.666666 128h-178.773333c0-418.986667-340.906667-759.893333-759.893333-759.893333V42.666667c517.546667 0 938.666667 421.12 938.666666 938.666666z m-298.666666 0h-182.826667c0-252.074667-205.098667-457.130667-457.173333-457.130666V341.333333c352.896 0 640 287.104 640 640z"
          fill="#EE802F"
          p-id="1116"
        ></path>
      </svg>
    </SVG>
  );
}

export default SVG;
