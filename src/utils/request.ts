import axios from 'axios';

export const request = (url: string, data: any, callback: (data: any) => void) => {
  axios
    .post(url, data)
    .then(value => value.data)
    .then(data => callback(data))
    .catch(err => console.log(err));
};
