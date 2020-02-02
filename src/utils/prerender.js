const defaultTitle = 'Blotter';

// 以不同的路径引入模块会有两个不同的作用域
// 因此应该使用global保证`server.js`与`umi.server.js`引入的该文件处于同一作用域
global._siteName = defaultTitle;
global._title = '';

function setSiteName(siteName) {
  global._siteName = siteName;
}

function setTitle(title) {
  global._title = title;
  if (isBroswer()) {
    document.title = getTitle();
  }
}

function getTitle() {
  if (global._title == '') {
    return global._siteName;
  }
  return `${global._title}|${global._siteName}`;
}

function isBroswer() {
  return typeof document !== 'undefined';
}

module.exports = {
  setSiteName,
  setTitle,
  getTitle,
  isBroswer,
};
