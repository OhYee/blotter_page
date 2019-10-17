import React from 'react';
import MenuPart from '../components/menu';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

import { request } from '../utils/request';
import { ReactComponent as Logo } from '../assets/logo.svg';

import HeaderPart from './header';
import SiderPart from './sider';
import FooterPart from './footer';

class BasicLayout extends React.Component<any, { menu_list: ResponseMenuObject[] }> {
  constructor(props: any) {
    super(props);
    this.state = { menu_list: [] };
  }

  componentDidMount() {
    request('/api/menu', {}, (data: ResponseMenu) => {
      this.setState(state => ({ menu_list: data.menu_list }));
    });
  }

  render() {
    return (
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0" trigger={null}>
          <SiderPart />
        </Sider>
        <Layout>
          <Header>
            <HeaderPart />
          </Header>
          <Content>{this.props.children}</Content>
          <Footer>
            <FooterPart />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
