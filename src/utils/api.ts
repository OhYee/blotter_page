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
  callback?: RequestCallback<{ menus: Blotter.Menu[]; view: number; beian: string }>,
) => {
  return await request('get', '/api/layout', {}, callback);
};
