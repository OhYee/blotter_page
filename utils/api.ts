import { request } from '@/utils/request';

type RequestCallback<T> = (data: T) => void;
type PostCardWithTotal = {
  total: number;
  posts: Blotter.PostCard[];
};

export const posts = async (
  params: {
    number?: number;
    offset?: number;
    tag?: string;
    sort_field?: string;
    sort_type?: -1 | 1;
  },
  callback?: RequestCallback<PostCardWithTotal>,
) => {
  return await request('get', '/api/posts', params, callback);
};

export const indexPosts = async (callback?: RequestCallback<PostCardWithTotal>) => {
  return await posts({ offset: 0, number: 10 }, callback);
};

export const archives = async (
  page: number,
  size: number,
  callback?: RequestCallback<PostCardWithTotal>,
) => {
  return await posts({ offset: (page - 1) * size, number: size }, callback);
};

export const tagPosts = async (
  tag: string,
  page: number,
  size: number,
  callback?: RequestCallback<PostCardWithTotal>,
) => {
  return await posts({ offset: (page - 1) * size, number: size, tag }, callback);
};

export const adminPosts = async (
  page: number,
  size: number,
  field: string,
  up: boolean,
  callback?: RequestCallback<PostCardWithTotal>,
) => {
  return await posts(
    {
      offset: (page - 1) * size,
      number: size,
      sort_field: field,
      sort_type: up ? 1 : -1,
    },
    callback,
  );
};

export const friends = async (callback?: RequestCallback<Blotter.Friend[]>) => {
  return await request('get', '/api/friends', {}, callback);
};

export const layout = async (
  callback?: RequestCallback<{
    menus: Blotter.Menu[];
    view: number;
    beian: string;
    blog_name: string;
  }>,
) => {
  return await request('get', '/api/layout', {}, callback);
};

export const tags = async (
  callback?: RequestCallback<{ total: number; tags: Blotter.TagWithCount[] }>,
) => {
  return await request('get', '/api/tags', {}, callback);
};

export const post = async (url: string, callback?: RequestCallback<Blotter.Post>) => {
  return await request('get', '/api/post', { url }, callback);
};

export const adminPost = async (url: string, callback?: RequestCallback<Blotter.PostAll>) => {
  return await request('get', '/api/admin/post', { url }, callback);
};

export const comments = async (
  url: string,
  callback?: RequestCallback<{ total: number; comments: Blotter.Comment[] }>,
) => {
  return await request('get', '/api/comments', { url }, callback);
};

export const avatar = async (email: string, callback?: RequestCallback<{ avatar: string }>) => {
  return await request('get', '/api/avatar', { email }, callback);
};

export declare type AddCommentArgs = {
  url: string;
  reply: string;
  email: string;
  recv: boolean;
  raw: string;
};

export const addComment = async (
  args: AddCommentArgs,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('get', '/api/comment/add', args, callback);
};

export const markdown = async (source: string, callback?: RequestCallback<{ html: string }>) => {
  return await request('get', '/api/markdown', { source }, callback);
};

export const tagsSearch = async (
  keyword: string,
  callback?: RequestCallback<{ total: number; tags: Blotter.Tag[] }>,
) => {
  return await request('get', '/api/tags', { keyword, number: 10, offset: 0 }, callback);
};

export const login = async (
  username: string,
  password: string,
  callback?: RequestCallback<Blotter.APIResponse & { token: string }>,
) => {
  return await request('get', '/api/login', { username, password }, callback);
};

export const logout = async (callback?: RequestCallback<Blotter.APIResponse>) => {
  return await request('get', '/api/logout', {}, callback);
};

export const info = async (callback?: RequestCallback<{ token: string }>) => {
  return await request('get', '/api/info', {}, callback);
};
