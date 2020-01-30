import React from 'react';
import { Avatar, Tag } from 'antd';
import Link from 'umi/link';

import styles from './tag.less';

type TagProps = {
  tag: Blotter.Tag;
};

class TagPart extends React.Component<TagProps, {}> {
  constructor(props: TagProps) {
    super(props);
  }

  render() {
    return (
      <Tag className={styles.tag} color={this.props.tag.color}>
        <Link to={`/tag/${this.props.tag.short}`}>
          {this.props.tag.icon ? (
            <Avatar size={15} shape="circle" src={this.props.tag.icon} />
          ) : null}
          {this.props.tag.name}
        </Link>
      </Tag>
    );
  }
}

export default TagPart;
