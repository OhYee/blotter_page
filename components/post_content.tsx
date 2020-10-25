import React, { Component } from 'react';
import Head from 'next/head';

import moment from '@/utils/moment';

import Image, { setImageLightbox, setSVGLightbox } from '@/components/image';

import { CardContent } from '@/components/post_card';
import Card from '@/components/card';
import Anchor from '@/components/anchor';
import Loading from '@/components/loading';
import Carousel from '@/components/carousel';
import { Flex } from '@/components/container';
import { AD } from '@/components/js';

import { travels_get_url } from '@/utils/api';
import { Context } from '@/utils/global';

import styles from '@/pages/post/post.module.scss';

interface PostContentProps {
  post: Blotter.Post;
}

interface PostContentState {
  travel?: Blotter.Travel;
}

class PostContent extends Component<PostContentProps, PostContentState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  constructor(props) {
    super(props);
    this.state = { travel: undefined };
  }
  resetImage() {
    const containers = document.getElementsByClassName('image');
    for (var i = 0; i < containers.length; i++) {
      const imgs = containers[i].getElementsByTagName('img');
      for (var j = 0; j < imgs.length; j++) {
        setImageLightbox(imgs[j]);
      }
    }

    const post_content = document.getElementsByClassName('post-content');
    if (post_content.length > 0) {
      const svgs = post_content[0].getElementsByTagName('svg');
      for (var i = 0; i < svgs.length; i++) {
        const svg = svgs[i];
        setSVGLightbox(svg);
      }
    }
  }

  resetTable() {
    const tables = document.getElementsByTagName('table');
    for (var i = 0; i < tables.length; i++) {
      tables[i].outerHTML = `<div class="${styles.table_wrapper}">${tables[i].outerHTML}</div>`;
    }
  }
  componentDidMount() {
    this.resetImage();
    this.resetTable();
    if (this.isTravel()) {
      this.getTravelData();
    }
  }
  componentDidUpdate() {
    this.resetImage();
    this.resetTable();
  }

  isTravel = () => {
    return (
      this.props.post.tags.filter((item) => item.name === '游记' && item.short === 'travels')
        .length > 0
    );
  };

  getTravelData = () => {
    travels_get_url(this.props.post.url)
      .then((r) => {
        if (r.exist) {
          this.setState({ travel: r.travel });
        }
      })
      .catch(console.error);
  };

  renderTravel = () => {
    const travel = this.state.travel;
    if (!!travel) {
      const lnglat = `${travel.lng},${travel.lat}`;
      return (
        <details>
          <summary>游记详细信息</summary>
          <Image
            clickable
            height={'512px'}
            maxHeight="50vh"
            src={`https://restapi.amap.com/v3/staticmap?location=${lnglat}&zoom${travel.zoom}&scale=2&size=1024*1024&markers=mid,,A:${lnglat}&key=5918961af3c0ffafa1a3cb1056556c98`}
            alt={`${travel.name}地图`}
            title={`${moment(travel.time, 'X').format('YYYY-MM-DD')} 于 ${travel.name}`}
          />
          <p style={{ textAlign: 'center', fontSize: '1.25em' }}>
            该文章是一篇 <strong>{moment(travel.time, 'X').format('YYYY-MM-DD')}</strong> 于{' '}
            <strong>{travel.name}</strong> 的游记， 更多游记见
            <a href="/apps/travels" target="_blank">
              游记列表
            </a>
          </p>
        </details>
      );
    } else {
      return null;
    }
  };

  render() {
    return this.props.post === undefined ? (
      <Loading />
    ) : (
      <article className={styles.post}>
        <Head>
          {this.props.post.content.indexOf('katex') != -1 ? (
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css"
              integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
              crossOrigin="anonymous"
            ></link>
          ) : null}
        </Head>

        <Flex direction="TB" fullWidth>
          <Card neumorphismInset>
            <CardContent post={this.props.post} inPost />
          </Card>

          {this.renderTravel()}

          {!!this.context.ad_text && <AD setting={this.context.ad_text} />}

          {!!this.props.post.images && this.props.post.images.length > 0 ? (
            <Carousel
              images={this.props.post.images}
              height={'500px'}
              maxHeight={'50vh'}
              autoplay={5000}
            />
          ) : null}

          <section
            className="post-content"
            style={{ fontSize: this.context.big_screen ? 16 : 14 }}
            dangerouslySetInnerHTML={{ __html: this.props.post.content }}
          />

          {!!this.context.ad_inner && <AD setting={this.context.ad_inner} />}
        </Flex>
      </article>
    );
  }
}

export default PostContent;
