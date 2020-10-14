import moment from 'moment';
moment.locale('zh-cn');

export default moment;

export function formatSecond(time: number) {
  return formatDate(time * 1000);
}

export function formatMilliseconds(time) {
  return formatDate(time);
}

export function formatDate(time: number | string) {
  const datetime = new Date(time);
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const day = datetime.getDate();
  const hour = datetime.getHours();
  const minute = datetime.getMinutes();
  const second = datetime.getSeconds();
  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}
