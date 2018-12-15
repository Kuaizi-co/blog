module.exports = {
  title: '前端周刊',
  description: '每周分享前端知识',
  base: '/blog/',
  dest: 'blog',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  theme: 'track',
  port: 3000,
  // Google Analytics ID
  ga: 'UA-130602776-1',
  // PWA support
  // serviceWorker: true,
  // fuck IE
  evergreen: true,
  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: true },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
    config: md => {
      md.use(require('markdown-it-task-lists')) // 一个 checkbox 的 TODO List 插件
        .use(require('markdown-it-imsize'), { autofill: true }) // 支持自定义 md 图片大小 ![](http://test.png =200x200)
    }
  },
  themeConfig: {
    footer: 'MIT Licensed | Copyright © 2018-present <a href="//www.kuaizi.ai" target="_blank">www.kuaizi.ai</a>',
    // github card
    github: 'kuaizi-co',
    // 博客的 logo
    logo: '/images/logo.png',
    logoInverse: '/images/logo-white.png',
    // 定制文章标题颜色
    accentColor: '#ac3e40',
    // 每页显示的文章数量
    per_page: 5,
    // 创建文章的时间格式, 不设则不显示 可选 [yyyy-MM-dd HH:mm:ss]
    date_format: 'yyyy-MM-dd',
    // 开启标签功能
    tags: true,
    // gitalk 的配置项, 不支持 flipMoveOptions
    comment: {
      clientID: '4bd9f5278b824687adfa',
      clientSecret: 'b3fb7f071fe80dc7a16ae346b770797fe0b4bb50',
      repo: 'https://github.com/Kuaizi-co/blog.git',
      owner: 'kz-fe',
      admin: ['kz-fe'],
      perPage: 5,
      // id: 'comment',      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    },
    // 和 vuepress 默认主题一样, 定制导航栏上的链接
    nav: [
        { text: '首页', link: '/', root: true }, // 指定它为博客根目录
        { text: '周刊', link: '/weekly/', root: true }, // 指定它为标签目录
        { text: '分类', link: '/category/' }, // 指定它为标签目录
        { text: '标签', link: '/tag/' }, // 指定它为标签目录
        { text: '关于我们', link: '/about.html' },
        { text: 'Track', link: '/track' }
    ],
    // 配置/page/1的链接地址
    pageRoot: '/weekly/',
    sidebar: 'auto',
    // 是否显示文章作者，默认为 false
    // 周刊为团队发布，因此设置为 true
    // 个人博客则不显示作者组件
    showAuthor: true
  }
}