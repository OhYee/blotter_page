import React from 'react';
import { Avatar, Tag } from 'antd';
import Link from 'next/link';

import styles from './tag.less';

interface TagProps {
  tag?: Blotter.Tag;
  closable?: boolean;
  onClose?: (tag: Blotter.Tag) => void;
}

class TagPart extends React.Component<TagProps, {}> {
  static defaultProps: TagProps = {
    closable: false,
    onClose: () => {},
  };
  constructor(props: TagProps) {
    super(props);
  }

  render() {
    return typeof this.props.tag === 'undefined' ? null : (
      <Tag
        className={styles.tag}
        color={this.props.tag.color}
        closable={this.props.closable}
        onClose={() => {
          this.props.onClose!(this.props.tag!);
        }}
      >
        <Link href={'/tag/[tag]'} as={`/tag/${this.props.tag.short}`}>
          <a>
            {this.props.tag.icon ? (
              <Avatar size={15} shape="circle" src={this.props.tag.icon} />
            ) : null}
            {this.props.tag.name}
          </a>
        </Link>
      </Tag>
    );
  }
}

export default TagPart;
