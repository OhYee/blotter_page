import React from 'react';
import { Avatar, Tag } from 'antd';
import Link from 'umi/link';

type TagProps = {
  tag: Blotter.Tag;
};

class TagPart extends React.Component<TagProps, {}> {
  constructor(props: TagProps) {
    super(props);
  }

  render() {
    return (
      <Tag color={this.props.tag.color}>
        <Link to={`/tag/${this.props.tag.id}`}>
          {this.props.tag.icon ? (
            <Avatar size={16} shape="square" src={this.props.tag.icon} />
          ) : null}
          {this.props.tag.name}
        </Link>
      </Tag>
    );
  }
}

export default TagPart;
