import React from 'react';

import { Flex } from '@/components/container';
import { Light, Dark, Message, Rocket, Mail, QQ, Comments } from '@/components/svg';
import Button from '@/components/button';
import { Modal } from '@/components/popover';

import { Context } from '@/utils/global';
import { scrollAnimation } from '@/utils/scroll';

import styles from './fixed_button.module.scss';

function BackToTop() {
  return (
    <Button
      circle
      neumorphism
      icon={<Rocket />}
      onClick={() => scrollAnimation(document.documentElement, 0)}
    />
  );
}

function Feedback() {
  const context = React.useContext(Context);
  return (
    <Button
      circle
      icon={<Message />}
      neumorphism
      onClick={() => {
        Modal.info({
          children: (
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
                  <Mail /> 邮件
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
                  <QQ /> QQ
                </a>{' '}
                反馈bug
              </p>
              <p>
                直接在评论区
                <a href="/comment" target="__blank">
                  {' '}
                  <Comments /> 评论区
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
      neumorphism
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
