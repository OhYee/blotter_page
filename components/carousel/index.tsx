import React from 'react';

import { Left } from '@/components/svg';
import Image from '@/components/image';
import { Flex } from '@/components/container';

import { concat } from '@/utils/component';

import styles from './carousel.less';

type CarouselProps = {
  images: string[];
  height?: string;
  width?: string;
  maxHeight?: string;
  background?: string;
  style?: React.CSSProperties;
  autoplay?: number;
};

export default function Carousel(props: CarouselProps) {
  const {
    images,
    height = '100%',
    width = '100%',
    maxHeight,
    background,
    style,
    autoplay = 0,
    ...restProps
  } = props;
  const length = React.useMemo(() => images.length, [images]);
  const [now, setNow] = React.useState(0);
  const pre = React.useCallback(() => setNow((now - 1 + length) % length), [length, now, setNow]);
  const next = React.useCallback(() => setNow((now + 1 + length) % length), [length, now, setNow]);
  React.useEffect(() => {
    const id = setTimeout(next, autoplay);
    console.log('timer', id);
    return () => {
      console.log('timer stop', id);
      clearTimeout(id);
    };
  }, [autoplay, next]);

  return (
    <div style={{ background }} className={styles.container}>
      <div
        {...restProps}
        className={styles.carousel}
        style={{
          height,
          width,
          maxHeight,
          ...style,
        }}
      >
        <Flex
          fullWidth
          wrap={false}
          itemStyle={{ flex: '0 0 100%' }}
          mainSize={0}
          className={styles.images}
          style={{
            left: `-${now * 100}%`,
          }}
        >
          {images.map((image, idx) => (
            <Image
              key={idx}
              src={image}
              alt={`图片 ${idx + 1}`}
              title={image.split('#').slice(1).join('#')}
              height={height}
              maxHeight={maxHeight}
              clickable
            />
          ))}
        </Flex>
      </div>

      <Left className={styles.button} onClick={pre} style={{ left: '10px' }} />
      <Left
        className={styles.button}
        style={{ transform: 'rotate(180deg)', right: '10px' }}
        onClick={next}
      />

      <Flex fullWidth wrap={false} className={styles.nav}>
        {images.map((image, idx) => (
          <div
            key={idx}
            onClick={() => setNow(idx)}
            style={{ cursor: 'pointer' }}
            className={concat(styles.nav_item, idx === now ? styles.active : '')}
          >
            <Image
              src={image}
              alt={`图片 ${idx + 1}`}
              title={image.split('#').slice(1).join('#')}
              height={'100px'}
            />
          </div>
        ))}
      </Flex>
    </div>
  );
}
