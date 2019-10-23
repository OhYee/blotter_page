import React, { Props } from 'react';

import { Menu, Icon } from 'antd';
import { requestCallback } from '@/utils/request';
import { RouteComponentProps, withRouter } from 'react-router';

import router from 'umi/router';
import Link from 'umi/link';

import { ClickParam } from 'antd/lib/menu';

type MenuProps = {} & RouteComponentProps;
type MenuState = { menu_list: ResponseMenuObject[]; collapsed: boolean };

class MenuPart extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = { menu_list: [], collapsed: false };
  }

  componentDidMount() {
    requestCallback('post', '/api/menu', {}, (data: ResponseMenu) => {
      this.setState(() => ({ menu_list: data.menu_list }));
    });
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
            <Menu.Item key={item.link}>
              <Link to={item.link}>
                {item.link ? <Icon type={item.icon} /> : null}
                <span> {item.name}</span>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

var MenuPartWithRoute = withRouter(MenuPart);
export default MenuPartWithRoute;
