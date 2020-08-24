import React, { ComponentProps, Fragment } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { NextPageContext } from 'next';

import { Row, Col, List, Divider, Tooltip, Typography, Popover, PageHeader } from 'antd';

import Container, { Flex } from '@/components/container';
import Card from '@/components/card';
import Avatar from '@/components/avatar';

import { Context } from '@/utils/global';
import { friends } from '@/utils/api';

import styles from './friends.less';

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
          <a href={post.link} target="_blank">
            <Tooltip title={post.title}>
              <Typography.Text
                ellipsis={true}
                style={{ width: post.time !== 0 ? 'calc(100% - 4em)' : '100%' }}
              >
                {post.title}
              </Typography.Text>
            </Tooltip>
            {post.time !== 0 ? (
              <Tooltip title={moment(post.time, 'X').format('YYYY-MM-DD HH:mm:SS')}>
                <Typography.Text ellipsis={true} style={{ width: '4em', textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75em' }}>{moment(post.time, 'X').fromNow()}</span>
                </Typography.Text>
              </Tooltip>
            ) : null}
          </a>,
        );
      } else {
        list.push(
          <Typography.Text ellipsis={true} style={{ width: '100%' }}>
            没有数据
          </Typography.Text>,
        );
      }
    }
    return list;
  };

  renderListItem = (item: JSX.Element, idx: number) => <List.Item key={idx}>{item}</List.Item>;

  renderCard = (friend: Blotter.Friend) => {
    return (
      <Card
        neumorphism
        key={friend.name}
        style={{ width: 'min(400px, 90vw)', position: 'relative' ,overflow:"hidden"}}
      >
        <Flex direction="TB" fullWidth>
          <Flex>
            <Flex.Item style={{ flex: '0 0 5em', display: 'flex', justifyContent: 'center' }}>
              <Avatar className={styles.avatar} style={{ width: '2.5em', height: '2.5em' }}>
                <img src={friend.image} {...{ referrerPolicy: 'no-referrer' }} />
              </Avatar>
            </Flex.Item>
            <Flex.Item style={{ flex: '1 1 auto' }}>
              <Flex direction="TB" fullWidth>
                <Popover title={friend.name} content={friend.description}>
                  <strong>
                    <a href={friend.link} target="_blank" className="text-color">
                      {friend.name}
                    </a>
                  </strong>
                </Popover>
                <Popover title={friend.name} content={friend.description}>
                  <Typography.Text ellipsis={true} style={{ lineHeight: '2em', width: '100%' }}>
                    {!!friend.description ? friend.description : '没有描述'}
                  </Typography.Text>
                </Popover>
              </Flex>
            </Flex.Item>
          </Flex>
        </Flex>

        <Divider style={{ margin: '20px 0 0 0' }} />

        <List
          className={styles.list}
          itemLayout="horizontal"
          size="small"
          dataSource={this.getSourceData(friend.posts)}
          renderItem={this.renderListItem}
        />

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
      <Container>
        <Context.Consumer>
          {(context) => (
            <Fragment>
              <Head>
                <title>{`优秀博客订阅|${context.blog_name}`}</title>
              </Head>

              <Card neumorphism>
                <h1>优秀博客订阅</h1>
                <span>友情链接</span>
                <p>
                  可以在
                  <Link href="/comment">
                    <a>评论区</a>
                  </Link>
                  或者使用
                  <a href={`mailto:${context.email}`}>邮件</a>添加订阅(申请友链)
                </p>

                <p>唯一的要求就是起码一年能更新几篇文章吧，别的只要内容合法合规，来者不拒</p>

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
                  <a href="https://github.com/OhYee/blotter/tree/master/spider" target="_blank">
                    相关代码
                  </a>
                  ，User-Agent 为<Typography.Text code>OhYee Spider</Typography.Text>
                  ，如有必要，请加白名单。文章爬取任务会在每天凌晨 3 点执行
                </p>
              </Card>

              <Flex mainAxis="space-around" style={{ position: 'relative' }} subSize="middle">
                {this.props.friends.map((friend) => this.renderCard(friend))}
              </Flex>
            </Fragment>
          )}
        </Context.Consumer>
      </Container>
    );
  }
}

export default Friends;
