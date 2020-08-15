import React from 'react';

import Link from 'next/link';

import { Avatar, Layout, Popover, Row, Col, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';

import If from '@/components/if';
import { Flex } from '@/components/container';
import { Left, Bar } from '@/components/svg';
import Button from '@/components/button';

import { layout, logout, info } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import { setCookie } from '@/utils/storage';
import { GlobalProps, defaultContext } from '@/utils/global';

import styles from './sider.less';
import layer from '@/style/layer.less';
import { LoginModal } from '../login';

export default function (props: {
  user: Blotter.User;
  avatar: string;
  big_screen: boolean;
  theme: 'default' | 'dark';
  menus: Blotter.Menu[];
  pathname: string;
  callback: (props: Partial<GlobalProps>, callback?: () => void) => void;
}) {
  const { user, avatar, big_screen, theme: _theme, menus, pathname, callback } = props;
  const theme = _theme === 'default' ? 'light' : 'dark';

  const [collapsed, setCollapsed] = React.useState(true);
  const [loginModal, setLoginModal] = React.useState(false);

  const onLoginClick = () => setLoginModal(true);
  const onLogoutClick = async () => {
    var r = await logout();
    ShowNotification(r);
    setCookie('token', '', 0);
    callback({ user: defaultContext.user });
  };

  return (
    <div>
      {collapsed ? null : (
        <div
          className={[styles.dimmed, layer.mask_layer].join(' ')}
          onClick={() => setCollapsed(true)}
        />
      )}
      <Flex
        className={[
          layer.float_layer,
          styles.sider,
          ...(collapsed ? [styles.sider_collapsed] : []),
        ].join(' ')}
        mainAxis="flex-start"
        subAxis="flex-start"
        mainSize="large"
      >
        <Flex
          mainAxis="flex-start"
          direction="TB"
          className={['shadow', styles.siderbar].join(' ')}
          style={{ width: collapsed ? (big_screen ? 80 : 0) : 200 }}
        >
          <div />

          <img
            src={avatar}
            width="100%"
            height="100%"
            style={{ background: 'white', borderRadius: '100px', maxWidth: '120px' }}
          />
          {!user.existed ? (
            <a onClick={onLoginClick}>
              <Avatar icon={<UserOutlined />} />
            </a>
          ) : (
            <Popover
              placement="right"
              trigger={['click', 'hover']}
              title={user.username}
              content={
                <div>
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                      <Link href="/user/[username]" as={`/user/${user.username}`}>
                        <a>设置</a>
                      </Link>
                    </Col>

                    <Col span={12}>
                      <a onClick={onLogoutClick}>登出</a>
                    </Col>
                  </Row>

                  <If condition={(user.permission & 1) != 0}>
                    <Row gutter={10}>
                      <Col span={12}>
                        <Link href="/admin">
                          <a>管理</a>
                        </Link>
                      </Col>
                    </Row>
                  </If>
                </div>
              }
            >
              <span style={{ cursor: 'pointer' }}>
                {user.avatar ? (
                  <Avatar src={user.avatar} style={{ background: 'unset' }} />
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )}
              </span>
            </Popover>
          )}
          <div />
          <Flex.Item style={{ width: '100%' }}>
            <Menus menus={menus} theme={theme} pathname={pathname} />
          </Flex.Item>
        </Flex>
        <div className={styles.button_wrapper}>
          <Button
            primary
            circle
            size="middle"
            icon={collapsed ? <Bar /> : <Left />}
            className="shadow"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      </Flex>
      <LoginModal
        show={loginModal}
        onCancel={() => setLoginModal(false)}
        callback={(success) => {
          if (success) setLoginModal(false);
        }}
      />
    </div>
  );
}

function Menus(props: { menus: Blotter.Menu[]; theme: 'light' | 'dark'; pathname: string }) {
  const { menus, theme, pathname } = props;
  return (
    <Flex direction="TB" className={styles.menu}>
      {menus.map((item: Blotter.Menu) => {
        const menuItem = (
          <div>
            <span className={styles.prefix}>{item.icon ? <Icon type={item.icon} /> : null}</span>
            <span className={styles.text}>{item.name}</span>
          </div>
        );
        return (
          <li key={item.link} className={item.link === pathname ? styles.active : ''}>
            {item.link.length > 0 && item.link[0] !== '/' ? (
              <a target="_blank" href={item.link}>
                {menuItem}
              </a>
            ) : (
              <Link href={item.link}>
                <a>{menuItem}</a>
              </Link>
            )}
          </li>
        );
      })}
    </Flex>
  );
}
