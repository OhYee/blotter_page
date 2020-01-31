export const parseNumberParams = (key: string, location: Location, defaultValue: number = 1) => {
  var query = location.search
    .slice(1)
    .split('&')
    .reduce((obj: { [key: string]: string }, data: string, i: number) => {
      var t = data.split('=');
      obj[t[0]] = t[1];
      return obj;
    }, {});

  var data = parseInt(query[key]);
  if (data < 1 || isNaN(data)) {
    data = defaultValue;
  }
  return data;
};
