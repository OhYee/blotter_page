import axios from 'axios';

export const requestAsync = async (
  method: 'post' | 'get',
  url: string,
  data: any,
) => {
  var r = await axios({
    method: method,
    url: url,
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
    url: url,
    params: data,
  })
    .then(data => data.data)
    .then(data => callback(data))
    .catch(err => console.log(err));
};
