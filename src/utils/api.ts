import { request, requestAsync, requestCallback } from '@/utils/request.ts';
import { match } from 'react-router';

export type InitialPropsParam = {
  route: match<any>;
  location: Location;
  store?: any;
  isServer: boolean;
  req?: Request;
  res?: Response;
};

type RequestCallback<T> = (data: T) => void;
type PostCardWithTotal = {
  total: number;
  posts: Blotter.PostCard[];
};
type APIResponse = {
  success: boolean;
  message: string;
};

export const indexPosts = async (callback?: RequestCallback<PostCardWithTotal>) => {
  return await archives(1, 10);
};

export const archives = async (
  page: number,
  size: number,
  callback?: RequestCallback<PostCardWithTotal>,
) => {
  return await request(
    'get',
    '/api/posts',
    {
      type: 'index',
      number: size,
      offset: (page - 1) * size,
    },
    callback,
  );
};

export const tagPosts = async (
  tag: string,
  page: number,
  size: number,
  callback?: RequestCallback<PostCardWithTotal>,
) => {
  return await request(
    'get',
    '/api/posts',
    {
      type: 'tag',
      number: size,
      offset: (page - 1) * size,
      arg: tag,
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

export const addComment = async (args: AddCommentArgs, callback?: RequestCallback<APIResponse>) => {
  return await request('get', '/api/comment/add', args, callback);
};

export const markdown = async (source: string, callback?: RequestCallback<{ html: string }>) => {
  return await request('get', '/api/markdown', { source }, callback);
};
