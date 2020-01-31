import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';

type MenuProps = { menus: Blotter.Menu[] };
type MenuState = {};

class MenuPart extends React.Component<MenuProps & RouteComponentProps, MenuState> {
  static defaultProps: MenuProps = { menus: [] };

  constructor(props: MenuProps & RouteComponentProps) {
    super(props);
  }

  render() {
    return (
      <Menu
        theme="light"
        selectedKeys={[this.props.location.pathname]}
        mode="inline"
        inlineIndent={10}
      >
        {this.props.menus.map((item: Blotter.Menu) => {
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

export default withRouter(MenuPart);
