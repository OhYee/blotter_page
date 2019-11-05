declare module '*.css';
declare module '*.png';
declare module '*.svg';
declare module '*.less';

declare type ResponseMenuObject = {
  icon: string;
  name: string;
  link: string;
};

declare type ResponseMenu = {
  menu_list: ResponseMenuObject[];
};

declare namespace Blotter {
  type Tag = {
    name: string;
    id: string;
    icon: string;
    color: string;
  };
  type PostCard = {
    title: string;
    abstract: string;
    view: number;
    url: string;
    publish_time: string;
    edit_time: string;
    tags: Tag[];
    head_image: string;
  };
  type Post = {
    title: string;
    abstract: string;
    view: number;
    url: string;
    publish_time: string;
    edit_time: string;
    tags: Tag[];
    head_image: string;
    content: string;
  };
  type Comment = {
    id: number;
    email: string;
    avatar: string;
    date: string;
    content: string;
    children: Comment[];
  };
  type Site = {
    view: number;
    beian: string;
    friends: FriendSimple[];
  };
  type FriendSimple = {
    link: string;
    name: string;
  };
  type Friend = {
    image: string;
    link: string;
    name: string;
    description: string;
    posts: { title: string; link: string }[];
  };
}
