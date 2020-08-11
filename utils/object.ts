export function ObjectFilter<T>(obj: T, callback: (key: keyof T, value: T[keyof T]) => boolean) {
  var ret: Partial<T> = {};
  for (var key in obj) {
    const value = obj[key];
    if (callback(key, value)) {
      ret[key] = value;
    }
  }
  return ret;
}
