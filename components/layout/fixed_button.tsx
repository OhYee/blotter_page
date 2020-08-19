import React from 'react';

import { Modal } from 'antd';
import { Icon } from '@ant-design/compatible';

import changeTheme from 'next-dynamic-antd-theme';

import { Flex } from '@/components/container';
import { Light, Dark, Message, Rocket } from '@/components/svg';
import Button from '@/components/button';

import { Context } from '@/utils/global';

import styles from './fixed_button.less';

function scrollTopAnimation(_currentY?: number) {
  const currentY = !!_currentY
    ? _currentY
    : document.documentElement.scrollTop || document.body.scrollTop;
  const dist = Math.max(10, currentY / 20);
  const newY = Math.max(0, currentY - dist);
  window.scrollTo(0, newY);
  if (newY > 0) {
    setTimeout(() => {
      scrollTopAnimation(newY);
    }, 1);
  }
}

function BackToTop() {
  return (
    <Button circle className="neumorphism" icon={<Rocket />} onClick={() => scrollTopAnimation()} />
  );
}

function Feedback() {
  const context = React.useContext(Context);
  return (
    <Button
      circle
      icon={<Message />}
      className="neumorphism"
      onClick={() => {
        Modal.info({
          title: '反馈Bug！',
          content: (
            <div>
              <p>
                有一个{' '}
                <a href="https://github.com/OhYee/blotter_page/issues" target="__blank">
                  前端的Bug
                </a>
                ，包括但不限于页面渲染不正常
              </p>
              <p>
                有一个{' '}
                <a href="https://github.com/OhYee/blotter/issues" target="__blank">
                  后端的Bug
                </a>
                ，包括但不限于各种功能性故障
              </p>
              <p>
                直接使用
                <a href={`mailto:${context.email}`} target="__blank">
                  {' '}
                  <Icon type="mail" /> 邮件
                </a>{' '}
                反馈bug
              </p>
              <p>
                直接使用
                <a
                  href={`//wpa.qq.com/msgrd?v=3&uin=${context.qq}&site=qq&menu=yes`}
                  target="__blank"
                >
                  {' '}
                  <Icon type="qq" /> QQ
                </a>{' '}
                反馈bug
              </p>
              <p>
                直接在评论区
                <a href="/comment" target="__blank">
                  {' '}
                  <Icon type="comment" /> 评论区
                </a>{' '}
                反馈bug
              </p>
            </div>
          ),
        });
      }}
    />
  );
}

function ChangeTheme() {
  const context = React.useContext(Context);
  const { theme, callback } = context;
  return (
    <Button
      circle
      icon={theme == 'default' ? <Dark /> : <Light />}
      className="neumorphism"
      onClick={() => {
        const newTheme = theme == 'default' ? 'dark' : 'default';
        callback({ theme: newTheme }, () => {
          //   changeTheme(newTheme);
        });
      }}
    />
  );
}

export default function FixedButton() {
  return (
    <div className={styles.fixed_button}>
      <Flex direction="TB">
        <ChangeTheme /> <Feedback /> <BackToTop />
      </Flex>
    </div>
  );
}
