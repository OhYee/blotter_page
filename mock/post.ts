import { Request, Response } from 'express';

var posts: { [key: string]: Blotter.Post } = {
  wsl2_systemd: {
    title: 'WSL2(Arch Linux)使用systemd',
    abstract: '在WSL2中以pid 1运行systemd',
    view: 383,
    url: 'wsl2_systemd',
    publish_time: '2019-09-11 14:39:39',
    edit_time: '2019-09-11 14:39:39',
    tags: [
      { id: 'wsl', name: 'WSL', icon: '', color: '' },
      {
        id: 'wsl',
        name: 'WSL',
        icon: 'https://www.oyohyee.com/static/img/tags/arch.png',
        color: 'blue',
      },
    ],
    head_image: '',
    content: `<h1 id="wsl2arch-linuxsystemd">WSL2(Arch Linux)使用systemd</h1>
<h2 id="heading">概述</h2>
<p>WSL本身是由Windows负责运行的，因此使用<code>tree</code>可以看到根进程不是systemd，而这将导致无法启动服务的守护进程(deamon)，如nginx、docker、mysql等</p>
<p>按道理上包括ip转发、原生systemd慢慢都会实现，但是现阶段只能采用第三方方案实现。</p>
<p>一个比较好的解决方案是使用<a href="https://github.com/arkane-systems/genie">arkane-systems/genie</a>项目 <br>
大概原理是在一个单独的命名空间跑systemd，从而实现能够正常执行systemctl指令并启动服务</p>
<h2 id="heading1">安装步骤</h2>
<h3 id="-net">安装运行 .NET</h3>
<p>首先需要安装<code>.NET Core runtime</code>，这个可以直接<code>yay dotnet</code>，找到带runtime的安装即可
安装完成后检查下是否其安装目录，如果不在默认位置需要手动写一下环境变量，如<code>export DOTNET_ROOT=/opt/dotnet</code></p>
<h3 id="heading2">安装相应的编译环境</h3>
<p>需要python、python-markdown、python-six、python-packaging、python-setuptool、python-attrs等依赖包
而且按照测试来看似乎无法自动安装，因此最好先使用yay安装上他们（这些模块使用pip安装貌似也不行）</p>
<p>另外还需要安装 <code>make</code></p>
<h3 id="genie">安装genie</h3>
<p>使用 <code>yay -S genie-systemd</code> 下载 <code>genie</code> 源码并安装，如果中间出现缺少某个环境的话，退回到上一步安装即可</p>
<h2 id="heading3">使用</h2>
<p><code>genie</code> 有三个指令：</p>
<p><code>genie -i</code> 启动systemd进程
<code>genie -s</code> 启动systemd进程，并进入该环境终端
<code>genie -c &lt;command&gt;</code> 启动systemd进程，并执行相应的指令</p>
<p>比如要运行docker，使用<code>genie -s</code>进入到环境后，执行<code>sudo systemctl start docker</code>即可
而且在这里执行<code>pstree</code>，可以看到根进程已经变成了<code>systemd</code>
执行完成后退出这个命名空间后，<code>systemd</code>不会关闭</p>`,
  },
};

export default {
  'GET /api/post': (req: Request, res: Response) => {
    var url = req.query['url'];
    var post = posts[url];
    console.log(url);
    if (post) {
      res.send(post);
    } else {
      res.status(404);
    }
    res.end();
  },
};
