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
