---
title: vue-cli 3.x 升级之路
date: '2018-12-18 12:51:58'
type: post
category:
  - vue
  - 构建工具
tag:
  - vue
  - vue-cli
meta:
  -
    name: description
    content: vue-cli 升级之路
  -
    name: keywords
    content: vue,vue-cli
author: tomieric
poster: /images/vue-cli-3-x.webp
---

## 导读

* [Vue CLI 3](https://cli.vuejs.org/zh/)
* [如何使用Vue CLI 3加速你的开发工作流？](https://mp.weixin.qq.com/s/49ahSgjypkELwGFXXUEMvw)
* [燃烧你的CLI](https://github.com/miccycn/vue-cli-plugin-react)
* [我在维护VUE CLI项目过程中学到了什么@VueConf CN 2018](https://mp.weixin.qq.com/s/QhetPMLzlmZxaPdroxmDsw)

## vue-cli 基本要点

* [安装](https://cli.vuejs.org/zh/guide/installation.html#%E5%AE%89%E8%A3%85)
* [快速开发](https://cli.vuejs.org/zh/guide/prototyping.html#%E5%BF%AB%E9%80%9F%E5%8E%9F%E5%9E%8B%E5%BC%80%E5%8F%91)
  - demo：[kz-table](https://github.com/Kuaizi-co/kz-table/blob/dev/package.json#L8)
* [安装、插件和 Preset](https://cli.vuejs.org/zh/guide/plugins-and-presets.html#%E8%BF%9C%E7%A8%8B-preset)
  - demo： [vue-cli-preset-kz](https://github.com/Kuaizi-co/vue-cli-preset-kz#vue-cli-preset-kz)
* [配置参考](https://cli.vuejs.org/zh/config/)
  - demo：[vue.config.js](https://github.com/Kuaizi-co/vue-cli-preset-kz/blob/master/generator/templates/default/vue.config.js)
* [插件开发指南](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)
  - demo1：[vue-cli-plugin-auto-router](https://github.com/Kuaizi-co/vue-cli-plugin-auto-router/blob/dev/index.js)
  - demo2：[vue-cli-plugin-register-component](https://github.com/Kuaizi-co/vue-cli-plugin-register-component/blob/dev/index.js)
  - 展望：`@kuaizi/vue-plugin-preset-kz`

## 如何将 `vue-cli 2.x` 项目升级到 `3.x`

#### Q: `vue-cli 3.x` 的项目依赖文件是什么？

![vue-cli 3项目目录](https://mmbiz.qpic.cn/mmbiz_png/XIibZ0YbvibkX0ZtGgAqFEHn2Hq3icia76qRVrqBcGe2tgGHyzBQ5kU9vkGn0QY6MS2tQZBIodWE2IUjTggTMyRJ6g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

```bash
.
├── README.md
├── babel.config.js √
├── node_modules
├── package.json √
├── public √
├── src √
├── tests
├── vue.config.js√
└── yarn.lock
```

其中主要的的文件主要有 `package.json` 和 `vue.config.js`，`babel.config.js` 是可选独立文件配置及 `package.json` 中配置。

#### Q: 如何升级已有项目的构建环境？

##### 新建 `vue.config.js` 文件

在项目根目录新建 `vue.config.js`，该文件是 `vue-cli 3.x` 运行读取配置入口及 `vue ui` 获取项目并识别配置信息。

```javascript
const glob = require('glob')
const path = require('path')
const resolve = folder => path.resolve(__dirname, folder)
// 多页面入口路径
const PAGE_PATH = resolve('src/pages')

/**
 * 获取多页面配置对象
 * @param {String} entry 是否指定单入口
 */
function getPagesConfig (entry) {
  const pages = {}
  // 规范中定义每个单页文件结构
  // index.html,main.js,App.vue
  glob.sync(PAGE_PATH + '/*/index.js')
    .forEach(filePath => {
      const pageName = path.basename(path.dirname(filePath))
      if (entry && entry !== pageName) return;
      pages[pageName] = {
        entry: filePath,
        // 除了首页，其他按第二级目录输出
        // 浏览器中直接访问/news,省去/news.html
        // 指定单页根目录直接访问
        filename: `${pageName === 'index' || entry ? '' : pageName + '/'}index.html`,
        template: path.dirname(filePath) + '/index.html',
        hash: true,
      }
    })
  return pages
}

module.exports = {
  // 读取2.x 的配置
  baseUrl: process.env.NODE_ENV === 'production' ? webpackConf.build.assetsPublicPath : '/',
  assetsDir: 'static',
  // 禁用md5文件名，改查询参数 md5
  filenameHashing: false,
  productionSourceMap: false,
  lintOnSave: true,

  // 多页配置
  pages: {
    ...pages
  },

   // 配置webpack
   configureWebpack: {
    cache: true,
    plugins: [
      new webpack.DefinePlugin({
        // 定义你的环境变量
        VUE_APP_ALLOW_ROUTES: JSON.stringify(argv.route)
      })
    ],
    performance: {
      hints: false
    },
    optimization: {
      // vue cli 3.x默认没有生产manifest.js文件
      runtimeChunk: process.env.NODE_ENV === 'production' ? { name: 'manifest' } : false
    }
  },

  // 扩展webpack配置
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 移除多页面preload,prefetch插件
    Object.keys(pages).forEach(page => {
      config.plugins.delete(`preload-${page}`)
      config.plugins.delete(`prefetch-${page}`)
    })

    config.resolve
      .alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('assets', resolve('src/assets'))
      .set('config', resolve('src/config'))
      .set('components', resolve('src/components'))
      .set('index', resolve('src/entries/index'))
      .set('I18n', resolve('src/i18n'))
      .set('Lib', resolve('src/lib'))
      .set('API', resolve('src/lib/services'))
      .set('mixins', resolve('src/lib/mixins'))

    // 自动别名
    Object.keys(devRouter)
          .forEach(alias => {
            config.resolve.alias.set(alias, devRouter[alias])
          })

    // 添加 css 全局变量资源插件
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(
      type => addStyleResource(config.module.rule('less').oneOf(type))
    )
  },

  // 开发服务器配置
  devServer: {
    // port: `8081`,
    port: webpackConf.dev.port,
    proxy: webpackConf.dev.proxyTable
  },
}
```

配置这么少就可以升级到 `vue-cli 3.x` 环境吗？当然还缺少 `vue cli 3.x` 构建运行的依赖包，我们要修改 `package.json`，移除一些旧的依赖如 `babel-loader`、`webpack`等等一些，重新安装新的版本，新的版本大多数新的依赖包会指定 `@scope`，比如 `@babel/core@7.0.0-beta.47`, `"@vue/cli-plugin-babel"`

```javascript
{
  "name": "preset-demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    // 兼容旧的命令
    "dev": "vue-cli-service serve --copy",
    "review": "serve -s dist",
    "test:e2e": "vue-cli-service test:e2e",
    "test:unit": "vue-cli-service test:unit"
  },
  "dependencies": {
    "axios": "^0.18.0",
    "babel-polyfill": "^6.22.0",
    "countup": "^1.8.2",
    "echarts": "^4.2.0-rc.1",
    "iview": "^3.1.1",
    "lodash": "^4.17.11",
    "normalize.css": "^8.0.0",
    "nprogress": "^0.2.0",
    "vue": "^2.5.17",
    "vue-i18n": "^8.1.0",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    // 构建环境依赖的包
    "@vue/cli-plugin-babel": "^3.0.3",
    "@vue/cli-plugin-e2e-nightwatch": "^3.0.4",
    "@vue/cli-plugin-eslint": "^3.0.3",
    "@vue/cli-plugin-unit-mocha": "^3.0.4",
    "@vue/cli-service": "^3.0.3",
    "@vue/test-utils": "^1.0.0-beta.20",
    "chai": "^4.1.2",
    "less": "^2.7.2",
    "less-loader": "^3.0.0",
    "serve": "^10.0.1",
    "style-resources-loader": "1.2.1",
    "vue-template-compiler": "^2.5.17"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {
      "vue/no-parsing-error": [
        2,
        {
          "x-invalid-end-tag": false
        }
      ]
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

#### Q：貌似还是挺麻烦的，有没有更快的方式？

有的，通过自行写脚本命令去处理。

**目标：**

- 移除旧的配置文件，如`.babelrc`、`.eslintrc`等
- 替换依赖包新的版本和添加新依赖，如 `@vue/cli-plugin-babel`、`babel-loader@8.04`等
- 新建文件`babel.config.js`、`.env.local`等

@flowstart
st=>start: 开始|past
e=>end: 结束|future
remove=>subroutine: `.babelrc`、`.eslintrc`等|invalid
removeCond=>condition: 移除旧的配置文件
mergeCond=>condition: 合并依赖包|rejected
merge=>inputoutput: 替换新版本和添加新依赖|future
newCond=>condition: 新建配置文件
newOp=>operation: `babel.config.js`、`.env.local`等

st->removeCond
removeCond(no, right)->mergeCond
removeCond(yes)->remove->e
mergeCond(yes)->merge->e
mergeCond(no, right)->newCond
newCond(yes)->newOp->e
newCond(no)->e
@flowend

##### 1.移除旧的配置文件

移除旧的文件会容易造成旧的配置文件丢失，因此我们的做法就是将旧的配置文件重命名即可。

``` js
const renameFiles = ['.babelrc', '.eslintrc.js', 'package.json']
// rename old file
renameFiles.filter(f => fs.existsSync(resolveFile(f)))
            .forEach(f => fs.renameSync(resolveFile(f), `_${f}`))

```

##### 2. 替换依赖包新的版本和添加新依赖

我们将 `vue-cli 3.x` 生成的项目下的 `package.json` 作为配置文件模板，将新旧文件json合并到新的配置文件 `package.json`。

```js
const removeDependencies = ['vue-template-compiler', 'babel-core', 'vue-loader', 'vue-style-loader', 'url-loader', 'file-loader', 'webpack', 'webpack-bundle-analyzer', 'webpack-dev-middleware', 'webpack-hot-middleware', 'html-webpack-plugin', 'babel-plugin-transform-runtime', 'babel-polyfill']

const updatePkg = fs.readJSONSync(resolve(__dirname, './template/package.json'))

// Remove old Dependencies
removeDependencies.forEach(d => {
  if (pkg.dependencies && pkg.dependencies[d]) {
    delete pkg.dependencies[d]
  } else if (pkg.devDependencies && pkg.devDependencies[d]) {
    delete pkg.devDependencies[d]
  }
})


// update package.json
fs.writeFileSync(
  './package.json', 
  JSON.stringify(
    merge(
      pkg,
      updatePkg,
      // 旧项目名称版本保留
      {
        name: pkg.name,
        version: pkg.version,
        author: pkg.author
      }
    ), 
  null, 2)
)

```

##### 新建文件

新的配置文件我们可以从模板目录中考到就项目目录中

```js
const copyFiles = [
  '.editorconfig', 
  '.eslintignore', 
  'babel.config.js', 
  'vue.config.js', 
  '.env.local', 
  'styleguide.config.js'
].map(file => ({
  path: resolve(__dirname, `./template/${file}`),
  name: file
}))
// fs.copyFileSync
copyFiles.forEach(file => {
  fs.existsSync(file.path) && fs.copySync(file.path, resolveFile(file.name))
})
```

## kz update 一键升级

`vue cli 2.x` 项目一键升级 `vue-cli 3.x` 童叟无欺。只需

```bash
> kz update
```

@flowstart
st=>start: 安装 `kz-cli`
process=>operation: 执行 `kz update` 命令
process2=>operation: 安装依赖包
cond=>condition: 是否带参数 `--no-install` ?
e=>end: 完成

st->process->cond
cond(no)->process2->e
cond(yes)->e
@flowend


* [详细文档](https://kuaizi-co.github.io/kz-cli/command/update.html)

## 期待

`vue cli 3.x` 插件社区将越来越完善，丰富好用的插件会越来越多，将优秀的插件组合不断的优化我们的构建工作流，同时我们也可以尝试开发自己合适的插件，不断的提高自己。