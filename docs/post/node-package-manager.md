---
title: 前端模块包管理
date: '2019-05-13 14:00:00'
type: post
category:
  - 前端
tag:
  - 前端
meta:
  -
    name: description
    content: 前端模块包管理
  -
    name: keywords
    content: 前端,npm,lerna
author: tomieric
poster: /images/v2-a249c1ec19957248e6187692d0db7047_r.jpg
---

## npm

* npm init
* npm version
* npm dist-tag
* npm publish
* npm unpublish
* npm publish scoped packages

### npm init 初始化

```
> mkdir mypack && cd mypack
> npm init -y
```

初始化包模块，生成 `package.json` 配置文件

```js
{
  "name": "mypack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

#### package.json 字段

* name 模块名称
* version 版本号
* description 模块描述
* main 模块入口，可以被其他模块所引用，比如 `var mypack = require('mypack'')`
* keyswords 模块搜素关键字
* author 作者
* license 版权协议
* bugs bug提交地址
* homepage 模块主页
* repository 仓库地址
* scripts 模块脚本命令
* files 模块指定包含文件
* devDependencies 开发环境依赖模块
* dependencies 模块依赖模块，在模块安装时同时安装
* peerDependencies 模块安装时同时安装，但版本以外部版本为主


### npm version

遵循 `语义化版本` [semver version](https://semver.org/lang/zh-CN/)

* 主版本号：当你做了不兼容的 API 修改，
* 次版本号：当你做了向下兼容的功能性新增，
* 修订号：当你做了向下兼容的问题修正。

```
> npm version [new version | major | minor | patch | premajor | preminor | prepatch ] -m "message"
```

使用命令修改版本，好处是自动生成一个Git tag [`git-tag-version`] 提交

```
npm version 1.1.0
> v1.1.0
npm version prepatch
> v1.1.1-0
npm version prepatch
v1.1.2-0
npm version patch
> v1.1.2
npm version preminor
> v1.2.0-0
npm version minor
> v1.2.0
npm version premajor
> v2.0.0-0
npm version major
> v2.0.0
```

#### 版本管理工具 release-it

[demo](https://github.com/Kuaizi-co/vue-cli-plugin-auto-router/blob/dev/package.json#L13)

```
λ npm run release

> mypack@2.0.0 release D:\project\test\mypack
> release-it

WARNING Latest version in registry (1.0.0) does not match package.json (2.0.0).

🚀 Let's release mypack (currently at 2.0.0)


Empty changelog

? Select increment (next version): (Use arrow keys)
> patch (2.0.1)
  minor (2.1.0)
  major (3.0.0)
  prepatch (2.0.1-0)
  preminor (2.1.0-0)
  premajor (3.0.0-0)
  Other, please specify...
```

### npm dist-tag 发布版本标签

添加，删除或查看模块某版本

```
npm dist-tag add <pkg>@<version> [<tag>]
npm dist-tag rm <pkg> <tag>
npm dist-tag ls [<pkg>]
```

比如，查看`@kuaizi/kz-ui`

```
npm dist-tag ls @kuaizi/kz-ui
alpha: 2.0.0-alpha
beta: 2.9.0-beta
latest: 2.9.2
next: 2.0.0-alpha.26
```

安装某个标签的最新版本

```
yarn add @kuaizi/kz-ui@beta
```

安装成功后，我们可以查看 `package.json`

```
{
 "dependencies": {
    "@kuaizi/kz-ui": "^2.9.0-beta"
  }
}
```

### npm publish 发布模块

```
npm publish <folder> --tag <tag>
```

尝试发布当前包

```
λ npm publish --tag alpha
npm notice
npm notice package: mypack@2.0.0
npm notice === Tarball Contents ===
npm notice 485B    package.json
npm notice 122.6kB yarn.lock
npm notice === Tarball Details ===
npm notice name:          mypack
npm notice version:       2.0.0
npm notice package size:  40.9 kB
npm notice unpacked size: 123.1 kB
npm notice shasum:        94f14bf06a06e92bdb0c3ab4f4a57f5933ab0cbd
npm notice integrity:     sha512-9wje0sV67oxW7[...]Nf5kVxm77gjSQ==
npm notice total files:   2
npm notice
npm ERR! code E403
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/mypack - You do not have permission to publish "mypack". Are you logged in as the correct user?

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\wuhaiyang\AppData\Roaming\npm-cache\_logs\2019-05-13T06_21_55_910Z-debug.log
```

提示没有权限操作`mypack`模块，我们查看一下 `package.json`，修改 `name` 为 `mypack-test-by-tomieric`再次发布。

```
λ npm publish --tag alpha
npm notice
npm notice package: mypack-test-by-tomieric@2.0.0
npm notice === Tarball Contents ===
npm notice 531B    package.json
npm notice 122.6kB yarn.lock
npm notice === Tarball Details ===
npm notice name:          mypack-test-by-tomieric
npm notice version:       2.0.0
npm notice package size:  40.9 kB
npm notice unpacked size: 123.2 kB
npm notice shasum:        419b2fd5254c45931dd34f7cfa581327e3b475d4
npm notice integrity:     sha512-wmvrAndGVIcBc[...]4aMKGmJ51rURg==
npm notice total files:   2
npm notice
+ mypack-test-by-tomieric@2.0.0
```

打开[//npmjs.com](//npmjs.com),进入自己的包列表, [https://www.npmjs.com/package/mypack-test-by-tomieric](https://www.npmjs.com/package/mypack-test-by-tomieric)


## npm unpublish 撤销已发布模块或版本

```
npm version patch
v2.0.1

 npm publish
npm notice
npm notice package: mypack-test-by-tomieric@2.0.1
npm notice === Tarball Contents ===
npm notice 531B    package.json
npm notice 122.6kB yarn.lock
npm notice === Tarball Details ===
npm notice name:          mypack-test-by-tomieric
npm notice version:       2.0.1
npm notice package size:  40.9 kB
npm notice unpacked size: 123.2 kB
npm notice shasum:        8024ad91f77ab50477db603c33de9c58c8eff542
npm notice integrity:     sha512-mc8HPQGiCQtc6[...]wfaUvNcs+6Jxw==
npm notice total files:   2
npm notice
+ mypack-test-by-tomieric@2.0.1

npm unpublish mypack-test-by-tomieric@2.0.1
-mypack-test-by-tomieric@2.0.1
```

## npm publish scoped packages

在上面发布的测试模块，我们觉得模块叫 `mypack` 能更好区分和记住，那应该如何去做？

npm 模块是支持增加类似命名空间的 `scoped`域，通过在模块名称前面加上 `@scoped/`，比如 `@vue/cli`, `@babel/core-js`等

```js
# package.json

{
  "name": "@tomieric/mypack",
  "version": "2.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "release": "release-it"
  },
  "keywords": [],
  "author": "tomieric <tomieric@gmail.com>",
  "license": "ISC",
  "devDependencies": {
    "@release-it/conventional-changelog": "^1.0.0",
    "conventional-changelog-cli": "^2.0.21",
    "husky": "^2.2.0",
    "release-it": "^12.0.1"
  },
  "dependencies": {
    "@kuaizi/kz-ui": "^2.9.0-beta"
  }
}

```

定义了域的模块具有一定的权限限定，需要通过声明为公开模块

```
npm publish --access=publish
```

或者修改 `package.json`, 增加 `publishConfig` 字段

```js
{
  "name": "@tomieric/mypack",
  "version": "2.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "release": "release-it"
  },
  "keywords": [],
  "author": "tomieric <tomieric@gmail.com>",
  "license": "ISC",
  "devDependencies": {
    "@release-it/conventional-changelog": "^1.0.0",
    "conventional-changelog-cli": "^2.0.21",
    "husky": "^2.2.0",
    "release-it": "^12.0.1"
  },
  "dependencies": {
    "@kuaizi/kz-ui": "^2.9.0-beta"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

[https://www.npmjs.com/package/@tomieric/mypack](https://www.npmjs.com/package/@tomieric/mypack)

### `yarn link` vs `npm link` 调试包

推荐 `yarn link`, 速度更快，但需要注意使用 `yarn unlink mypack` 删掉软链

## lerna 多模块管理

* [使用lerna优雅地管理多个package](https://zhuanlan.zhihu.com/p/35237759)

多模块开发，且多模块之间相互依赖时，如何优雅管理模块的发版。`lerna` 是实现 `monorepo` 工作流的一个工具。

### 初始化demo

```
mkdir lerna && cd lerna && npx lerna init
mkdir packages && cd packages
mkdir animal && cd animal && npm init -y
cd ..
mkdir dog && cd dog && npm init -y
cd ../..
```

### add module

```
npx lerna add assert --scope=animal
npx lerna add animal --scope=dog
```

### lerna version

```
lerna version 1.1.0
```

### lerna publish

```
lerna publish
```

案例：

* [cep](https://github.com/Kuaizi-co/cep)
* [@kuaizi/i18n](https://github.com/Kuaizi-co/i18n)