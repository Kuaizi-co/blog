---
title: vuepress-theme-track
date: '2018-11-24 07:09:43'
type: post
tag: 
  - vue
  - vuepress
category:
  - vue
meta:
  -
    name: description
    content: vuepress-theme-track
  -
    name: keywords
    content: vuepress-them,track
author: tomieric
---

# vuepress-theme-track

`vuepress-theme-track` 是一款 `vuepress` 的主题包，通过 `npm` 或者 `yarn` 安装即可使用该主题啦。

`vuepress` 更多的使用请查询[官网文档](https://vuepress.vuejs.org/zh/)。

<!-- more -->

## 使用

### 安装 

```
> yarn global add vuepress
> mkdir myblog && cd myblog
> vuepress dev .
```

### 设置主题

```javascript
> mkdir .vuepress && cd .vuepress
> touch config.js
```

配置 `config.js`

```javascript
module.exports = {
  title: '前端周刊',
  description: '每周分享前端知识',
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: 'favicon.ico' }]
  ],
  // use vuepress-theme-track
  theme: 'track',
  // local development
  port: 3000,
  // Google Analytics ID
  ga: '',
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
    footer: 'MIT Licensed | Copyright © 2018-present tommyshao',
    // github card
    // github account name
    github: 'tomieric',
    // logo
    logo: '/images/logo.png',
    // homepage logo
    logoInverse: '/images/logo-white.png',
    // It's show font color to post title
    accentColor: '#ac3e40',
    // pageSize
    per_page: 5,
    // date format
    date_format: 'yyyy-MM-dd',
    // Tag
    tags: true,
    // gitalk
    // https://github.com/Yubisaki/vuepress-theme-yubisaki#comment-system
    comment: {
      clientID: '',
      clientSecret: '',
      repo: 'https://github.com/tomieric/vuepress-theme-track.git',
      owner: 'tomieric',
      admin: ['tomieric'],
      perPage: 5,
      // id: 'comment',      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    },
    // navLinks
    nav: [
        { text: '首页', link: '/'}, // home
        { text: '周刊', link: '/weekly/'}, // blog
        { text: '分类', link: '/category/' }, // category
        { text: '标签', link: '/tag/' }, // tag
        { text: '关于我们', link: '/about' },
        { text: 'Track', link: '/track' }
    ],
    // page list home url
    pageRoot: '/weekly/',
    sidebar: 'auto',
    // show author in post article, Default: false
    // Team blog, show everyone in memenbers
    showAuthor: true
  }
}
```

给 `package.json`添加`scripts`命令

```
# 新建 package.json
> npm init -yes
> code package.json
```

增加 `dev` 命令

```javascript
{
  //...
  scripts: {
    "dev": "vuepress dev ."
  }
}
```

在目录输入 `yarn dev` 即可在浏览器打开 `http://localhost:3000` 进行预览

### Build

在`package.json` 增加命令

```javascript
{
  //...
  "scripts": {
    "build": "vuepress build ."
  }
}
```

每次执行`yarn build`即可生成静态页面资源，查看目录下的`.vuepress/dist`

### Deploy

将 `build` 后的 `.vuepress/dist` 目录同步到你 `github` 仓库的 `gh-pages` 分支或者其他的静态网页服务器。

更多查看[vuepress 官网的部署文档] (https://vuepress.vuejs.org/zh/guide/deploy.html#%E9%83%A8%E7%BD%B2)

* [now.sh](https://zeit.co/now)
* [Netlify] (https://www.netlify.com/)