import React, { Component } from 'react';
import { Carousel as C } from 'antd';
import { CarouselProps as CProps } from 'antd/lib/carousel';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Space } from './container';
import Image from '@/components/image';

import styles from './carousel.less';

interface CarouselProps extends CProps {
  images: string[];
  height?: string;
  width?: string;
  maxHeight?: string;
  background?: string;
}

class Carousel extends Component<CarouselProps> {
  carousel;

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }

  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }

  render() {
    const {
      images,
      height = '100%',
      width = '100%',
      maxHeight,
      background,
      ...restProps
    } = this.props;

    return (
      <div className={styles.container} style={{ background }}>
        <div className={styles.button} style={{ left: '10px' }}>
          <LeftCircleOutlined onClick={this.previous} />
        </div>
        <C
          ref={(ref) => (this.carousel = ref)}
          {...restProps}
          className={styles.carousel}
          style={{
            height,
            width,
            maxHeight,
            background,
          }}
        >
          {images.map((image, idx) => (
            <div key={idx}>
              <Image
                src={image}
                alt={`图片 ${idx + 1}`}
                title={image.split('#').slice(1).join('#')}
                height={height}
                maxHeight={maxHeight}
                clickable
              />
            </div>
          ))}
        </C>
        <div className={styles.button} style={{ right: '10px' }}>
          <RightCircleOutlined onClick={this.next} />
        </div>
      </div>
    );
  }
}

export default Carousel;
