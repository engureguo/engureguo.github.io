module.exports = {
  base: '/ops/',
  title: 'Egu0',
  description: '欢迎您，这是一个公开的个人内容网站！',
  themeConfig: {
    logo: '/images/logo.png',
    // 搜索栏
    search: true,
    searchMaxSuggestions: 10,
    // 侧边栏
    displayAllHeaders: true,
    // 导航栏
    navbar: true,
    nav: [
      {
        text: '🐧 Linux',
        items: [
          {
            text: 'CMake 入门',
            link: '/cmake/',
          },
          {
            text: 'GCC 入门',
            link: '/linux-gcc/',
          },
        ],
      },
      {
        text: '🔧 工具',
        items: [
          {
            text: '我的工具盒',
            link: '/tool-box/a-tool-box/',
          },
          {
            text: 'Vuepress v1 实践',
            link: '/tool-box/vuepress-using/',
          },
        ],
      },
      {
        text: '🔗 外链',
        items: [
          {
            text: 'Gitee',
            link: 'https://gitee.com/egu0',
            target: '_self',
            rel: false,
          },
        ],
      },
    ],
  },
}
