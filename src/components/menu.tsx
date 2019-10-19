import React, { Props } from 'react';

import { Menu, Icon } from 'antd';
import { request } from '../utils/request';
import { RouteComponentProps, withRouter } from 'react-router';

import router from 'umi/router';
import { ClickParam } from 'antd/lib/menu';

type MenuProps = {} & RouteComponentProps;
type MenuState = { menu_list: ResponseMenuObject[]; collapsed: boolean };

class MenuPart extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = { menu_list: [], collapsed: false };
  }

  componentDidMount() {
    request('/api/menu', {}, (data: ResponseMenu) => {
      this.setState(() => ({ menu_list: data.menu_list }));
    });
  }

  goToPage = (param: ClickParam) => {
    // 在React中使用lambda表达式会导致每一次检测都认为是新的属性，并重新渲染组件
    router.push(param.item.props['click-args']);
  }

  render() {
    return (
      <Menu
        theme="light"
        selectedKeys={[this.props.location.pathname]}
        mode="inline"
        inlineIndent={10}
      >
        {this.state.menu_list.map((item: ResponseMenuObject) => {
          return (
            <Menu.Item key={item.link} onClick={this.goToPage} click-args={item.link}>
              {item.link ? <Icon type={item.icon} /> : null}
              <span> {item.name}</span>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

var MenuPartWithRoute = withRouter(MenuPart);
export default MenuPartWithRoute;
