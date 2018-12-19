---
title: 自动路由插件
date: '2018-12-05 21:09:43'
type: post
category:
  - 前端构建
  - vue
  - vue-cli
tag: 
  - vue
  - vue-cli
  - vue-cli-plugin
  - webpack
  - 前端构建
meta:
  -
    name: description
    content: vue-cli 自动路由插件,vue cli auto router,支持 webpack 插件
  -
    name: keywords
    content: vue-cli,vue-cli-plugin,vue-cli-plugin-auto-router,webpack,auto router
author: tomieric
poster: https://tomieric.github.io/assets/images/background.jpg
---

> 多页面自动路由 webpack 插件

单页面可以直接使用 [vue-route-generator](https://github.com/ktsn/vue-route-generator)

<!-- more -->

#  vue-cli-plugin-auto-router

使用了 [vue-route-generator](https://github.com/ktsn/vue-route-generator)

单路由可以直接使用 [vue-auto-routing](https://github.com/ktsn/vue-auto-routing)

## 使用

```
vue add @kuaizi/vue-cli-plugin-auto-router
```

默认页面文件夹为 `./src/pages/*/views/`，自定义需要添加配置 `package.json` 中的 `autoRouterConf` 字段

```
{
  //...
  autoRouterConf: {
    pages: ['./src/pages/**/views/'],
    importPrefix: '../views'
  }
  //...
}
```

## example

```
> cd example
> yarn
> yarn dev
```


# auto-router-webpack-plugin

> 多页面自动路由 `webpack` 插件

单页面可以直接使用 [vue-route-generator](https://github.com/ktsn/vue-route-generator)
  
## 参数

 * options {Object} 配置参数
    * pages {String|Array} 支持globby的匹配，支持字符串或者数组 [globbing-patterns](https://github.com/sindresorhus/globby#globbing-patterns)
    * importPrefix {String} 默认是`../views/`, `vue-route-generator`默认的是`@/pages`, 异步组件的默认路径，eg：import('../views/account.vue')

参数 | 类型 | 描述
- | - | -
pages | `String|Array` |  支持globby的匹配，支持字符串或者数组 [globbing-patterns](https://github.com/sindresorhus/globby#globbing-patterns)
importPrefix | `String` | 默认是`../views/`, `vue-route-generator`默认的是`@/pages`, 异步组件的默认路径，eg：import('../views/account.vue')

## 使用

```
# vue.config.js
export default {
  // ...
  configureWebpack: {
      cache: true,
      plugins: [
        new webpackPluginAutoRouter({ pages: './src/pages/*/views/'})
      ],
  },
  // ...
}
```

或者

```
# webpack.config.js
module.exports = {
  // ...
  plugins: [
    new webpackPluginAutoRouter({ pages: './src/pages/*/views/'})
  ],
  // ...
}
```

## 项目目录

```
.
├─assets
│  └─less
├─components
│  ├─charts
│  ├─count-to
│  └─info-card
├─i18n
├─lib
│  └─services
├─pages
│  ├─index
│  │  ├─components
│  │  │  └─common
│  │  ├─routes
│  │  ├─store
│  │  └─views
│  │      └─manage
│  │          └─word
│  └─login
│      └─views
└─store
    └─modules
```

`index` 和 `login` 分别是多页 `pages` 的单页目录，我们设置 `pages: './src/pages/*/views/'` 则可以匹配到 `index` 和 `login`, `views`是存放单页路由页面组件的目录

每个单页目录中 `routes` 是和 `views` 同级，生成的`routes/index.js` 文件应用 `views`的路由页面组件路径为 `../views/xxx.vue`, 我们设置 `importPrefix: '../views'`

## 支持 `route-meta` 标签

[route-meta](https://github.com/ktsn/vue-route-generator#route-meta)

动态生成 `route` 配置能否带上额外的`meta`配置，需要我们手动去添加支持 `<route-meta>` 标签的 `loader`

### 配置

```
{
  // ...
  module: {
    rules: [
      {
        resourceQuery: /blockType=route-meta/,
        loader: require.resolve('@kuaizi/vue-cli-auto-router/meta-loader.js')
      }
    ]
  }
  // ...
}
```

添加支持 `<route-meta>` 标签

### 使用

```
# index/views/manage/index.vue
<route-meta>
{
  "name": "manage-user-define",
  "sidebar": false
}
</route-meta>

<template>
  <Layout>
    <!-- more -->
  </Layout>
</template>
```

`<route-meta>` 包含一个 `json` 的内容, 其中 `name`字段会同步到 `route/index.js` 所在的路由配置

启动项目后生成文件`index/routes/index.js`

```
export default [
  //...
  {
    name: 'manage-user-define',
    path: '/manage',
    component: ManageIndex,
    meta: {
      "sidebar": false
    }
  }
  //...
]
```

### `vue-router direct`

路由的跳转需要手动去添加

```
# index/main.js
// ...
import Router from '@/router'
import routes from './routes'
import App from './App'

// 定义跳转
routes.unshift({
  path: '/manage',
  redirect: '/manage/hello'
})

boostrap({ Router, Component: App, routes })
```