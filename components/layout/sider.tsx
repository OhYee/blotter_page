import React from 'react';

import Link from 'next/link';

import { Flex } from '@/components/container';
import SVG, { Left, Bar, User, IconName } from '@/components/svg';
import Button from '@/components/button';
import Avatar from '@/components/avatar';
import Popover, { Tooltip } from '@/components/popover';

import { layout, logout, info } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import { setCookie } from '@/utils/storage';
import { GlobalProps, defaultContext } from '@/utils/global';

import styles from './sider.less';
import shadowStyles from '@/styles/shadow.less';
import { LoginModal } from '../login';
import Card from '../card';

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
        <div className={[styles.dimmed].join(' ')} onClick={() => setCollapsed(true)} />
      )}
      <Flex
        className={[styles.sider, ...(collapsed ? [styles.sider_collapsed] : [])].join(' ')}
        mainAxis="flex-start"
        subAxis="flex-start"
      >
        <Flex
          mainAxis="flex-start"
          direction="TB"
          wrap={false}
          className={[shadowStyles.shadow, styles.siderbar].join(' ')}
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
              <Avatar>
                <User />
              </Avatar>
            </a>
          ) : (
            <Popover
              placement="right"
              trigger={['click', 'hover']}
              popoverClass={shadowStyles.shadow}
              popoverStyle={
                {
                  boxShadow: '5px 5px 30px var(--shadow)',
                  ['--popover-backgroud']: 'var(--background)',
                } as React.CSSProperties
              }
              getOffset={() => ({ top: document.documentElement.scrollTop })}
              component={
                <Card style={{ background: 'var(--background)', maxWidth: 200 }}>
                  <Flex direction="TB" fullWidth>
                    <strong>{user.username}</strong>
                    <Flex>
                      <Link href="/user/[username]" as={`/user/${user.username}`}>
                        <a>设置</a>
                      </Link>
                      <a onClick={onLogoutClick}>登出</a>
                      {(user.permission & 1) != 0 ? (
                        <Link href="/admin">
                          <a>管理</a>
                        </Link>
                      ) : null}
                    </Flex>
                  </Flex>
                </Card>
              }
            >
              <span style={{ cursor: 'pointer' }}>
                {user.avatar ? (
                  <Avatar src={user.avatar} />
                ) : (
                  <Avatar>
                    <User />
                  </Avatar>
                )}
              </span>
            </Popover>
          )}
          <Flex.Item style={{ width: '100%' }}>
            <Menus menus={menus} theme={theme} pathname={pathname} />
          </Flex.Item>
        </Flex>
        <div className={styles.button_wrapper}>
          <Button
            primary
            circle
            icon={collapsed ? <Bar /> : <Left />}
            shadow
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      </Flex>
      <LoginModal show={loginModal} onClose={() => setLoginModal(false)} />
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
            <span className={styles.prefix}>
              {item.icon ? <SVG icon={item.icon as IconName} /> : null}
            </span>
            <span className={styles.text}>{item.name}</span>
          </div>
        );
        return (
          <li key={item.link} className={item.link === pathname ? styles.active : ''}>
            <Tooltip
              placement="right"
              title={item.name}
              getOffset={() => ({ top: document.documentElement.scrollTop })}
            >
              {item.link.length > 0 && item.link[0] !== '/' ? (
                <a target="_blank" href={item.link}>
                  {menuItem}
                </a>
              ) : (
                <Link href={item.link}>
                  <a>{menuItem}</a>
                </Link>
              )}
            </Tooltip>
          </li>
        );
      })}
    </Flex>
  );
}
