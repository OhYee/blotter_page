import React from 'react';

import { Affix, Button, Layout, BackTop } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

import HeaderPart from './header';
import SiderPart from './sider';
import FooterPart from './footer';

import styles from './index.less';

class BasicLayout extends React.Component<any, { collapsed: boolean; broken: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { collapsed: true, broken: false };
  }

  onCollapse = (collapsed: boolean, type: string) => {
    if (type == 'responsive') {
      this.setState({ collapsed: true });
    } else {
      this.setState({ collapsed });
    }
  }
  onBreakpoint = (broken: boolean) => {
    this.setState(() => ({ broken: broken }));
    this.setState(() => ({ collapsed: true }));
  }
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
  )

  render() {
    return (
      <Layout
        style={{ minHeight: '100%' }}
        className={this.state.collapsed ? undefined : styles.dimmed}
      >
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
            <SiderPart collapsed={this.state.collapsed} />
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
            <FooterPart />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
