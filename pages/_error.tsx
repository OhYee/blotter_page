import { Component, ComponentProps } from 'react';

import Head from 'next/head';
import { NextPageContext } from 'next';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import Card from '@/components/card';

import { guessPath } from '@/utils/redirect';
import { Context } from '@/utils/global';

import textStyles from '@/styles/text.less';

interface ErrorPageProps extends ComponentProps<'base'>, WithRouterProps {
  status: number;
}
interface ErrorPageState {}

class ErrorPage extends Component<ErrorPageProps, ErrorPageState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  static async getInitialProps(args: NextPageContext) {
    const { res } = args;
    return { status: res.statusCode };
  }

  render() {
    const path = guessPath(this.props.router.asPath);
    const errorMessage = {
      403: <span>你访问了没有权限的页面</span>,
      404: (
        <span>
          找不到页面，大概是重构修改了部分页面的链接，请尝试根据标签或者搜索功能找到对应的内容
        </span>
      ),
      500: (
        <span>
          服务器炸了？<a href={`mailto://${this.context.email}`}>联系我</a>来修复吧
        </span>
      ),
      501: (
        <span>
          没有找到对应的接口，正常而言，正常浏览不会遇到这个错误。如果想要获取博客相关接口，可以查看
          <a href="https://github.com/OhYee/blotter">开源项目</a>
        </span>
      ),
      502: (
        <span>
          网关错误，大概是后端服务器炸了。 <a href={`mailto://${this.context.email}`}>联系我</a>
          来修复吧
        </span>
      ),
    };

    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`发生一个${this.props.status}错误！|${this.context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <h1 className={textStyles.color} style={{ display: 'inline-block', marginRight: 10 }}>
          {`发生一个${this.props.status}错误！`}
        </h1>
        <p className={textStyles.secondary} style={{ display: 'inline-block' }}>
          {errorMessage[this.props.status]}
        </p>

        {this.props.status == 404 && path !== '' ? (
          <strong>
            当前您访问的页面是{this.props.router.asPath}，猜测得出你实际要访问得连接是
            <a href={path}>{path}</a>（纯粹猜测）
          </strong>
        ) : null}

        <p style={{ lineHeight: '2em' }}>
          一般而言，所有发生错误可能的情况如下：
          <ul>
            {Object.keys(errorMessage).map((status) => (
              <li key={status}>
                <strong>{status}错误</strong>,{errorMessage[status]}
              </li>
            ))}
          </ul>
        </p>
      </Card>
    );
  }
}

export default withRouter(ErrorPage);
