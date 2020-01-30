import React, { ComponentProps } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RouteData } from 'umi/router';

import PostList from '@/components/post_list';

import { archives } from '@/utils/api';
import { LocationWithQuery, parseNumberParams } from '@/utils/parse';

type ArchivesProps = {
  page: number;
  total: number;
  size: number;
  posts: Blotter.PostCard[];
  rendered: boolean;
};

type ArchivesState = {
  page: number;
  total: number;
  size: number;
  posts: Blotter.PostCard[];
  loading: boolean;
};

export class Archives extends React.Component<
  ArchivesProps & ComponentProps<'base'> & RouteComponentProps,
  ArchivesState
> {
  static defaultProps: ArchivesProps = {
    page: 1,
    total: 1,
    size: 10,
    posts: [],
    rendered: false,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      page: this.props.page,
      total: this.props.total,
      size: this.props.size,
      posts: this.props.posts,
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.rendered) {
      this.setState({ loading: true });
      var page = parseNumberParams('page', this.props.location as any, 1);
      var size = parseNumberParams('size', this.props.location as any, 10);
      archives(page, size, data => {
        this.setState({
          posts: data.posts,
          total: data.total,
          page: page,
          size: size,
          loading: false,
        });
      });
    }
  }

  static async getInitialProps(args: {
    route: RouteData;
    location: LocationWithQuery;
    store?: any;
    isServer: boolean;
    req?: Request;
    res?: Response;
  }) {
    var page = parseNumberParams('page', args.location, 1);
    var size = parseNumberParams('size', args.location, 10);
    var data = await archives(page, size);
    return {
      page: page,
      size: size,
      posts: data.posts,
      total: data.total,
      rendered: true,
    } as ArchivesProps;
  }

  query = async (page: number, size: number) => {
    this.setState({ loading: true });
    var data = await archives(page, size);
    this.setState(() => ({ posts: data.posts, total: data.total, loading: false }));
  };

  onChange = (page: number, size?: number): void => {
    if (size) {
      size = Archives.defaultProps.size;
    }
    this.setState({ page: page, size: size as number }, () => {
      this.props.history.push(`/archives?size=${this.state.size}&page=${this.state.page}`);
      this.query(this.state.page, this.state.size);
    });
  };

  render() {
    return (
      <PostList
        posts={this.state.posts}
        page={this.state.page}
        size={this.state.size}
        total={this.state.total}
        loading={this.state.loading}
        callback={this.onChange}
      />
    );
  }
}

export default withRouter(Archives);
