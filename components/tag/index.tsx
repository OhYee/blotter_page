import React from 'react';
import Link from 'next/link';

import Avatar from '@/components/avatar';
import { Flex } from '@/components/container';
import { Close } from '@/components/svg';

import { concat, ComponentProps } from '@/utils/component';
import { parseColor, toHex, rgb2hsl, hsl2rgb } from '@/utils/color';

import styles from './tag.module.scss';
import textStyles from '@/styles/text.module.scss';
import shadowStyles from '@/styles/shadow.module.scss';

// function getFrontColor(backgroundColor) {
//   /*
//         根据背景色计算前景色

//         首先根据解析出三原色，判断是浅色还是深色，而后将这些颜色朝另一个方向按比例移动

//         浅色背景 xx = x - 3 * fixValue * x / (r + g + b)
//                 xx = (1 - 3 * fixValue / (r + g + b)) * x
//         深色背景 xx = x + 3 * fixValue * (255 - x) / (255 * 3 - (r + g + b))
//                 xx = (1 - 3 * fixValue / (255 * 3 - (r + g + b)) * x + 3 * fixValue * 255 / (255 * 3 - (r + g + b))
//     */
//   const [r, g, b] = parseColor(backgroundColor);
//   const total = r + g + b;
//   const fixValue = (Math.pow(127 - Math.min(total / 3, 255 - total / 3) / 127, 4) + 1) * 127;

//   // y = ax + b
//   const _a = total / 3 > 127 ? 1 - (3 * fixValue) / total : 1 - (3 * fixValue) / (255 * 3 - total);
//   const _b = total / 3 > 127 ? 0 : (3 * fixValue * 255) / (255 * 3 - total);

//   const rr = _a * r + _b;
//   const gg = _a * g + _b;
//   const bb = _a * b + _b;

//   return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`;
// }

function getFrontColor(backgroundColor) {
  const [r, g, b] = parseColor(backgroundColor);
  const [h, s, l] = rgb2hsl(r, g, b);
  const hh = h;
  const ss = 100;
  const ll = l > 50 ? l - 50 : l <= 25 ? 100 - l : s > 50 ? 100 : l + 50;
  const [rr, gg, bb] = hsl2rgb(hh, ss, ll);
  return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`;
}

type TagProps = ComponentProps<{
  tag?: Blotter.Tag;
  onClose?: () => void;
}>;

export default function Tag(props: TagProps) {
  const { tag, onClose, className, style } = props;
  return (
    <Flex
      className={concat(
        styles.tag,
        className,
        shadowStyles.neumorphism_light,
        shadowStyles.clickable,
        textStyles.color,
      )}
      style={{
        ...(!!tag.color
          ? {
              background: tag.color,
              color: getFrontColor(tag.color),
            }
          : {}),
        ...style,
      }}
      mainAxis="space-around"
      mainSize="small"
      wrap={false}
    >
      <Link href={'/tag/[tag]'} as={`/tag/${tag.short}`}>
        <a>
          <Flex
            className={concat(textStyles.color)}
            wrap={false}
            mainAxis="space-between"
            mainSize="small"
            style={{
              ...(!!tag.color
                ? {
                    color: getFrontColor(tag.color),
                  }
                : {}),
            }}
          >
            {tag.icon ? (
              <Avatar className={styles.icon} src={tag.icon}  />
            ) : null}
            {tag.name}
          </Flex>
        </a>
      </Link>
      {!!onClose && (
        <Close onClick={onClose} style={{ background: 'transparent', color: 'currentColor' }} />
      )}
    </Flex>
  );
}
