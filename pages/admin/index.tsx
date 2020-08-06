import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card, List, Typography } from 'antd';

import Container from '@/components/container';

import { Context } from '@/utils/global';
import Link from 'next/link';

interface AdminIndexProps extends ComponentProps<'base'> {}

interface AdminIndexState {}

class AdminIndex extends React.Component<AdminIndexProps, AdminIndexState> {
  static defaultProps = {};

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <Container>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <List
            dataSource={[
              { title: '标签管理', url: '/admin/tags' },
              { title: '文章管理', url: '/admin/posts' },
              { title: '订阅管理', url: '/admin/friends' },
              { title: '菜单管理', url: '/admin/menus' },
              { title: '变量管理', url: '/admin/variables' },
              { title: '评论管理', url: '/admin/comments' },
              { title: '用户管理', url: '/admin/users' },
              { title: '游记管理', url: '/admin/travels' },
              { title: '上传管理', url: '/admin/upload' },
            ]}
            renderItem={(item) => (
              <List.Item key={item.title}>
                <Typography.Text>
                  <Link href={item.url}>
                    <a>{item.title}</a>
                  </Link>
                </Typography.Text>
              </List.Item>
            )}
          />
        </Card>
      </Container>
    );
  }
}

export default AdminIndex;
