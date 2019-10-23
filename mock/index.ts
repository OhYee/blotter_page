export default {
  // 支持值为 Object 和 Array
  'POST /api/index/post': {
    posts: [
      {
        title: '这是一篇测试文章',
        abstract: '这篇文章主要用于测试文章卡片',
        url: '/',
        view: 100,
        publish_time: '2019-01-01 15:32:21',
        edit_time: '2019-01-01 15:32:21',
        tags: [{ name: '测试', id: 'test', icon: '', color: '' }],
        head_image: '',
      },
      {
        title: 'WSL2(Arch Linux)使用systemd',
        abstract: '在WSL2中以pid 1运行systemd',
        view: 383,
        url: 'wsl2_systemd',
        publish_time: '2019-09-11 14:39:39',
        edit_time: '2019-09-11 14:39:39',
        tags: [
          { id: 'wsl', name: 'WSL', icon: '', color: '' },
          {
            id: 'arch',
            name: 'Arch',
            icon: 'https://www.oyohyee.com/static/img/tags/arch.png',
            color: 'blue',
          },
        ],
        head_image: '',
      },
      {
        title: 'Arch Linux的使用',
        abstract: '如何安装Arch Linux',
        url: '/',
        view: 100,
        publish_time: '2019-01-01 15:32:21',
        edit_time: '2019-01-02 15:32:21',
        tags: [
          { name: '测试', id: 'test', icon: '', color: '' },
          {
            name: 'Arch Linux',
            id: 'arch',
            icon: 'https://www.oyohyee.com/static/img/tags/arch.png',
            color: 'blue',
          },
        ],
        head_image: 'https://www.oyohyee.com/static/img/posts/onenote.jpg',
      },
      {
        title:
          'Arch Linux的使用长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题',
        abstract:
          '如何安装Arch Linux长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容',
        url: '/',
        view: 100,
        publish_time: '2019-01-01 15:32:21',
        edit_time: '2019-01-02 15:32:21',
        tags: [
          { name: '测试', id: 'test', icon: '', color: '' },
          {
            name: '微软',
            id: 'Mircosoft',
            icon: 'https://www.oyohyee.com/static/img/tags/mircosoft.png',
            color: 'red',
          },
        ],
        head_image: '',
      },
    ],
  } as { posts: Blotter.PostCard[] },
};
