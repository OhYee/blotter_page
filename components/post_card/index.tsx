import React from 'react';

import Link from 'next/link';

import Image from '@/components/image';
import TagPart from '@/components/tag';
import Card from '@/components/card';
import { Flex } from '@/components/container';
import { Eye, Calendar, Tag, Edit, Document } from '@/components/svg';
import { A } from '@/components/button';
import Loading from '@/components/loading';

import { Context } from '@/utils/global';
import { concat } from '@/utils/component';
import moment, { formatSecond } from '@/utils/time';

import textStyles from '@/styles/text.module.scss';
import styles from './post_card.module.scss';

type PostCardProps = {
  post: Blotter.PostCard | undefined;
  loading: boolean;
};

export function CardContent(props: { post: Blotter.PostCard; inPost?: boolean }) {
  const { inPost = false, post } = props;
  const context = React.useContext(Context);
  const title = [
    <h2 key="title" className={concat(textStyles.color, textStyles.ellipsis)} title={post.title}>
      {post.title}
    </h2>,
    <p key="abstract" className={textStyles.color}>
      {post.abstract}
    </p>,
  ];
  const publishTime = formatSecond(post.publish_time);
  const editTime = formatSecond(post.edit_time);
  return (
    <Flex direction="TB" fullWidth className={styles.post_card}>
      {!inPost ? (
        <Link href="/post/[url]" as={`/post/${post.url}`}>
          <a className={textStyles.color}>{title}</a>
        </Link>
      ) : (
        title
      )}

      <Flex mainAxis="flex-start" className={styles.info}>
        <Flex mainAxis="flex-start" mainSize="small">
          <Eye />
          <span style={{ fontSize: '0.8em' }}>{!!post.view ? post.view : 0}</span>
        </Flex>
        <Flex mainAxis="flex-start" mainSize="small">
          <Calendar />
          <time dateTime={publishTime.replace(' ', 'T') + 'T+08'} style={{ fontSize: '0.8em' }}>
            {publishTime}
          </time>
        </Flex>
        {post.publish_time == post.edit_time ? null : (
          <Flex mainAxis="flex-start" mainSize="small">
            <Edit />
            <time dateTime={editTime.replace(' ', 'T') + 'T+08'} style={{ fontSize: '0.8em' }}>
              {editTime}
            </time>
          </Flex>
        )}

        <Flex mainAxis="flex-start" mainSize="small">
          <Document />
          <span style={{ fontSize: '0.8em' }}>{`本文章共 ${
            post.length
          } 字 / 预计阅读时间 ${Math.max(1, Math.round(post.length / 400))} 分`}</span>
        </Flex>

        {inPost && (context.user.permission & 1) == 1 ? (
          <Link href={`/admin/post?url=${post.url}`} passHref>
            <A primary neumorphism size="small" target="_blank">
              编辑
            </A>
          </Link>
        ) : null}
      </Flex>

      <div></div>
      <Flex mainAxis="flex-start" subSize="middle">
        {[
          <Tag key="tag_icon" />,
          ...post.tags.map((tag: Blotter.Tag) => <TagPart key={tag.short} tag={tag} />),
        ]}
      </Flex>
    </Flex>
  );
}

export default function PostCard(props: PostCardProps) {
  const post = props.post as Blotter.PostCard;
  const loading = props.loading || typeof props.post === 'undefined';

  return (
    <Card
      neumorphism
      cover={
        !loading && post.head_image ? (
          <Image
            src={post.head_image}
            height="300px"
            alt={`文章『${post.title}』的头图`}
            title={post.title}
          />
        ) : null
      }
    >
      {loading ? <Loading /> : <CardContent post={post} />}
    </Card>
  );
}
