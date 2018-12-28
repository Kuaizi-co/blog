# weekly

> Kuaizi FED 前端周刊

## Get Started

```
> git clone https://github.com/kuaizi-co/blog.git
> cd blog
> yarn
> yarn docs:dev
```

## 写文章

> 在 https://github.com/kuaizi-co/blog/tree/master/docs/weekly目录直接新建 `md` 文件

在 `docs/weekly` 目录下新建 `markdown`文件即可。

文件头部加入 `yaml` 格式 `Front Matter` 内容可以配置文章相关信息

```
---
# 文章标题
title: 自动路由插件
# 发布日期
date: '2018-12-05 21:09:43'
# 类型，一般为 post
type: post
# 所属分类，可以不填
category:
  - 前端构建
  - vue
  - vue-cli
# 所属标签，可以不填
tag:
  - vue
  - vue-cli
  - vue-cli-plugin
  - webpack
  - 前端构建
# html meta 信息
meta:
  -
    name: description
    content: vue-cli 自动路由插件,vue cli auto router,支持 webpack 插件
  -
    name: keywords
    content: vue-cli,vue-cli-plugin,vue-cli-plugin-auto-router,webpack,auto router
# 文章作者，填 github 账号名
author: tomieric
# 文章封面图
poster: https://tomieric.github.io/assets/images/background.jpg
---
```

或者使用 `vp-track shell`

```
> yarn vp-track --help
# -p 文章文件名，也是路由访问
# -d 新建所在目录
> yarn vp-track -p test -d ./docs/post
# or
> npx vp-track -p test -d ./docs/post
```

## 写周刊

在 `markdown` 文件头编写如下 `yaml` 信息，只要定义 `type: weekly`：

```
---
title: 第一期 (2018-12-21)
date: '2018-12-21 09:09:43'
type: weekly
tag:
meta:
  -
    name: description
    content: 筷子科技
  -
    name: keywords
    content: kz-fe
author: kuaizi-co
poster: /images/post-1.jpg
---
```

## 预览

```
yarn dev
```

## Deploy

将本地写好的文字，通过 `Git push` 即可，由 `Travis-ci` 自动发布到 `gitpage`
