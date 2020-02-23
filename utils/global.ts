import React from 'react';

export const defaultContext: GlobalProps = {
  callback: () => {},
  menus: [],
  beian: '',
  view: 0,
  blog_name: 'blotter',
  token: '',
  friends: [],
};

export const Context = React.createContext(defaultContext);

export declare interface GlobalProps {
  callback: (props: GlobalProps) => void;
  menus: Blotter.Menu[];
  beian: string;
  view: number;
  blog_name: string;
  token: string;
  friends: Blotter.FriendSimple[];
}
