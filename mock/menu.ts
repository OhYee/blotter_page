export default {
  // 支持值为 Object 和 Array
  'POST /api/menu': <ResponseMenu>{
    menu_list: [
      {
        name: '首页',
        icon: 'home',
        link: '/',
      },
      {
        name: '归档',
        icon: 'container',
        link: '/archive',
      },
      {
        name: '标签',
        icon: 'tag',
        link: '/tag',
      },
      {
        name: '评论区',
        icon: 'message',
        link: '/comment',
      },
      {
        name: '关于',
        icon: 'idcard',
        link: '/about',
      },
      {
        name: '后台',
        icon: 'setting',
        link: '/setting',
      },
    ],
  },
};
