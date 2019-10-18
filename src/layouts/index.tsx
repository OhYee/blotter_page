import React from 'react';

import { Affix, Button, Layout, BackTop } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

import HeaderPart from './header';
import SiderPart from './sider';
import FooterPart from './footer';

import styles from './index.css';

class BasicLayout extends React.Component<any, { collapsed: boolean; broken: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { collapsed: false, broken: true };
  }

  onCollapse = (collapsed: boolean) => this.setState({ collapsed });
  onBreakpoint = (broken: boolean) => {
    this.setState(() => ({ broken: broken }));
    this.setState(() => ({ collapsed: broken }));
  }
  onCollapseButtonClick = () => this.setState(state => ({ collapsed: !state.collapsed }));

  render() {
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Sider
          theme="light"
          className="shadow"
          trigger={null}
          breakpoint="lg"
          collapsible={true}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          collapsedWidth={this.state.broken ? 0 : 80}
          onBreakpoint={this.onBreakpoint}
        >
          <SiderPart collapsed={this.state.collapsed} />
        </Sider>
        {/* <Header style={{ background: '#666' }}>
            <HeaderPart title="首页" router={{ router: [{ path: '/', breadcrumName: '首页' }] }} />
          </Header> */}
        <Layout>
          <Content>
            {this.props.children}
            <Affix
              style={Object.assign(
                { position: 'absolute', marginLeft: 20, zIndex: 100 },
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
