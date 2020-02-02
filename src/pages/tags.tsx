import React, { ComponentProps } from 'react';

import { Card, Badge, Row } from 'antd';

import TagPart from '@/components/tag';
import Container from '@/components/container';

import { tags, InitialPropsParam } from '@/utils/api';
import { sortTagsByPinYin, TagGroup } from '@/utils/sort';

import styles from './tags.less';
import { setTitle } from '@/utils/prerender';

type TagsProps = {
  total: number;
  tags: TagGroup[];
};

type TagsState = {};

class Tags extends React.Component<TagsProps & ComponentProps<'base'>, TagsState> {
  static defaultProps: TagsProps = {
    total: 0,
    tags: [],
  };

  constructor(props: any) {
    super(props);
    this.state = {};
    setTitle('标签列表');
  }

  static async getInitialProps(args: InitialPropsParam) {
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
    return <Container>{this.props.tags.map(this.render_group)}</Container>;
  }
}

export default Tags;
