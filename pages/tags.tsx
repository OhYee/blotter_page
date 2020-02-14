import React, { ComponentProps } from 'react';

import Head from 'next/head';
import { NextPageContext } from 'next';

import { Card, Badge, Row } from 'antd';

import TagPart from '@/components/tag';
import Container from '@/components/container';

import { tags } from '@/utils/api';
import {  Context } from '@/utils/global';
import { sortTagsByPinYin, TagGroup } from '@/utils/sort';

import styles from './tags.less';

interface TagsProps extends ComponentProps<'base'> {
  total: number;
  tags: TagGroup[];
}

interface TagsState {}

class Tags extends React.Component<TagsProps, TagsState> {
  static defaultProps = {
    total: 0,
    tags: [],
  };

  constructor(props: TagsProps) {
    super(props);
    this.state = {};
  }

  static async getInitialProps(args: NextPageContext) {
    var r = await tags();

    return {
      total: r.total,
      tags: sortTagsByPinYin(r.tags),
    };
  }

  render_tag = (tag: Blotter.TagWithCount) => {
    return (
      <div key={tag.short} className={styles.tag}>
        <Badge
          className={styles.badge}
          count={tag.count}
          overflowCount={9999}
          showZero={true}
          title={`共有${tag.count}篇文章`}
        >
          <TagPart tag={tag} />
        </Badge>
      </div>
    );
  };

  render_group = (group: TagGroup) => {
    return group.tags.length > 0 ? (
      <Card className={styles.card} key={group.title} title={group.title}>
        <Row>{group.tags.map(this.render_tag)}</Row>
      </Card>
    ) : null;
  };

  render() {
    return (
      <Container>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`标签列表|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>

        {this.props.tags.map(this.render_group)}
      </Container>
    );
  }
}

export default Tags;
