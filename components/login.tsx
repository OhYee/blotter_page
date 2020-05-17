import React from 'react';

import Link from 'next/link';

import { Form, Input, Button, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined, QqCircleFilled, GithubFilled } from '@ant-design/icons';

import { Space } from '@/components/container';
import QuickLogin from '@/components/auth';

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
        <QuickLogin />
      </Form.Item>
      <Form.Item>
        <Link href="/register">
          <Button loading={loading}>注册</Button>
        </Link>
        <Button type="primary" loading={loading} onClick={loginOK} style={{ float: 'right' }}>
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
