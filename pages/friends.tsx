import React, { ComponentProps, Fragment } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { NextPageContext } from 'next';

import { Row, Col, Card, Avatar, List, Divider, Tooltip, Typography } from 'antd';

import Container from '@/components/container';

import { Context } from '@/utils/global';
import { friends } from '@/utils/api';

import styles from './friends.less';

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
    for (var i = 0; i < 3; i++) {
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
        list.push(<p>没有数据</p>);
      }
    }
    return list;
  };

  renderListItem = (item: JSX.Element, idx: number) => <List.Item key={idx}>{item}</List.Item>;

  renderCard = (friend: Blotter.Friend) => {
    return (
      <Col key={friend.link} lg={8}>
        <Card hoverable={true}>
          <Card.Meta
            avatar={
              <Avatar icon={<img src={friend.image} {...{ referrerPolicy: 'no-referrer' }} />} />
            }
            title={
              <a href={friend.link} target="_blank" style={{ color: 'black' }}>
                {friend.name}
              </a>
            }
            description={
              <Typography.Text ellipsis={true} style={{ lineHeight: '1em' }}>
                {friend.description}
              </Typography.Text>
            }
          />
          <Divider style={{ margin: '20px 0 0 0' }} />
          <List
            className={styles.list}
            itemLayout="horizontal"
            size="small"
            style={{ height: '130px' }}
            dataSource={this.getSourceData(friend.posts)}
            renderItem={this.renderListItem}
          />
        </Card>
      </Col>
    );
  };
  render() {
    return (
      <Container>
        <Context.Consumer>
          {context => (
            <Fragment>
              <Head>
                <title>{`友情链接|${context.blog_name}`}</title>
              </Head>

              <Card style={{ marginBottom: '10px' }}>
                可以在<Link href="/comment">评论区</Link>或者使用
                <a href={`mailto:${context.email}`}>邮件</a>申请友链
                <br />
                如果可以，最好提供logo以及站点RSS，RSS将用于更新最新文章（没有也没事，就当我练习爬虫技术了）
              </Card>
              <Row gutter={[10, 10]}>
                {this.props.friends.map((friend: Blotter.Friend) => this.renderCard(friend))}
              </Row>
            </Fragment>
          )}
        </Context.Consumer>
      </Container>
    );
  }
}

export default Friends;
