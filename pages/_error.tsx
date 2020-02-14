import { Component, ComponentProps } from 'react';

import Head from 'next/head';
import { NextPageContext } from 'next';

import { Card, PageHeader, Typography, Result } from 'antd';

import Container from '@/components/container';

import { Context } from '@/utils/global';

interface ErrorPageProps extends ComponentProps<'base'> {
  status: number;
}
interface ErrorPageState {}

export default class ErrorPage extends Component<ErrorPageProps, ErrorPageState> {
  static async getInitialProps(args: NextPageContext) {
    const { res } = args;
    return { status: res.statusCode };
  }

  render() {
    return (
      <Container>
        <Context.Consumer>
          {context => (
            <Head>
              <title>{`发生一个${this.props.status}错误！|${this.context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <PageHeader
            title={`发生一个${this.props.status}错误！`}
            subTitle={'请按照下面的方法来排查问题'}
          />
          <Typography.Paragraph style={{ lineHeight: '2em' }}>
            一般而言，发生错误可能的情况如下：
            <ul>
              <li>403错误：你访问了没有权限的页面</li>
              <li>
                404错误：找不到页面，大概是重构修改了部分页面的链接，请尝试根据标签或者搜索功能找到对应的内容
              </li>
              <li>
                500错误：服务器炸了？<a href="mailto://oyohyee@oyohyee.com">联系我</a>来修复吧
              </li>
              <li>
                501错误：没有找到对应的接口，正常而言，正常浏览不会遇到这个错误。如果想要获取博客相关接口，可以查看
                <a href="https://github.com/OhYee/blotter">开源项目</a>
              </li>
              <li>
                502错误：网关错误，大概是后端服务器炸了。
                <a href="mailto://oyohyee@oyohyee.com">联系我</a>来修复吧
              </li>
            </ul>
          </Typography.Paragraph>
        </Card>
      </Container>
    );
  }
}
