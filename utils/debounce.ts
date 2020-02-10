/* 忽略打字过程中的查询 */
var _timer: { [key: string]: NodeJS.Timeout } = {};

export function waitUntil(id: string, callback: () => void, time: number) {
  if (_timer[id]) {
    clearTimeout(_timer[id]);
    delete _timer[id];
  }
  _timer[id] = setTimeout(() => {
    callback();
    delete _timer[id];
  }, time);
}
