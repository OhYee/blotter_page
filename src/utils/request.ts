import axios from 'axios';

const domain = 'http://127.0.0.1:50000';

function parseURL(url: string): string {
  return domain + url;
  //   return url == '/api/friends' || url == '/api/menu' || url == '/api/post' || url == '/api/posts' || url == '/api/comments'
  //     ? domain + url
  //     : url;
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
    .then(data => data.data)
    .then(data => callback(data))
    .catch(err => console.log(err));
};

export const request = async <T>(
  method: 'post' | 'get',
  url: string,
  data: any,
  callback?: (data: T) => void,
): Promise<T> => {
  var r = await axios({
    method: method,
    url: parseURL(url),
    params: data,
  });
  if (callback) {
    callback(r.data);
  }
  return r.data;
};
