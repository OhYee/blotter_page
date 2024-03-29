import React from 'react';

import { Flex } from '@/components/container';
import If from '@/components/if';
import { RSS } from '@/components/svg';
import { AD } from '@/components/js';

import { Context } from '@/utils/global';

import styles from './footer.module.scss';

export default function Footer(props: {
  beian: string;
  from: string;
  view: number;
  friends: Blotter.FriendSimple[];
}) {
  const { beian, from, view, friends } = props;
  const context = React.useContext(Context);

  return (
    <Flex direction="TB" className={styles.footer}>
      <Flex wrap={false}>
        <RSS style={{ color: '#EE802F' }} />
        <a href="/rss.xml">RSS订阅</a>
      </Flex>
      <Flex>
        <div>
          {from} – {new Date().getFullYear()}
        </div>
        <div>全站访问量 {view}</div>
      </Flex>
      {context.footer && <div dangerouslySetInnerHTML={{ __html: context.footer }} />}
      <a href="http://beian.miit.gov.cn/">{beian}</a>
      <div>
        Powered by <a href="https://github.com/OhYee/blotter">Blotter</a>
        (Go + React)
      </div>
      <Flex mainAxis="space-between">
        <a href="/sitemap.txt">站点地图(TXT)</a>
        <a href="/sitemap.xml">站点地图(XML)</a>
      </Flex>
      <If condition={!!friends && friends.length > 0}>
        <Flex mainAxis="center" subSize="small" className={styles.friends}>
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
      {!!context.ad_show && (
        <AD
          setting={context.ad_show}
          style={{ width: '100%', height: 'fit-content', display: 'block' }}
        />
      )}
    </Flex>
  );
}
