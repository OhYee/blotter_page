import React, { Component } from 'react';
import Link from 'next/link';

import { Skeleton, PageHeader, Button } from 'antd';
import { EyeOutlined, CalendarOutlined, EditOutlined, TagOutlined } from '@ant-design/icons';

import moment from 'moment';

import Image, { setImageLightbox } from '@/components/image';
import If from '@/components/if';
import TagPart from '@/components/tag';
import StaticMap from '@/components/static_map';
import FocusDiv from '@/components/focus';

import { Context } from '@/utils/global';
import { travels_get_url } from '@/utils/api';

import styles from '@/pages/post/post.less';
import Carousel from './carousel';
import { Space } from './container';

interface PostContentProps {
  post: {
    url: string;
    content: string;
    abstract: string;
    head_image: string;
    title: string;
    view: number;
    publish_time: string;
    edit_time: string;
    tags: Blotter.Tag[];
    images: string[];
  };
}

interface PostContentState {
  travel?: Blotter.Travel;
}

class PostContent extends Component<PostContentProps, PostContentState> {
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
  }
  componentDidMount() {
    this.resetImage();
    if (this.isTravel()) {
      this.getTravelData();
    }
  }
  componentDidUpdate() {
    this.resetImage();
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
        <FocusDiv distance={0.5}>
          {(inArea) => (
            <div>
              <Image
                clickable
                height={inArea ? '512px' : '100px'}
                style={{ transition: 'height .5s' }}
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
            </div>
          )}
        </FocusDiv>
      );
    } else {
      return null;
    }
  };

  render() {
    return this.props.post === undefined ? (
      <Skeleton active={true} />
    ) : (
      <article className={styles.post}>
        <Space size={20}>
          <PageHeader className="shadow" title={this.props.post.title}>
            <div>
              <div className="right20">
                <EyeOutlined className="right5" />
                {this.props.post.view}
              </div>
              <div className="right20">
                <CalendarOutlined className="right5" />
                {this.props.post.publish_time}
              </div>
              {this.props.post.publish_time == this.props.post.edit_time ? null : (
                <div className="right20">
                  <EditOutlined className="right5" />
                  {this.props.post.edit_time}
                </div>
              )}
              <Context.Consumer>
                {(context) =>
                  (context.user.permission & 1) == 1 ? (
                    <Link href={`/admin/post?url=${this.props.post.url}`}>
                      <Button type="primary" size="small">
                        编辑
                      </Button>
                    </Link>
                  ) : null
                }
              </Context.Consumer>
              <If condition={!!this.props.post.abstract}>
                <blockquote>{this.props.post.abstract}</blockquote>
              </If>
              <div>
                <TagOutlined className="right20" />
                {this.props.post.tags.length > 0 ? (
                  this.props.post.tags.map((tag: Blotter.Tag) => (
                    <TagPart key={tag.short} tag={tag} />
                  ))
                ) : (
                  <span>无标签</span>
                )}
              </div>
            </div>
          </PageHeader>

          {this.renderTravel()}

          <If condition={!!this.props.post.images}>
            <FocusDiv distance={0.5}>
              {(inArea) => {
                return (
                  <Carousel
                    images={this.props.post.images}
                    height={inArea ? '500px' : '100px'}
                    maxHeight={'50vh'}
                    autoplay
                    style={{ transition: 'height .5s' }}
                  />
                );
              }}
            </FocusDiv>
          </If>
          {/* <If condition={this.props.post.head_image !== ''}>
          <a
            className="headimage image"
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.post.head_image}
          >
            <img src={this.props.post.head_image} alt={this.props.post.title} />
          </a>
        </If> */}
          <section
            className="post-content"
            dangerouslySetInnerHTML={{ __html: this.props.post.content }}
          />
        </Space>
      </article>
    );
  }
}

export default PostContent;
