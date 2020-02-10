export const makeQuery = (search: string) => {
  var t = search.split('?');
  return t.length > 1
    ? t[1].split('&').reduce((obj: { [key: string]: string }, data: string, i: number) => {
        var t = data.split('=');
        obj[t[0]] = t[1];
        return obj;
      }, {})
    : {};
};

export const parseNumberParams = (key: string, search: string, defaultValue: number = 1) => {
  var query = makeQuery(search);
  var data = parseInt(query[key]);
  if (data < 1 || isNaN(data)) {
    data = defaultValue;
  }
  return data;
};

export const parseStringParams = (key: string, search: string) => {
  var query = makeQuery(search);
  return query[key];
};
