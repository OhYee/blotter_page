import React from 'react';

import Head from 'next/head';
import { NextPageContext } from 'next';

import TagPart from '@/components/tag';
import Container from '@/components/container';
import Card from '@/components/card';
import { Flex } from '@/components/container';

import { tags } from '@/utils/api';
import { Context } from '@/utils/global';
import { sortTagsByPinYin, TagGroup } from '@/utils/sort';

import styles from './tags.less';

interface TagsProps extends React.ComponentProps<'base'> {
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

  renderTag = (tag: Blotter.TagWithCount) => {
    return (
      <div key={tag.short} className={styles.tag} title={`${tag.name} 共有 ${tag.count} 篇文章`}>
        <span>{tag.count > 99 ? '99+' : tag.count}</span>
        <TagPart tag={tag} />
      </div>
    );
  };

  renderGroup = (group: TagGroup) => {
    return group.tags.length > 0 ? (
      <Card key={group.title} neumorphism>
        <Flex direction="TB" subAxis="flex-start" fullWidth>
          <h2>{group.title}</h2>
          <Flex mainAxis="flex-start" mainSize={15} subSize={15}>
            {group.tags.map(this.renderTag)}
          </Flex>
        </Flex>
      </Card>
    ) : null;
  };

  render() {
    return (
      <Container>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`标签列表|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>

        <Flex direction="TB" subAxis="flex-start" fullWidth>
          {[
            <p key="total">共有 {this.props.total} 个标签</p>,
            ...this.props.tags.map(this.renderGroup),
          ]}
        </Flex>
      </Container>
    );
  }
}

export default Tags;
