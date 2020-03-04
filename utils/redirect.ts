export const guessPath = (pathname: string) => {
  var path = '';
  var hasPrefix = (s: string, prefix: string) => {
    const l = prefix.length;
    return s.length >= l && s.slice(0, l) === prefix;
  };
  var hasSuffix = (s: string, suffix: string) => {
    const l = s.length;
    const l2 = suffix.length;
    return l >= l2 && s.slice(l - l2) === suffix;
  };

  if (hasPrefix(pathname, '/post/')) {
    var url = pathname
      .slice(6)
      .toLocaleLowerCase()
      .replace('/', '_');
    url = hasSuffix(url, '.html') ? url.slice(0, url.length - 5) : url;
    path = `/post/${url}`;
  }
  if (hasPrefix(pathname, '/tag/')) {
    var url = pathname
      .slice(5)
      .toLocaleLowerCase()
      .replace('/', '_');
    url = hasSuffix(url, '.html') ? url.slice(0, url.length - 5) : url;
    path = `/tag/${url}`;
  }
  if (path == pathname) {
    path = '';
  }
  return path;
};
