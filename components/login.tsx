import React from 'react';

import Link from 'next/link';

import { Form, Input, Button, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '@/utils/api';
import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';

export default function Login(props: { callback?: (boolean) => void }) {
  const [loading, setLoading] = React.useState(false);
  const formRef = React.createRef<FormInstance>();
  const context = React.useContext(Context);

  const loginOK = () => {
    setLoading(true);
    var { username, password } = formRef.current.getFieldsValue(['username', 'password']);

    login(username, password)
      .then((r) => {
        if (ShowNotification(r)) {
          context.callback({ user: r.user });
          if (!!props.callback) props.callback(true);
        } else {
          if (!!props.callback) props.callback(false);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form ref={formRef} wrapperCol={{ span: 24 }}>
      <Form.Item name="username">
        <Input prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password prefix={<LockOutlined />} placeholder="密码" onPressEnter={loginOK} />
      </Form.Item>
      <Form.Item>
        <a href="/api/user/jump_to_qq">
          <img src="http://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" />
        </a>
        <Link href="/register">
          <a target="_blank" style={{ float: 'right' }}>
            注册
          </a>
        </Link>
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" loading={loading} onClick={loginOK}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

export function LoginModal(props: {
  show: boolean;
  onCancel: () => void;
  callback?: (boolean) => void;
}) {
  return (
    <Modal title="登录" visible={props.show} onCancel={props.onCancel} footer={[]}>
      <Login callback={props.callback} />
    </Modal>
  );
}
