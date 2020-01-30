export type LocationWithQuery = {
  query: { [key: string]: string };
} & Location;

export const parseNumberParams = (
  key: string,
  location: LocationWithQuery,
  defaultValue: number = 1,
) => {
  var data = parseInt(location.query[key]);
  if (data < 1 || isNaN(data)) {
    data = defaultValue;
  }
  return data;
};
