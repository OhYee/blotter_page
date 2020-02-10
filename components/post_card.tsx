import React from 'react';

import { Card, Typography, Divider, Icon, Row, Col, Skeleton } from 'antd';
const { Meta } = Card;
import Link from 'next/link';

import TagPart from '@/components/tag';

const { Title, Paragraph, Text } = Typography;

type PostCardProps = {
  post: Blotter.PostCard | undefined;
  hoverable?: boolean;
  loading: boolean;
};
class PostCard extends React.Component<PostCardProps, {}> {
  static defaultProps = {
    hoverable: true,
    loading: false,
  };
  constructor(props: PostCardProps) {
    super(props);
  }

  render_post(post: Blotter.PostCard) {
    return (
      <div>
        <Link href={`/post/${post.url}`}>
          <a>
            <Title level={4} ellipsis={true}>
              {post.title}
            </Title>
            <Paragraph>{post.abstract}</Paragraph>
          </a>
        </Link>
        <Row>
          <Col span={4}>
            <Text ellipsis={true} />
          </Col>
          <Col span={10}>
            <Text ellipsis={true} />
          </Col>
        </Row>

        <div>
          <div className="right20">
            <Icon type="eye" className="right5" />
            {post.view}
          </div>
          <div className="right20">
            <Icon type="calendar" className="right5" />
            {post.publish_time}
          </div>
          {post.publish_time == post.edit_time ? null : (
            <div className="right20">
              <Icon type="edit" className="right5" />
              {post.edit_time}
            </div>
          )}
        </div>

        <Divider style={{ margin: '10px 0' }} />
        <div>
          <Icon type="tag" className="right20" />
          {post.tags.map((tag: Blotter.Tag) => (
            <TagPart key={tag.short} tag={tag} />
          ))}
        </div>
      </div>
    );
  }
  render() {
    var post = this.props.post as Blotter.PostCard;
    var loading = this.props.loading || typeof this.props.post === 'undefined';

    return (
      <Card
        className="shadow"
        bordered={false}
        hoverable={this.props.hoverable}
        cover={
          !loading && post.head_image ? (
            <div style={{ maxHeight: '200px', overflow: 'hidden' }}>
              <img
                alt="example"
                src={post.head_image}
                style={{ marginTop: 'calc(100px - 25%)', width: '100%' }}
              />
            </div>
          ) : null
        }
      >
        <Skeleton loading={loading} active>
          {loading ? null : this.render_post(post)}
        </Skeleton>
      </Card>
    );
  }
}

export default PostCard;
