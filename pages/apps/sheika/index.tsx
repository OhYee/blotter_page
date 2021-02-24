import React, { CanvasHTMLAttributes, ComponentProps } from 'react';
import Head from 'next/head';

import Card from '@/components/card';
import Input from '@/components/input';
import { Flex } from '@/components/container';
import Button from '@/components/button';

import { Context } from '@/utils/global';

import styles from './sheika.module.scss';
import textStyles from '@/styles/text.module.scss';

interface SheikaProps extends ComponentProps<'base'> {}

interface SheikaState {
  value: string;
}

class Sheika extends React.Component<SheikaProps, SheikaState> {
  ref = React.createRef<HTMLCanvasElement>();

  constructor(props: any) {
    super(props);
    this.state = { value: 'Hello World!' };
  }

  componentDidMount() {
    this.updateCanvas();
    this.updateCanvas();
  }

  updateCanvas() {
    if (this.ref.current) {
      const size = 16;
      const width = this.ref.current.clientWidth;
      const height = this.ref.current.clientHeight;
      const scale = 10;
      const scale2 = 2;
      console.log(width, height);

      const ctx = this.ref.current.getContext('2d');

      this.ref.current.height = height * scale2;
      this.ref.current.width = width * scale2;
      ctx.scale(scale, scale);

      this.ref.current.style.width = '100%';
      ctx.font = `${size}px SheikahGlyphs`;
      ctx.fillStyle = '#2d91f2';
      const pre = Math.round(((width / scale) * scale2) / size) - 1;
      var value = this.state.value;
      var line = size;
      console.log(width, size, pre, line);
      while (value.length > 0) {
        console.log(line, value.slice(0, pre));
        ctx.fillText(value.slice(0, pre), 0, line, width);
        value = value.slice(pre);
        line += size;
      }
    }
  }

  download = () => {
    if (this.ref.current) {
      var imgURI = this.ref.current
        .toDataURL(`image/png`)
        .replace(`image/png`, 'image/octet-stream');

      var evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true,
      });

      var a = document.createElement('a');
      a.setAttribute('download', `logo.png`);
      a.setAttribute('href', imgURI);
      a.setAttribute('target', '_blank');

      a.dispatchEvent(evt);
    }
  };

  render() {
    return (
      <Card neumorphism className={styles.wrapper}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`席卡族文字编码|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <h1 className={textStyles.color} style={{ display: 'inline-block', marginRight: 10 }}>
          席卡族文字
        </h1>
        <p className={textStyles.secondary} style={{ display: 'inline-block' }}>
          文字解释
        </p>
        <p style={{ margin: 0, marginBottom: 20 }}>
          来源于《塞尔达传说 旷野之息》。详情见 《
          <a href="https://3type.cn/3typezine/typebites/01.html">从虚构世界的文字说起</a>》
        </p>

        <Flex direction="TB" fullWidth>
          <Input
            value={this.state.value}
            onChange={(value) => {
              this.setState({ value });
              this.updateCanvas();
            }}
          />

          <b>文本</b>
          <div className={styles.sheika}>{this.state.value}</div>

          <b>画板</b>
          <Button neumorphism onClick={this.download}>
            保存成图片
          </Button>
          <canvas ref={this.ref} />
        </Flex>
      </Card>
    );
  }
}

export default Sheika;
