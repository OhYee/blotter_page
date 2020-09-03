import React from 'react';

import Link from 'next/link';

import { Flex } from '@/components/container';
import QuickLogin from '@/components/auth';
import Button from '@/components/button';
import { Modal } from '@/components/popover';
import Input from '@/components/input';
import { User, Lock } from '@/components/svg';

import { login } from '@/utils/api';
import { Context } from '@/utils/global';
import ShowNotification from '@/utils/notification';

export default function Login(props: { onClose?: () => void }) {
  const [loading, setLoading] = React.useState(false);
  const context = React.useContext(Context);
  //   const [getUsername, setGetUsername] = React.useState<() => string>(() => () => '');
  //   const [getPassword, setGetPassword] = React.useState<() => string>(() => () => '');
  var getUsername = () => '';
  var getPassword = () => '';

  const loginOK = React.useCallback(() => {
    setLoading(true);
    // var { username, password } = formRef.current.getFieldsValue(['username', 'password']);
    console.log(getUsername, getPassword);
    const username = getUsername();
    const password = getPassword();
    login(username, password)
      .then((r) => {
        if (ShowNotification(r)) {
          context.callback({ user: r.user });
          if (!!props.onClose) props.onClose();
        }
      })
      .finally(() => setLoading(false));
  }, [setLoading, props.onClose, getUsername, getPassword]);

  return (
    <Flex direction="TB" mainSize="large" fullWidth style={{ minWidth: '50vw' }}>
      <Input
        prefix={<User />}
        placeholder="用户名"
        style={{ width: '100%' }}
        getValueCallback={(cb) => (getUsername = cb)}
      />
      <Input
        type="password"
        prefix={<Lock />}
        placeholder="密码"
        style={{ width: '100%' }}
        onEnterPressed={loginOK}
        getValueCallback={(cb) => (getPassword = cb)}
      />
      <QuickLogin />
      <Flex>
        <Link href="/register">
          <Button neumorphism onClick={(e) => props.onClose()}>
            注册
          </Button>
        </Link>
        <Button neumorphism primary loading={loading} onClick={loginOK}>
          登录
        </Button>
      </Flex>
    </Flex>
  );
}

export function LoginModal(props: { show: boolean; onClose?: () => void }) {
  return (
    <Modal show={props.show} onClose={props.onClose}>
      <Login onClose={props.onClose} />
    </Modal>
  );
}
