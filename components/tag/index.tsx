import React from 'react';
// import { Avatar, Tag } from 'antd';
import Link from 'next/link';

import Avatar from '@/components/avatar';

import { concat, ComponentProps } from '@/utils/component';
import { Flex } from '@/components/container';

import { reverseColor, isLight } from '@/utils/color';

import styles from './tag.less';
import textStyles from '@/styles/text.less';
import shadowStyles from '@/styles/shadow.less';

type TagProps = ComponentProps<{
  tag?: Blotter.Tag;
  onClose?: (tag: Blotter.Tag) => void;
}>;

export default function Tag(props: TagProps) {
  const { tag, onClose, className, style } = props;
  return (
    <Link href={'/tag/[tag]'} as={`/tag/${tag.short}`}>
      <a>
        <Flex
          className={concat(
            styles.tag,
            className,
            textStyles.color,
            shadowStyles.neumorphism_light,
            shadowStyles.clickable,
          )}
          mainAxis="space-around"
          mainSize="small"
          wrap={false}
          style={{
            ...(!!tag.color
              ? {
                  background: tag.color,
                  color: isLight(tag.color) ? 'var(--color-dark)' : 'var(--color-white)',
                }
              : {}),
            ...style,
          }}
        >
          {tag.icon ? (
            <Avatar src={tag.icon} style={{ fontSize: '0.75em', background: 'white' }} />
          ) : null}
          {tag.name}
          {!!onClose ? 'x' : null}
        </Flex>
      </a>
    </Link>
  );
}

// class TagPart extends React.Component<TagProps, {}> {
//   static defaultProps: TagProps = {
//     closable: false,
//     onClose: () => {},
//   };
//   constructor(props: TagProps) {
//     super(props);
//   }

//   render() {
//     return typeof this.props.tag === 'undefined' ? null : (
//       <Tag
//         className={styles.tag}
//         color={this.props.tag.color}
//         closable={this.props.closable}
//         onClose={() => {
//           this.props.onClose!(this.props.tag!);
//         }}
//       >
//         <Link href={'/tag/[tag]'} as={`/tag/${this.props.tag.short}`}>
//           <a>
//             {this.props.tag.icon ? (
//               <Avatar size={15} shape="circle" src={this.props.tag.icon} />
//             ) : null}
//             {this.props.tag.name}
//           </a>
//         </Link>
//       </Tag>
//     );
//   }
// }

// export default TagPart;
