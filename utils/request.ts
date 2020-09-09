import { message } from '@/components/notification';
import axios from 'axios';

function parseURL(url: string): string {
  return (url.length > 0 && url[0] !== '/') || typeof document !== 'undefined'
    ? url
    : 'http://127.0.0.1:50000' + url;
}

export const requestAsync = async (method: 'post' | 'get', url: string, data: any) => {
  var r = await axios({
    method: method,
    url: parseURL(url),
    params: data,
  });
  return r.data;
};

export const requestCallback = (
  method: 'post' | 'get',
  url: string,
  data: any,
  callback: (data: any) => void,
) => {
  axios({
    method: method,
    url: parseURL(url),
    params: data,
  })
    .then((data) => data.data)
    .then((data) => callback(data))
    .catch((err) => console.log(err));
};

export const request = async <T>(
  method: 'post' | 'get',
  url: string,
  data: any,
  callback?: (data: T) => void,
): Promise<T> => {
  try {
    var r = await axios({
      method: method,
      url: parseURL(url),
      params: method === 'get' ? data : undefined,
      data: method === 'post' ? data : undefined,
    });
  } catch (e) {
    console.log(e);
    if (typeof document !== 'undefined') {
      message({ title: '请求发生错误', content: `${e}`, alertType: 'error' });
    }
    throw e;
  }

  if (callback) {
    callback(r.data);
  }
  return r.data;
};
