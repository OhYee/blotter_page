import React from 'react';
import getConfig from 'next/config';

import { formatDate } from './time';

export const defaultContext: GlobalProps = {
  callback: () => {},
  menus: [],
  beian: '',
  view: 0,
  blog_name: 'blotter',
  email: '',
  qq: '',
  github: '',
  //   token: '',
  friends: [],
  big_screen: false,
  theme: 'default',
  grey: false,
  root: '',
  author: '',
  avatar: '',
  from: '',
  head: '',
  ad_show: '',
  ad_inner: '',
  ad_text: '',
  front_version:  formatDate(getConfig().publicRuntimeConfig.version),
  back_version: 'UNKNOWN',
  user: {
    id: '000000000000000000000000',
    username: '',
    password: '',
    avatar: '',
    token: '',
    email: '',
    qq: '',
    ns_id: '',
    ns_name: '',
    ac_name: '',
    ac_island: '',
    permission: 0,
    existed: false,
    qq_connected: false,
    github_connected: false,
    self: false,
  },
};

export const Context = React.createContext(defaultContext);

export declare interface GlobalProps {
  callback: (props: Partial<GlobalProps>, callback?: () => void) => void;
  menus: Blotter.Menu[];
  beian: string;
  view: number;
  blog_name: string;
  email: string;
  qq: string;
  github: string;
  //   token: string;
  friends: Blotter.FriendSimple[];
  big_screen: boolean;
  theme: 'default' | 'dark';
  grey: boolean;
  root: string;
  user: Blotter.User;
  author: string;
  avatar: string;
  from: string;
  head: string;
  ad_show: string;
  ad_inner: string;
  ad_text: string;
  front_version: string;
  back_version: string;
}

export function getTimeTheme() {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? 'dark' : 'default';
}
