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
}
