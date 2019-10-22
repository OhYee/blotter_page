import axios from 'axios';

export const request = (
  method: 'post' | 'get',
  url: string,
  data: any,
  callback: (data: any) => void,
) => {
  axios({
    method: method,
    url: url,
    params: data,
  })
    .then(value => value.data)
    .then(data => callback(data))
    .catch(err => console.log(err));
};
