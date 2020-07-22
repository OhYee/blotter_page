import React, { ComponentProps, Fragment } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { NextPageContext } from 'next';

import { Row, Col, Card, Avatar, List, Divider, Tooltip, Typography, Popover } from 'antd';

import Container from '@/components/container';

import { Context } from '@/utils/global';
import { friends } from '@/utils/api';

import styles from './friends.less';

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
              <Typography.Text ellipsis={true} style={{ width: '100%' }}>
                {post.title}
              </Typography.Text>
            </Tooltip>
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
      <Card hoverable={true}>
        <Card.Meta
          avatar={
            <Avatar
              className={styles.avatar}
              icon={<img src={friend.image} {...{ referrerPolicy: 'no-referrer' }} />}
            />
          }
          title={
            <Popover title={friend.name} content={friend.description}>
              <a href={friend.link} target="_blank" className="text-color">
                {friend.name}
              </a>
            </Popover>
          }
          description={
            <Popover title={friend.name} content={friend.description}>
              <Typography.Text ellipsis={true} style={{ lineHeight: '2em', width: '100%' }}>
                {!!friend.description ? friend.description : '没有描述'}
              </Typography.Text>
            </Popover>
          }
        />
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
                <title>{`友情链接|${context.blog_name}`}</title>
              </Head>

              <Card style={{ marginBottom: '10px' }}>
                <Typography.Paragraph>
                  可以在
                  <Link href="/comment">
                    <a>评论区</a>
                  </Link>
                  或者使用
                  <a href={`mailto:${context.email}`}>邮件</a>申请友链
                </Typography.Paragraph>

                <Typography.Paragraph>
                  唯一的要求就是起码一年能更新几篇文章吧，别的只要内容合法合规，来者不拒
                </Typography.Paragraph>

                <Typography.Paragraph>
                  如果可以，最好提供logo以及站点RSS，RSS将用于更新最新文章（没有也没事，就当我练习爬虫技术了）
                  <br />
                  友链顺序会按照博客最新文章手动随缘排序（更新勤快的高质量大佬优先）
                  <br />
                  每次会将最新 {maxPostNumber}{' '}
                  篇文章更新到这里，这样我就可以在一个页面看到诸位大佬的最新成果了
                </Typography.Paragraph>

                <Typography.Paragraph>
                  友链文章爬虫见
                  <a href="https://github.com/OhYee/blotter/tree/master/spider" target="_blank">
                    相关代码
                  </a>
                  ，User-Agent 为<Typography.Text code>OhYee Spider</Typography.Text>
                  ，如有必要，请加白名单。文章爬取任务会在每天凌晨 3 点执行
                </Typography.Paragraph>
              </Card>

              <List
                grid={{ xxl: 3, xl: 3, md: 2, sm: 1, xs: 1, gutter: 30 }}
                dataSource={this.props.friends}
                renderItem={(friend: Blotter.Friend) => (
                  <List.Item
                    key={friend.link}
                    style={{ width: '100vw', overflow: 'hidden', position: 'relative' }}
                  >
                    {this.renderCard(friend)}
                  </List.Item>
                )}
              />
            </Fragment>
          )}
        </Context.Consumer>
      </Container>
    );
  }
}

export default Friends;
