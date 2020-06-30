import React, { Component } from 'react';
import Link from 'next/link';

import { Skeleton, PageHeader, Button } from 'antd';
import { EyeOutlined, CalendarOutlined, EditOutlined, TagOutlined } from '@ant-design/icons';

import { setImageLightbox } from '@/components/image';
import If from '@/components/if';
import TagPart from '@/components/tag';

import { Context } from '@/utils/global';

import styles from '@/pages/post/post.less';

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
  };
}

class PostContent extends Component<PostContentProps> {
  componentDidMount() {
    const containers = document.getElementsByClassName('image');
    for (var i = 0; i < containers.length; i++) {
      const imgs = containers[i].getElementsByTagName('img');
      for (var j = 0; j < imgs.length; j++) {
        setImageLightbox(imgs[j]);
      }
    }
  }
  render() {
    return this.props.post === undefined ? (
      <Skeleton active={true} />
    ) : (
      <article className={styles.post}>
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
        <If condition={this.props.post.head_image !== ''}>
          <a
            className="headimage image"
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.post.head_image}
          >
            <img src={this.props.post.head_image} alt={this.props.post.title} />
          </a>
        </If>
        <section
          className="post-content"
          dangerouslySetInnerHTML={{ __html: this.props.post.content }}
        />
      </article>
    );
  }
}

export default PostContent;
