import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Row, Col, Card, Avatar, List, Divider, Tooltip, Typography } from 'antd';

import Container from '@/components/container';

import { InitialPropsParam, Context } from '@/utils/global';
import { friends } from '@/utils/api';

import styles from './friends.less';

interface FriendsProps extends  ComponentProps<'base'> {
  friends: Blotter.Friend[];
}

interface FriendsState {}

class Friends extends React.Component<FriendsProps, FriendsState> {
  static defaultProps = {
    friends: [],
  };

  static async getInitialProps(args: InitialPropsParam) {
    var data = await friends();
    return { friends: data, rendered: true };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  renderListItem = (posts: { title: string; link: string }) => {
    return (
      <List.Item>
        <a href={posts.link} target="_blank">
          <Tooltip title={posts.title}>
            <Typography.Text ellipsis={true} style={{ width: '100%' }}>
              {posts.title}
            </Typography.Text>
          </Tooltip>
        </a>
      </List.Item>
    );
  };
  renderCard = (friend: Blotter.Friend) => {
    return (
      <Col key={friend.link} lg={8}>
        <Card hoverable={true} cover={<img src={friend.image} alt={friend.name} />}>
          <Card.Meta
            avatar={<Avatar src={friend.image} />}
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
            dataSource={friend.posts}
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
            <Head>
              <title>{`友情链接|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Row gutter={[10, 10]}>
          {this.props.friends.map((friend: Blotter.Friend) => this.renderCard(friend))}
        </Row>
      </Container>
    );
  }
}

export default Friends;
