import React, { ComponentProps } from 'react';

import { Card, PageHeader, Skeleton, Icon, Anchor } from 'antd';
const { Link } = Anchor;

import Container from '@/components/container';
import Visiable from '@/components/visiable';
import TagPart from '@/components/tag';
import CommentPart from '@/components/comment';

import styles from './post.less';

import { withRouter, RouteComponentProps } from 'react-router';
import { requestCallback } from '@/utils/request';
import { InitialPropsParam, post } from '@/utils/api';

type AnchorType = {
  name: string;
  id: string;
  level: number;
  children: AnchorType[];
};

type PostPageProps = {
  post: Blotter.Post;
  anchors: AnchorType[];
};

type PostPageState = {};

class PostPage extends React.Component<
  PostPageProps & ComponentProps<'base'> & RouteComponentProps,
  PostPageState
> {
  static defaultProps = {
    anchors: [],
  };
  static async getInitialProps(args: InitialPropsParam) {
    var r = await post(args.route.params.url);
    var anchors = this.findAnchor(r.content);
    return { post: r, anchors: anchors } as PostPageProps;
  }

  constructor(props: PostPageProps & ComponentProps<'base'> & RouteComponentProps) {
    super(props);
    this.state = {};
  }

  static findAnchor(text: string): AnchorType[] {
    var re = new RegExp(`<h([1-6]) id="(.*)">(.*)</h\\1>`, 'g');
    var result_list: AnchorType[] = [];

    do {
      var result = re.exec(text);
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
      if (lst.length > 0 && lst[lst.length - 1].level < value.level) {
        insert(lst[lst.length - 1].children, value);
      } else {
        lst.push(value);
      }
    };

    result_list.map((anchor: AnchorType) => {
      insert(anchors, anchor);
    });

    anchors.push({
      id: '#blotter-comment',
      name: '评论区',
      level: 1,
      children: [],
    });

    return anchors;
  }

  render_post = () => {
    if (this.props.post === undefined) {
      return <Skeleton active={true} />;
    } else {
      return (
        <article className={styles.post}>
          <PageHeader className="shadow" title={this.props.post.title}>
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
              <blockquote>{this.props.post.abstract}</blockquote>
              <div>
                <Icon type="tag" className="right20" />
                {this.props.post.tags.map((tag: Blotter.Tag) => (
                  <TagPart key={tag.short} tag={tag} />
                ))}
              </div>
            </div>
          </PageHeader>

          <section
            className="post-content"
            dangerouslySetInnerHTML={{ __html: this.props.post.content }}
          />
        </article>
      );
    }
  };

  render_anchor = (anchor: AnchorType) => {
    return (
      <Link key={`${anchor.id}|${anchor.name}`} href={anchor.id} title={anchor.name}>
        {anchor.children.map(this.render_anchor)}
      </Link>
    );
  };

  render() {
    return (
      <Container lg={16}>
        <Card>{this.render_post()}</Card>
        <Card>
          <CommentPart url={this.props.location.pathname} />
        </Card>

        <Visiable visiable_bigger="xl">
          <Anchor
            offsetTop={10}
            targetOffset={window.innerHeight / 3}
            style={{ background: 'transparent', position: 'fixed', top: '50px', right: '30px' }}
          >
            {this.props.anchors.map(this.render_anchor)}
          </Anchor>
        </Visiable>
      </Container>
    );
  }
}

export default withRouter(PostPage);
