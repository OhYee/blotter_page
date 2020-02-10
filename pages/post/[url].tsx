import React, { ComponentProps } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import { Card, PageHeader, Skeleton, Icon, Anchor } from 'antd';
const { Link } = Anchor;

import TagPart from '@/components/tag';
import Visiable from '@/components/visiable';
import CommentPart from '@/components/comment';
import Container from '@/components/container';

import { post } from '@/utils/api';
import { GlobalProps, InitialPropsParam } from '@/utils/global';

import styles from './post.less';

interface AnchorType {
  name: string;
  id: string;
  level: number;
  children: AnchorType[];
}

interface PostPageProps extends GlobalProps, ComponentProps<'base'>, WithRouterProps {
  post: Blotter.Post;
  anchors: AnchorType[];
}

interface PostPageState {}

class PostPage extends React.Component<PostPageProps, PostPageState> {
  static defaultProps = {
    anchors: [],
  };

  static async getInitialProps(args: InitialPropsParam) {
    var r = await post(args.query.url);
    var anchors = PostPage.findAnchor(r.content);
    return { post: r, anchors: anchors } as PostPageProps;
  }

  constructor(props: PostPageProps) {
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
    return typeof this.props.post === 'undefined' ? null : (
      <Container lg={16}>
        <Head>
          <title>{`${this.props.post.title}|${this.props.blog_name}`}</title>
        </Head>
        <Card>{this.render_post()}</Card>
        <Card>
          <CommentPart url={`/post/${this.props.router.query.url as string}`} />
        </Card>

        <Visiable visiable_bigger="xl">
          <Anchor
            offsetTop={10}
            style={{
              maxHeight: 'calc(100% - 100px)',
              background: 'transparent',
              position: 'fixed',
              top: '50px',
              right: '30px',
            }}
          >
            {this.props.anchors.map(this.render_anchor)}
          </Anchor>
        </Visiable>
      </Container>
    );
  }
}

export default withRouter(PostPage);
