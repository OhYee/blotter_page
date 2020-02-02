import React from 'react';
import { Affix, Button, Layout, BackTop } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import HeaderPart from '@/layouts/header';
import SiderPart from '@/layouts/sider';
import FooterPart from '@/layouts/footer';
import { layout } from '@/utils/api';
import { setSiteName, setTitle } from '@/utils/prerender';

import styles from './index.less';

type BasicLayoutProps = { menus: Blotter.Menu[]; beian: string; view: number; blog_name: string };
type BasicLayoutState = { collapsed: boolean; broken: boolean };

class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
  static async getInitialProps(args: any) {
    // console.log('BasicLayout', args);
    var r = await layout();
    return r;
  }

  constructor(props: any) {
    super(props);
    this.state = { collapsed: true, broken: false };
    setSiteName(this.props.blog_name);
    setTitle('首页');
  }

  onCollapse = (collapsed: boolean, type: string) => {
    if (type == 'responsive') {
      this.setState({ collapsed: true });
    } else {
      this.setState({ collapsed });
    }
  };
  onBreakpoint = (broken: boolean) => {
    this.setState(() => ({ broken: broken }));
    this.setState(() => ({ collapsed: true }));
  };
  onCollapseButtonClick = () => this.setState(state => ({ collapsed: !state.collapsed }));

  renderCollapseButton = () => (
    <Affix
      offsetTop={this.state.broken ? window.innerHeight - 60 : 20}
      style={Object.assign(
        { position: 'fixed', marginLeft: 20, zIndex: 100 },
        this.state.broken ? { bottom: 20 } : { top: 20 },
      )}
    >
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={this.state.collapsed ? 'bars' : 'left'}
        className="shadow"
        onClick={this.onCollapseButtonClick}
      />
    </Affix>
  );

  render() {
    return (
      <Layout
        style={{ minHeight: '100%' }}
        className={this.state.collapsed ? undefined : styles.dimmed}
      >
        {/* <DocumentTitle title={this.props.blog_name} /> */}
        <Layout
          className={'shadow'}
          style={{ position: 'fixed', zIndex: 100, height: '100vh', overflow: 'auto' }}
        >
          <Sider
            theme="light"
            trigger={null}
            breakpoint="xl"
            collapsible={true}
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            collapsedWidth={this.state.broken ? 0 : 80}
            onBreakpoint={this.onBreakpoint}
          >
            <SiderPart collapsed={this.state.collapsed} menus={this.props.menus} />
          </Sider>
          <Content>{this.renderCollapseButton()}</Content>
        </Layout>
        {/* <Header style={{ background: '#666' }}>
            <HeaderPart title="首页" router={{ router: [{ path: '/', breadcrumName: '首页' }] }} />
          </Header> */}
        <Layout style={this.state.collapsed ? {} : {}}>
          <Content>
            <div className={styles.main_content}>{this.props.children}</div>
            <BackTop />
          </Content>
          <Footer>
            <FooterPart beian={this.props.beian} view={this.props.view} />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
