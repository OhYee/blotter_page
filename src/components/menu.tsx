import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Menu, Icon, Modal, Form, Input, notification } from 'antd';
import Link from 'umi/link';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';

import { login, logout, info } from '@/utils/api';
import ShowNotification from '@/utils/notification';

interface MenuProps extends FormComponentProps {
  menus: Blotter.Menu[];
  token: string;
  dispatch: (args: { type: string; [key: string]: any }) => void;
}
interface MenuState {
  loginModel: boolean;
  password: string;
  okDisabled: boolean;
}

class MenuPart extends React.Component<MenuProps & RouteComponentProps, MenuState> {
  static defaultProps = { menus: [] };

  constructor(props: MenuProps & RouteComponentProps) {
    super(props);
    this.state = { loginModel: false, password: '', okDisabled: false };
    info(data => {
      this.props.dispatch({ type: 'token/set', token: data.token });
    });
    console.log('token', this.props.token);
  }

  onLoginClick = () => {
    this.setState({ loginModel: true });
  };

  onLogoutClick = async () => {
    var r = await logout();
    if (ShowNotification(r)) {
      this.props.dispatch({ type: 'token/set', token: '' });
    }
  };

  loginOK = async () => {
    console.log(this.props.form.getFieldValue('password'));
    this.setState({ okDisabled: true });
    var { username, password } = this.props.form.getFieldsValue(['username', 'password']);
    var r = await login(username, password);
    this.props.dispatch({ type: 'token/set', token: r.token });
    if (ShowNotification(r)) {
      this.setState({ loginModel: false, okDisabled: false });
    } else {
      this.setState({ okDisabled: false });
    }
  };
  loginCancel = () => {
    this.setState({ loginModel: false });
  };

  render() {
    var hasLogin = this.props.token !== '';
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
                                <span> {item.name}</span>
              </Link>
            </Menu.Item>
          );
        })}
        {hasLogin ? (
          <Menu.Item key="login" onClick={this.onLoginClick}>
            <Link to="/admin">
              <Icon type="setting" />
                        <span>后台</span>
            </Link>
          </Menu.Item>
        ) : null}
        {!hasLogin ? (
          <Menu.Item key="login" onClick={this.onLoginClick}>
            <Icon type="login" />
                      <span>登录</span>
          </Menu.Item>
        ) : (
          <Menu.Item key="logout" onClick={this.onLogoutClick}>
            <Icon type="logout" />
                      <span>登出</span>
          </Menu.Item>
        )}
                
        <Modal
          title="登录"
          visible={this.state.loginModel}
          onOk={this.loginOK}
          onCancel={this.loginCancel}
          okButtonProps={{ disabled: this.state.okDisabled }}
        >
          <Form>
            <Form.Item>
              {this.props.form.getFieldDecorator('username')(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {this.props.form.getFieldDecorator(`password`)(
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="密码"
                />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Menu>
    );
  }
}

export default Form.create<MenuProps>({ name: 'MenuPart' })(
  withRouter(
    connect(
      (state: any) => {
        console.log(state);
        return { token: state.token };
      },
      (dispatch: (args: { type: string; [key: string]: any }) => void) => ({ dispatch }),
    )(MenuPart),
  ),
);
