import React from 'react';

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
}
