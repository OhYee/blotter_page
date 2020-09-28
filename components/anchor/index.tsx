import React from 'react';

import { Flex } from '@/components/container';
import { Left } from '@/components/svg';
import Button from '@/components/button';

import { concat, ComponentProps } from '@/utils/component';
import { Context } from '@/utils/global';
import { scrollAnimation } from '@/utils/scroll';

import styles from './anchor.less';
import shadowStyles from '@/styles/shadow.less';

export declare type AnchorType = {
  name: string;
  id: string;
  level: number;
};

export declare type AnchorProps = ComponentProps<{
  content: string;
  indent?: number;
  width?: number;
  suffixAnchors?: AnchorType[];
  container?: HTMLElement;
}>;

export default function Anchor(props: AnchorProps) {
  const {
    content,
    className,
    indent = 10,
    width = 275,
    suffixAnchors: suffixAnchor = [],
    container,
    ...restProps
  } = props;
  const ref = React.useRef<HTMLDivElement>();
  const context = React.useContext(Context);
  const anchors = React.useMemo(() => findAnchors(content).concat(suffixAnchor), [
    content,
    suffixAnchor,
  ]);
  const [show, setShow] = React.useState(context.big_screen);
  const syncScroll = React.useCallback(
    (e: Event) => {
      const target = e.target === document ? document.documentElement : (e.target as HTMLElement);

      // 同步浮框位置
      if (!!ref.current) ref.current.style.top = `${target.scrollTop + 100}px`;

      // 获取当前阅读进度
      const scrollTop = target.scrollTop;
      for (var i = 0; i < anchors.length; i++) {
        const el = document.getElementById(anchors[i].id);
        if (!!el && el.offsetTop > scrollTop) {
          // 清除老的状态
          const lastActive = ref.current.getElementsByClassName(styles.active);
          for (var j = 0; j < lastActive.length; j++) {
            if (lastActive[j].id !== `anchor-${anchors[i].id}`) {
              lastActive[j].classList.remove(styles.active);
            }
          }

          // 设置新的状态
          const anchorsEls = ref.current.getElementsByTagName('a');
          const nowEl = anchorsEls[i];
          nowEl.classList.add(styles.active);

          // 将对应的连接移入视窗中
          const linksEls = ref.current.getElementsByClassName(styles.links);
          const linkEl = linksEls.length > 0 ? linksEls[0] : undefined;
          if (!linkEl) break;
          const nowTop = nowEl.offsetTop;
          const nowHeight = nowEl.offsetHeight;
          if (nowTop < linkEl.scrollTop) scrollAnimation(linkEl, nowTop);
          else if (nowTop + nowHeight > linkEl.scrollTop + linkEl.clientHeight)
            scrollAnimation(linkEl, nowTop - linkEl.clientHeight + nowHeight);

          break;
        }
      }
    },
    [ref],
  );
  React.useEffect(() => {
    const c = !!container ? container : document;
    if (!!c) {
      c.addEventListener('scroll', syncScroll);
      return () => c.removeEventListener('scroll', syncScroll);
    }
  }, [container, syncScroll]);

  return (
    <div
      ref={ref}
      {...restProps}
      className={concat(styles.anchor, show ? styles.show : '', className)}
    >
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
            id={`anchor-${item.id}`}
            href={`#${item.id}`}
            style={{ paddingLeft: (item.level - 1) * indent }}
            title={item.name}
            onClick={(e) => {
              const el = document.getElementById(item.id);
              if (!!el)
                scrollAnimation(
                  !!container ? container : document.documentElement,
                  el.getBoundingClientRect().top + window.pageYOffset,
                );
              e.preventDefault();
              return false;
            }}
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
        id: `${result[2]}`,
        name: result[3],
        level: parseInt(result[1]),
      });
    }
  } while (result);

  return result_list;
}
