import { RequestCallback } from '@/utils/api';
import { request } from '@/utils/request';
import { Queue } from '@/extensions/queue/types.d';

export const getAll = async (
  all: boolean,
  page: number,
  size: number,
  callback?: RequestCallback<{ total: number; queues: Queue[] }>,
) => {
  return await request(
    'get',
    `/api/extensions/queue/get_all`,
    { all, offset: (page - 1) * size, number: size },
    callback,
  );
};

export const get = async (id: string, callback?: RequestCallback<{ queue: Queue }>) => {
  return await request('get', `/api/extensions/queue/get`, { id }, callback);
};

export const create = async (
  max: number,
  password: string,
  description: string,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request(
    'get',
    `/api/extensions/queue/create`,
    { max, password, description },
    callback,
  );
};

export const update = async (
  id: string,
  max: number,
  password: string,
  description: string,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request(
    'get',
    `/api/extensions/queue/update`,
    { id, max, password, description },
    callback,
  );
};

export const finish = async (id: string, callback?: RequestCallback<Blotter.APIResponse>) => {
  return await request('get', `/api/extensions/queue/finish`, { id }, callback);
};

export const insert = async (id: string, callback?: RequestCallback<Blotter.APIResponse>) => {
  return await request('get', `/api/extensions/queue/insert`, { id }, callback);
};

export const land = async (
  queue_id: string,
  member_id: string,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('get', `/api/extensions/queue/land`, { queue_id, member_id }, callback);
};


export const out = async (
  queue_id: string,
  member_id: string,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('get', `/api/extensions/queue/out`, { queue_id, member_id }, callback);
};
