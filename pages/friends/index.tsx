import React, { ComponentProps, Fragment } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { NextPageContext } from 'next';

import { Flex } from '@/components/container';
import Card from '@/components/card';
import Avatar from '@/components/avatar';
import Popover, { Tooltip } from '@/components/popover';

import { Context } from '@/utils/global';
import { friends } from '@/utils/api';

import styles from './friends.module.scss';
import textStyles from '@/styles/text.module.scss';

import moment from '@/utils/moment';
moment.locale('zh-cn');

const maxPostNumber = 5;

interface FriendsProps extends ComponentProps<'base'> {
  friends: Blotter.Friend[];
}

interface FriendsState {}

class Friends extends React.Component<FriendsProps, FriendsState> {
  static defaultProps = {
    friends: [],
  };

  static async getInitialProps(args: NextPageContext) {
    var data = await friends();
    return { friends: data, rendered: true };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  getSourceData = (posts: Blotter.FriendPost[]) => {
    var list: JSX.Element[] = [];
    for (var i = 0; i < maxPostNumber; i++) {
      if (i < posts.length) {
        var post = posts[i];
        list.push(
          <a href={post.link} target="_blank" className={textStyles.color}>
            <Tooltip
              title={post.title}
              ellipsis
              style={{
                width: post.time !== 0 ? 'calc(100% - 5em)' : '100%',
                display: 'inline-block',
              }}
            >
              {post.title}
            </Tooltip>
            {post.time !== 0 ? (
              <Tooltip
                title={moment(post.time, 'X').format('YYYY-MM-DD HH:mm:SS')}
                ellipsis
                style={{
                  width: '5em',
                  textAlign: 'right',
                  fontSize: '0.75em',
                  display: 'inline-block',
                }}
              >
                {moment(post.time, 'X').fromNow()}
              </Tooltip>
            ) : null}
          </a>,
        );
      } else {
        list.push(
          <Tooltip ellipsis className={textStyles.color}>
            没有数据
          </Tooltip>,
        );
      }
    }
    return list;
  };

  renderCard = (friend: Blotter.Friend) => {
    return (
      <Card
        neumorphism
        style={{ width: '90vw', maxWidth: 330, position: 'relative', overflow: 'hidden' }}
      >
        <Flex direction="TB" fullWidth>
          {/* 站点描述 */}
          <Flex wrap={false}>
            {/* logo */}
            <Flex.Item style={{ flex: '0 0 5em', display: 'flex', justifyContent: 'center' }}>
              <Avatar className={styles.avatar} style={{ width: '2.5em', height: '2.5em' }}>
                <img src={friend.image} {...{ referrerPolicy: 'no-referrer' }} />
              </Avatar>
            </Flex.Item>
            <Flex.Item style={{ flex: '1 1 auto' }}>
              {/* 信息描述 */}
              <Flex direction="TB" subAxis="flex-start">
                <Tooltip
                  ellipsis
                  title={friend.name + ' ' + (friend.ex ? '(友情链接)' : '(单向订阅)')}
                >
                  <strong>
                    <a href={friend.link} target="_blank" className={textStyles.color}>
                      {friend.name} {friend.ex ? '⭐' : '👀'}
                    </a>
                  </strong>
                </Tooltip>
                <Tooltip
                  ellipsis
                  title={!!friend.description ? friend.description : '没有描述'}
                  className={textStyles.color}
                  style={{ lineHeight: '2em', width: '13em' }}
                >
                  {!!friend.description ? friend.description : '没有描述'}
                </Tooltip>
              </Flex>
            </Flex.Item>
          </Flex>

          {/* 文章列表 */}
          <Flex direction="TB" mainAxis="space-around" fullWidth>
            {this.getSourceData(friend.posts).map((item, idx) => (
              <Flex.Item key={idx}>{item}</Flex.Item>
            ))}
          </Flex>
        </Flex>

        {!!friend.rss ? (
          <div
            className={styles.corner}
            style={{ background: !!friend.error ? 'crimson' : 'mediumseagreen' }}
          >
            {!!friend.error ? '抓取失败' : '抓取成功'}
          </div>
        ) : null}
      </Card>
    );
  };

  render() {
    return (
      <Context.Consumer>
        {(context) => (
          <Fragment>
            <Head>
              <title>{`优秀博客订阅|${context.blog_name}`}</title>
            </Head>

            <Flex direction="TB" fullWidth>
              <Card neumorphism>
                <h1
                  className={textStyles.color}
                  style={{ display: 'inline-block', marginRight: 10 }}
                >
                  优秀博客订阅
                </h1>
                <p className={textStyles.secondary} style={{ display: 'inline-block' }}>
                  友情链接
                </p>
                <p>
                  可以在
                  <Link href="/comment">
                    <a>评论区</a>
                  </Link>
                  或者使用
                  <a href={`mailto:${context.email}`}>邮件</a>添加订阅(交换友链)
                </p>

                <p>
                  要求就是起码<b>一年能更新几篇文章</b>同时<b>添加本站友链</b>
                  ，别的只要内容合法合规即可（其他要求视具体情况而定）
                </p>
                <p>
                  除去个别高质量订阅，建议添加本站作为友链，否则可能会影响排序，或导致订阅被移除
                </p>

                <p>
                  如果可以，最好提供logo以及站点RSS，RSS将用于更新最新文章（没有也没事，就当我练习爬虫技术了）
                  <br />
                  友链顺序会按照博客最新文章手动随缘排序（更新勤快的高质量大佬优先）
                  <br />
                  每次会将最新 {maxPostNumber}{' '}
                  篇文章更新到这里，这样我就可以在一个页面看到诸位大佬的最新成果了
                </p>

                <p>
                  友链文章爬虫见
                  <a
                    href="https://github.com/OhYee/blotter/tree/master/tools/spider"
                    target="_blank"
                  >
                    相关代码
                  </a>
                  ，User-Agent 为<code>OhYee Spider</code>
                  ，如有必要，请加白名单。文章爬取任务会在每天凌晨 3 点执行
                </p>
              </Card>

              <Flex mainAxis="space-around" itemStyle={{ margin: 10 }}>
                {this.props.friends.map((friend) => (
                  <Flex.Item key={friend.name}>{this.renderCard(friend)}</Flex.Item>
                ))}
              </Flex>
            </Flex>
          </Fragment>
        )}
      </Context.Consumer>
    );
  }
}

export default Friends;
