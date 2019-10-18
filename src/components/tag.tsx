import React from 'react';
import { Avatar, Tag } from 'antd';

type TagProps = {
  tag: Blotter.Tag;
};

class TagPart extends React.Component<TagProps, {}> {
  constructor(props: TagProps) {
    super(props);
  }

  render() {
    return (
      <Tag color={this.props.tag.color} >
        {this.props.tag.icon ? <Avatar size={16} shape="square" src={this.props.tag.icon} /> : null}
        {this.props.tag.name}
      </Tag>
    );
  }
}

export default TagPart;
