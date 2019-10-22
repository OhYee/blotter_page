import React, { ComponentProps } from 'react';

import { Card, PageHeader, Typography, Skeleton, Icon, Anchor } from 'antd';
const { Link } = Anchor;
const { Title, Paragraph, Text } = Typography;

import Container from '@/components/container';
import Breadcrumb from '@/components/breadcrumb';

import { withRouter, RouteComponentProps } from 'react-router';
import { request } from '@/utils/request';

type AnchorType = {
  name: string;
  id: string;
  level: number;
  children: AnchorType[];
};

type PostPartProps = {} & ComponentProps<'base'> & RouteComponentProps;

type PostPartState = {
  post: Blotter.Post | undefined;
  anchors: AnchorType[];
};

class PostPart extends React.Component<PostPartProps, PostPartState> {
  constructor(props: PostPartProps) {
    super(props);
    this.state = { post: undefined, anchors: [] };
  }

  componentDidMount() {
    request('get', '/api/post', { url: 'wsl2_systemd' }, (data: Blotter.Post) => {
      this.setState(() => ({ post: data }));
      this.find_anchor(data.content);
    });
  }

  find_anchor = (text: string) => {
    var re = new RegExp(`<h([1-6]) id="(.*)">(.*)</h\\1>`, 'g');
    var result_list: AnchorType[] = [];

    do {
      var result = re.exec(text);
      console.log(result);
      if (result !== null) {
        result_list.push({
          id: `#${result[2]}`,
          name: result[3],
          level: parseInt(result[1]),
          children: [],
        });
      }
    } while (result);

    var anchors: AnchorType[] = [];

    var insert = (lst: AnchorType[], value: AnchorType) => {
      console.log(lst, value);
      if (lst.length > 0 && lst[lst.length - 1].level < value.level) {
        insert(lst[lst.length - 1].children, value);
      } else {
        lst.push(value);
      }
    };

    result_list.map((anchor: AnchorType) => {
      insert(anchors, anchor);
    });

    console.log(anchors);

    this.setState({ anchors: anchors });
  }

  render_post = () => {
    if (this.state.post === undefined) {
      return <Skeleton active={true} />;
    } else {
      return (
        <article>
          <PageHeader title={this.state.post.title}>
            <div>
              <div className="right20">
                <Icon type="eye" className="right5" />
                {this.state.post.view}
              </div>
              <div className="right20">
                <Icon type="calendar" className="right5" />
                {this.state.post.publish_time}
              </div>
              {this.state.post.publish_time == this.state.post.edit_time ? null : (
                <div className="right20">
                  <Icon type="edit" className="right5" />
                  {this.state.post.edit_time}
                </div>
              )}

              <blockquote>{this.state.post.abstract}</blockquote>
            </div>
          </PageHeader>

          <section dangerouslySetInnerHTML={{ __html: this.state.post.content }}/>
        </article>
      );
    }
  }

  render_anchor = (anchor: AnchorType) => {
    return (
      <Link key={`${anchor.id}|${anchor.name}`} href={anchor.id} title={anchor.name}>
        {anchor.children.map(this.render_anchor)}
      </Link>
    );
  }

  render() {
    return (
      <Container lg={16}>
        <Card>{this.render_post()}</Card>
        <Anchor
          offsetTop={10}
          style={{ background: 'transparent', position: 'fixed', top: '50px', right: '30px' }}
        >
          {this.state.anchors.map(this.render_anchor)}
        </Anchor>
        ,
      </Container>
    );
  }
}

export default withRouter(PostPart);
