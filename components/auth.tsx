import React from 'react';

import { Flex } from '@/components/container';
import { QQ, Github, Wechat } from '@/components/svg';

export default function QuickLogin(
  props: React.PropsWithChildren<{ prefix?: JSX.Element; size?: number }>,
): JSX.Element {
  const { prefix = <span>快速互联</span>, size = 24 } = props;
  const style = { fontSize: size };
  return (
    <Flex mainAxis="flex-start">
      {prefix}
      <a href="/api/user/jump_to_qq" className="link">
        <QQ style={{ color: '#00A2FD', ...style }} />
      </a>
      <a href="/api/user/jump_to_github" className="link">
        <Github style={{ ...style }} />
      </a>
      {/* TODO: Waiting for wechat */}
      {/* <Link href="/api/user/jump_to_weixin">
            <WechatSVG style={{ color: '#07C160', ...style }} />
          </Link> */}
    </Flex>
  );
}
