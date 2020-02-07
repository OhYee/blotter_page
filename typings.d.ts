declare module '*.css';
declare module '*.png';
declare module '*.svg';
declare module '*.less';

declare namespace Blotter {
  interface APIResponse {
    success: boolean;
    title: string;
    content: string;
  }
  type Menu = {
    icon: string;
    name: string;
    link: string;
  };
  type Tag = {
    name: string;
    short: string;
    icon: string;
    color: string;
  };
  type TagWithCount = Tag & {
    count: number;
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
    id: string;
    email: string;
    avatar: string;
    time: string;
    content: string;
    children: Comment[];
    ad: boolean;
    show: boolean;
    recv: boolean;
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
