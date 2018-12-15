---
title: vue 组件自动注册插件
date: '2018-12-06 20:09:43'
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
    content: vue-cli 组件自动注册,vue cli register component,支持 webpack 插件
  -
    name: keywords
    content: vue-cli,vue-cli-plugin,vue-cli-plugin-register-component,webpack,register-component
author: tomieric
poster: /images/post-5.jpg
---

> 参照@vuepress/plugin-register-component

全局组件自动注册

<!-- more -->

## 目录结构

```javascript
src
  - components
    - componentA
    - componentB
  - pages
    - index
      - components
        _common
          header.vue
          footer.vue
        layout.vue
        _page.vue
```

默认自动注册 `components` 目录所有组件, 其中不会注册 `_`开头的文件或者文件夹

```javascript
# src/pages/index/components/index.js
import Vue from 'vue'
Vue.component('layout', () => import('./layout.vue'))
```

## 使用

```javascript
# src/app.js
import 'src/components'

new Vue()
```

### 多页面

共用
```javascript
# src/app.js
import './components'

new Vue()
```

单页
```javascript
# src/pages/index/main.js
import './components'
// ...
```

webpack配置

```javascript
puligns: [
  new registerComponentWebpackPlugin({
    componentDir: ['./src/components', './src/pages/index/components']
  })
]
```

## vue-register-component-webpack-plugin

vue组件自动注册

## 安装

```javascript
> npm i stall @kuaizi/vue-cli-plugin-register-component
```

## 使用

```javascript
# webpack.config.js
const vueRegisterComponentWebpackPlugin = require('@kuaizi/vue-cli-plugin-register-component')

export default {
  plugins: [
    new vueRegisterComponentWebpackPlugin({
      componentDir: ['./src/components', './src/entries/index/components'],
      // 全局额外组件
      components: [
        { name: 'element', path: './src/additional/element.vue' }
      ]
    })
  ]
}
```

在入口文件导入自动生成的组件注册文件

```javascript
-src
  - main.js
  - components
    - index.js // 自动生成
```

在 `main.js` 中导入 `components/index.js`

```javascript
# main.js
import './components'
```