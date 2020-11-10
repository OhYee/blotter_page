declare module '*.css';
declare module '*.png';
declare module '*.svg';
declare module '*.less';
declare module '*.sass';
declare module '*.scss';

declare type TypeUInT<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type TypeUHasKeyOfT<T, U> = {
  [K in keyof T]?: T[K] extends U[K] ? T[K] : T[K] | U[K];
};

declare type TypeTReplaceByU<T, U extends TypeUHasKeyOfT<T, U>> = {
  [K in keyof T]: { K: T[K] } extends U[K] ? T[K] : U[K];
};

declare type Combine<T, U> = Omit<U, keyof T> & T;

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
    qq_connected: boolean;
    github_connected: boolean;

    self: boolean;
    existed: boolean;
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
    description: string;
  }
  interface TagWithCount extends Tag {
    count: number;
  }
  interface PostCard {
    title: string;
    abstract: string;
    view: number;
    url: string;
    publish_time: number;
    edit_time: number;
    tags: Tag[];
    head_image: string;
    length: number;
  }
  interface Post extends PostCard {
    content: string;
    keywords: string[];
    images: string[];
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
    error: boolean;
  }
  interface FriendPost {
    title: string;
    link: string;
    time: number;
  }
  interface Variable {
    key: string;
    value: any;
  }
  interface Variables {
    ad_inner: string;
    ad_show: string;
    ad_text: string;
    author: string;
    avatar: string;
    awards: string;
    beian: string;
    blog_name: string;
    description: string;
    edu: string;
    email: string;
    from: int;
    github: string;
    github_id: string;
    github_redirect: string;
    github_secret: string;
    grey: boolean;
    head: string;
    qiniu_access_key: string;
    qiniu_prefix: string;
    qiniu_secret_key: string;
    qiniu_static_domain: string;
    qq: string;
    qq_id: string;
    qq_key: string;
    qq_redirect: string;
    qqrobot: string;
    quote: string;
    root: string;
    smtp_address: string;
    smtp_password: string;
    smtp_user: string;
    smtp_username: string;
    view: int;
    vmess: string;
    zhihu: string;
  }

  interface City {
    name: string;
    lng: number;
    lat: number;
    zoom: number;
    travels: {
      time: number;
      link: string;
    }[];
  }
  interface Travel {
    name: string;
    lng: number;
    lat: number;
    zoom: number;
    time: number;
    link: string;
  }
  interface File {
    key: string;
    link: string;
    size: number;
    time: number;
    new_key?: string;
  }
}
