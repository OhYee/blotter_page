import React from 'react';

import { Card, Typography, Divider, Icon, Row, Col } from 'antd';
const { Meta } = Card;
import Link from 'umi/link';

import TagPart from '@/components/tag';

const { Title, Paragraph, Text } = Typography;

type PostCardProps = {
  post: Blotter.PostCard;
  hoverable?: boolean;
};
class PostCard extends React.Component<PostCardProps, {}> {
  static defaultProps = {
    hoverable: true,
  };
  constructor(props: PostCardProps) {
    super(props);
  }

  render() {
    return (
      <Card
        className="shadow"
        bordered={false}
        hoverable={this.props.hoverable}
        cover={
          this.props.post.head_image ? (
            <div style={{ maxHeight: '200px', overflow: 'hidden' }}>
              <img
                alt="example"
                src="https://www.oyohyee.com/static/img/posts/onenote.jpg"
                style={{ marginTop: 'calc(100px - 25%)', width: '100%' }}
              />
            </div>
          ) : null
        }
      >
        <Link to={`/post/${this.props.post.url}`}>
          <Title level={4} ellipsis={true}>
            {this.props.post.title}
          </Title>
          <Paragraph>{this.props.post.abstract}</Paragraph>
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
            {this.props.post.view}
          </div>
          <div className="right20">
            <Icon type="calendar" className="right5" />
            {this.props.post.publish_time}
          </div>
          {this.props.post.publish_time == this.props.post.edit_time ? null : (
            <div className="right20">
              <Icon type="edit" className="right5" />
              {this.props.post.edit_time}
            </div>
          )}
        </div>

        <Divider style={{ margin: '10px 0' }} />
        <div>
          <Icon type="tag" className="right20" />
          {this.props.post.tags.map((tag: Blotter.Tag) => (
            <TagPart key={tag.id} tag={tag} />
          ))}
        </div>
      </Card>
    );
  }
}

export default PostCard;
