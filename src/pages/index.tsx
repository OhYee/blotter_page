import React from 'react';
import styles from './index.css';
import { requestCallback } from '@/utils/request';
import PostCard from '../components/post_card';
import { Row, Col } from 'antd';
import Container from '../components/container';

type IndexState = {
  posts: Blotter.PostCard[];
};
export class Index extends React.Component<{}, IndexState> {
  constructor(props: any) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    requestCallback('post', '/api/index/post', {}, (data: { posts: Blotter.PostCard[] }) => {
      this.setState(() => ({ posts: data.posts }));
    });
  }

  render() {
    return (
      <div>
        {this.state.posts.map((post: Blotter.PostCard, index: number) => (
          <Container key={index}>
            <PostCard post={post} />
          </Container>
        ))}
      </div>
    );
  }
}

export default Index;
