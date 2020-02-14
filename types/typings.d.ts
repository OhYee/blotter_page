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
    children: Comment[];
    ad: boolean;
    show: boolean;
    recv: boolean;
  }
  interface Site {
    view: number;
    beian: string;
    friends: FriendSimple[];
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
    posts: { title: string; link: string }[];
  }
}
