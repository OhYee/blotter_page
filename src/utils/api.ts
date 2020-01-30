import { request, requestAsync, requestCallback } from '@/utils/request.ts';

export const archives = async (page: number, size: number, callback?: (data: any) => void) => {
  return await request(
    'post',
    '/api/posts',
    {
      type: 'index',
      number: size,
      offset: (page - 1) * size,
    },
    callback,
  );
};

export const tagPosts = async (page: number, size: number, callback?: (data: any) => void) => {
  return await request(
    'post',
    '/api/posts',
    {
      type: 'tag',
      number: size,
      offset: (page - 1) * size,
      arg: 'tag',
    },
    callback,
  );
};
