import React from 'react';

import { Flex } from '@/components/container';
import { Left } from '@/components/svg';
import Button from '@/components/button';

import { concat, ComponentProps } from '@/utils/component';
import { Context } from '@/utils/global';

import styles from './anchor.less';
import shadowStyles from '@/styles/shadow.less';

export declare type AnchorType = {
  name: string;
  id: string;
  level: number;
  children: AnchorType[];
};

export declare type AnchorProps = ComponentProps<{
  content: string;
  indent?: number;
  width?: number;
}>;

export default function Anchor(props: AnchorProps) {
  const { content, className, indent = 10, width = 275, ...restProps } = props;

  const context = React.useContext(Context);
  const anchors = React.useMemo(() => findAnchors(content), [content]);
  const [show, setShow] = React.useState(context.big_screen);
  const [top, setTop] = React.useState(50);

  //   if (!!container) container.onscroll = () => setTop(container.scrollTop + 50);

  return (
    <div {...restProps} className={concat(styles.anchor, show ? styles.show : '', className)}>
      <Button
        neumorphism
        className={concat(styles.button)}
        icon={<Left className={styles.icon} />}
        onClick={() => setShow(!show)}
      />

      <Flex
        direction="TB"
        subAxis="flex-start"
        wrap={false}
        className={concat(styles.links, shadowStyles.neumorphism)}
      >
        {anchors.map((item) => (
          <a
            key={item.id}
            href={item.id}
            style={{ paddingLeft: (item.level - 1) * indent }}
            title={item.name}
          >
            {item.name}
          </a>
        ))}
      </Flex>
    </div>
  );
}

export function findAnchors(html: string): AnchorType[] {
  var re = new RegExp(`<h([1-6]) id="(.*)">(.*)</h\\1>`, 'g');
  var result_list: AnchorType[] = [];

  do {
    var result = re.exec(html);
    if (result !== null) {
      result_list.push({
        id: `#${result[2]}`,
        name: result[3],
        level: parseInt(result[1]),
        children: [],
      });
    }
  } while (result);

  //   var anchors: AnchorType[] = [];

  //   var insert = (lst: AnchorType[], value: AnchorType) => {
  //     if (lst.length > 0 && lst[lst.length - 1].level < value.level) {
  //       insert(lst[lst.length - 1].children, value);
  //     } else {
  //       lst.push(value);
  //     }
  //   };

  //   result_list.map((anchor: AnchorType) => {
  //     insert(anchors, anchor);
  //   });

  //   anchors.push({
  //     id: '#blotter-comment',
  //     name: '评论区',
  //     level: 1,
  //     children: [],
  //   });

  return result_list;
}
