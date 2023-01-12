import { message } from '@/components/notification';
import axios from 'axios';

// 超时时间 15 秒
axios.defaults.timeout = 15 * 1000;

export const backendURI = !!process.env['backendURI'] ||  'http://127.0.0.1:50000'

function parseURL(url: string): string {
  return backendURI + url;
}

// export const requestAsync = async (method: 'post' | 'get', url: string, data: any) => {
//   var r = await axios({
//     method: method,
//     url: parseURL(url),
//     params: data,
//   });
//   return r.data;
// };

// export const requestCallback = (
//   method: 'post' | 'get',
//   url: string,
//   data: any,
//     callback: (data: any) => void,
//   ignore_exception?:boolean,
// ) => {
//   axios({
//     method: method,
//     url: parseURL(url),
//     params: data,
//   })
//     .then((data) => data.data)
//     .then((data) => callback(data))
//     .catch((err) => console.log(err));
// };

export const request = async <T>(
  method: 'post' | 'get',
  url: string,
  data: any,
  callback?: (data: T) => void,
  ignore_exception?: boolean, // 不直接直接提醒异常
): Promise<T> => {
  ignore_exception = typeof ignore_exception === 'undefined' ? false : ignore_exception;
  try {
    var r = await axios({
      method: method,
      url: parseURL(url),
      params: method === 'get' ? data : undefined,
      data: method === 'post' ? data : undefined,
      withCredentials: true,
    });
  } catch (e) {
    console.log(e);
    if (!ignore_exception) {
      if (typeof document !== 'undefined')
        message({ title: '请求发生错误', content: `${e}`, alertType: 'error' });
      throw e;
    }
  }

  if (!!callback) {
    callback(r.data);
  }
  return r.data;
};
