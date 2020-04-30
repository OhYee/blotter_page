export function setCookie(key: string, value: string, exdays: number) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = key + '=' + value + '; ' + expires;
}

export function getCookie(key: string) {
  if (typeof document !== 'undefined') {
    var name = key + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function setLocalStorage(key: string, value: string) {
  if (typeof document !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export function getLocalStorage(key: string) {
  if (typeof document !== 'undefined') {
    const value = localStorage.getItem(key);
    if (value != null) {
      return value;
    }
  }
  return '';
}

export function removeLocalStorage(key: string) {
  if (typeof document !== 'undefined') {
    localStorage.removeItem(key);
  }
}

export function clearLocalStorage(key: string) {
  if (typeof document !== 'undefined') {
    localStorage.clear();
  }
}
