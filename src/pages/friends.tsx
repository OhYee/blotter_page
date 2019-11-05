import React, { ComponentProps } from 'react';

import { Row, Col, Card, Avatar, List, Divider, Tooltip, Typography } from 'antd';
import { requestCallback } from '@/utils/request';
import Container from '@/components/container';

import styles from './friends.less';

type FriendsProps = {} & ComponentProps<'base'>;

type FriendsState = {
  friends: Blotter.Friend[];
};

class Friends extends React.Component<FriendsProps, FriendsState> {
  constructor(props: FriendsProps) {
    super(props);
    this.state = { friends: [] };
  }
  componentDidMount() {
    requestCallback('get', '/api/friends', {}, (data: any) => this.setState({ friends: data }));
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
  }
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
  }

  render() {
    console.log(this.state.friends);
    return (
      <Container>
        <Row gutter={[10, 10]}>
          {this.state.friends.map((friend: Blotter.Friend) => this.renderCard(friend))}
        </Row>
      </Container>
    );
  }
}

export default Friends;
