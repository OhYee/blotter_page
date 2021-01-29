import React, { ComponentProps } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { NextPageContext } from 'next';

import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import PostList from '@/components/post_list';
import { Pre, Next, Dots } from '@/components/svg';
import { A } from '@/components/button';
import Timeline from '@/components/timeline';
import Card from '@/components/card';
import { Flex } from '@/components/container';

import { archives } from '@/utils/api';
import { parseNumberParams } from '@/utils/parse';
import { Context } from '@/utils/global';
import { formatSecond } from '@/utils/time';
import Pagination from '@/components/pagination';
import Tag from '@/components/tag';

import textStyles from '@/styles/text.module.scss';
import { CheckBox, Radio } from '@/components/input';

function pageRender(
  current: number,
  pageNumber: number,
  size: number,
  page: number,
  onChange: (page: number, size: number) => void,
  disabled: boolean,
  extend?: any,
) {
  switch (page) {
    case -2: {
      return (
        <Link href={`/archives?card=${extend ? 1 : 0}&page=${current - 1}&size=${size}`} passHref>
          <A
            disabled={disabled || current - 1 < 1}
            onClick={() => onChange(current - 1, size)}
            icon={<Pre />}
          />
        </Link>
      );
    }
    case -3: {
      return (
        <Link href={`/archives?card=${extend ? 1 : 0}&page=${current + 1}&size=${size}`} passHref>
          <A
            disabled={disabled || current + 1 > pageNumber}
            onClick={() => onChange(current + 1, size)}
            icon={<Next />}
          />
        </Link>
      );
    }
    case -1: {
      return <Dots />;
    }
    default: {
      return (
        <Link href={`/archives?card=${extend ? 1 : 0}&page=${page}&size=${size}`} passHref>
          <A
            disabled={disabled || current === page}
            clicked={current === page}
            onClick={() => onChange(page, size)}
          >
            {page}
          </A>
        </Link>
      );
    }
  }
}

interface ArchivesProps extends ComponentProps<'base'>, WithRouterProps {
  page: number;
  total: number;
  size: number;
  posts: (Blotter.PostCard | undefined)[];
  card: boolean;
}

interface ArchivesState {
  loading: boolean;
}

const timelineSize = 20;
class Archives extends React.Component<ArchivesProps, ArchivesState> {
  static defaultProps = {
    page: 1,
    total: 1,
    size: 10,
    posts: Array(10).fill(undefined),
  };

  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  static async getInitialProps(args: NextPageContext) {
    const card = parseNumberParams('card', args.asPath, 0) != 0;
    const page = parseNumberParams('page', args.asPath, 1);
    const size = parseNumberParams('size', args.asPath, card ? 10 : timelineSize);
    const data = await archives(page, size);
    return {
      page: page,
      size: size,
      posts: data.posts,
      total: data.total,
      card: card,
    } as ArchivesProps;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onChange = (page: number, size: number): void => {
    if (size != this.props.size) {
      const newPage = Math.floor(((this.props.page - 1) * this.props.size) / size + 1);
      Router.push(`/archives?card=${this.props.card ? 1 : 0}&page=${newPage}&size=${size}`);
    }
  };

  render() {
    return (
      <div>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`第${this.props.page}页|归档页|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Flex direction="TB" fullWidth>
          <Card neumorphism>
            <Flex direction="LR" mainAxis="flex-start">
              <CheckBox
                switchStyle={true}
                checkText="卡片"
                uncheckText="时间线"
                value={this.props.card}
                onChange={(value) =>
                  Router.push(
                    `/archives?card=${value ? 1 : 0}&page=${this.props.page}&size=${
                      this.props.size
                    }`,
                  )
                }
              />
              <p>共 {this.props.total} 篇文章</p>
            </Flex>
          </Card>
          {this.props.card ? (
            <PostList
              // header={`共 ${this.props.total} 篇文章`}
              posts={this.props.posts}
              page={this.props.page}
              size={this.props.size}
              total={this.props.total}
              loading={this.state.loading}
              callback={this.onChange}
              pageRender={pageRender}
              pageExtend={this.props.card}
            />
          ) : (
            <Card neumorphism>
              <Flex direction="TB" fullWidth>
                <Timeline
                  direction="TB"
                  data={this.props.posts.map((p) => ({
                    time: formatSecond(p.publish_time),
                    name: (
                      <Flex direction={this.context.big_screen ? 'LR' : 'TB'} subAxis="flex-start" fullWidth={!this.context.big_screen}>
                        <Link href="/post/[url]" as={`/post/${p.url}`}>
                          <a className={textStyles.color} style={{ fontWeight: 'bolder' }}>
                            {p.title}
                          </a>
                        </Link>
                        <Flex direction="LR" mainAxis="flex-end" subSize="middle">
                          {p.tags.map((tag) => (
                            <Tag tag={tag} />
                          ))}
                        </Flex>
                      </Flex>
                    ),
                  }))}
                  style={{
                    gridTemplateColumns: this.context.big_screen
                      ? '150px 25px 1px auto'
                      : '75px 25px 1px auto',
                  }}
                />
                <Pagination
                  page={this.props.page}
                  size={this.props.size}
                  total={this.props.total}
                  disabled={this.state.loading}
                  onChange={this.onChange}
                  render={pageRender}
                  sizeSelect={[10, 20, 30, 40]}
                  extend={this.props.card}
                />
              </Flex>
            </Card>
          )}
        </Flex>
      </div>
    );
  }
}

export default withRouter(Archives);
