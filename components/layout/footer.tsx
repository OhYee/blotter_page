import React from 'react';

import Container, { Flex } from '@/components/container';
import If from '@/components/if';
import { RSS } from '@/components/svg';

export default function (props: {
  beian?: string;
  from?: string;
  view?: number;
  friends?: Blotter.FriendSimple[];
}) {
  const { beian, from, view, friends } = props;
  return (
    <Container>
      <Flex direction="TB">
        <a href="/rss.xml">
          <RSS style={{ width: '1em' }} />
          RSS订阅
        </a>
        <div>全站访问量 {view}</div>
        <Flex direction="LR">
          <div>
            {from} – {new Date().getFullYear()}
          </div>
          <a href="http://beian.miit.gov.cn/">{beian}</a>
        </Flex>
        <div>
          Powered by <a href="https://github.com/OhYee/blotter">Blotter</a>
          (Go + React)
        </div>
        <Flex mainAxis="space-between">
          <a href="/sitemap.txt">站点地图(TXT)</a>
          <a href="/sitemap.xml">站点地图(XML)</a>
        </Flex>
        <If condition={!!friends && friends.length > 0}>
          <Flex mainAxis="center" subSize="small">
            {[
              <strong key="title">优秀博客订阅：</strong>,
              ...friends.map((friend) => (
                <a key={friend.name} href={friend.link}>
                  {friend.name}
                </a>
              )),
            ]}
          </Flex>
        </If>
      </Flex>
    </Container>
  );
}
