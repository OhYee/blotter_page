declare module '*.css';
declare module '*.png';
declare module '*.svg';
declare module '*.less';

declare type TypeUInT<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

declare namespace Blotter {
  interface User {
    id: string;
    username: string;
    password: string;
    avatar: string;
    token: string;
    email: string;
      qq: string;
      
    ns_id: string;
    ns_name: string;
    ac_name: string;
    ac_island: string;

    permission: number;
    qq_union_id: string;
  }

  interface APIResponse {
    success: boolean;
    title: string;
    content: string;
  }
  interface Menu {
    icon: string;
    name: string;
    link: string;
  }
  interface Tag {
    id: string;
    name: string;
    short: string;
    icon: string;
    color: string;
  }
  interface TagWithCount extends Tag {
    count: number;
  }
  interface PostCard {
    title: string;
    abstract: string;
    view: number;
    url: string;
    publish_time: string;
    edit_time: string;
    tags: Tag[];
    head_image: string;
  }
  interface Post extends PostCard {
    content: string;
    keywords: string[];
  }
  interface PostAll extends Post {
    id: string;
    raw: string;
    published: boolean;
  }
  interface Comment {
    id: string;
    email: string;
    avatar: string;
    time: string;
    content: string;
    reply: string;
    children: Comment[];
    ad: boolean;
    show: boolean;
    recv: boolean;
  }
  interface FriendSimple {
    link: string;
    name: string;
  }
  interface Friend {
    image: string;
    link: string;
    name: string;
    description: string;
    rss: string;
    posts: FriendPost[];
  }
  interface FriendPost {
    title: string;
    link: string;
  }
  interface Variable {
    key: string;
    value: any;
  }
}
