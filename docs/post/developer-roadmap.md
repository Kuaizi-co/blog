---
title: 前端的开发之路指南 developer-roadmap
date: '2019-03-08'
type: post
category:
  - 前端
tag:
  - 前端
  - 前端知识体系
meta:
  -
    name: description
    content: 前端的开发之路指南，罗列前端的只是体系及发展之路，指明学习路径
  -
    name: keywords
    content: 前端知识体系，前端的开发之路指南
author: tomieric
poster: /images/roadmap.jpg
---

## 开篇一张图

* [https://github.com/kamranahmedse/developer-roadmap](https://github.com/kamranahmedse/developer-roadmap)
* [https://www.yuque.com/fe9/basic/iwtzab](https://www.yuque.com/fe9/basic/iwtzab)

> 文字可能会补充，今天即兴聊

![developer-roadmap](https://raw.githubusercontent.com/ccloli/developer-roadmap-zh-CN/master/images/frontend.png)

### PostCSS

```css
// alert.css
@charset "UTF-8";
@import "./common/var.css";

@component-namespace el {

  @b alert {
    color: var(--color-text-dark);

    /* 贴边 */
    &.welt {
      border-bottom: 1px solid var(--tab-border-color);
    }

    @e icon {
      color: var(--color-text-dark);
    }

    & .el-alert__description {
      color: var(--color-text-dark);
    }
  }
}
```

### CSS架构

- `BEM` - Block Element Modifier `块（block）,元素（element）,修饰符（modifier）`
  - eg `element-ui`
- `OOCSS` - Object-Oriented CSS `面向对象CSS编程`
  - eg `bootstrap`
- `SMACSS` - Scalable and Modular Architecture for CSS `可伸缩和模块化的CSS架构`
- `CSS in JS`
- `CSS Scoped`

### 渐进式 web 应用 （pwa）

* PRPL 模式 [介绍](https://developers.google.com/web/fundamentals/performance/prpl-pattern/?hl=zh-cn)
  * [preset](https://github.com/Kuaizi-co/vue-cli-preset-kz/blob/master/generator/templates/default/vue.config.js#L103)
  * [vue-router-prefetch](https://github.com/egoist/vue-router-prefetch) 
  * [饿了么的 PWA 升级实践](https://huangxuan.me/2017/07/12/upgrading-eleme-to-pwa/)
* RAIL 模型 [介绍](https://developers.google.com/web/fundamentals/performance/rail)
* lighthouse [介绍](https://developers.google.com/web/tools/lighthouse/)

## 推荐 Repo

* [优秀推荐的IT影视](https://github.com/greybax/awesome-IT-films)
* [渗透攻击](https://github.com/Micropoor/Micro8)
* [与众不同的 changeLog 日志页面](https://github.com/egoist/loglive)
* [可编辑的网页制作框架](https://github.com/artf/grapesjs)
* [基于vue、bootstrap的一款设计框架](https://github.com/creativetimofficial/vue-argon-design-system)
* [Javascript 项目指南](https://github.com/elsewhencode/project-guidelines/blob/master/README-zh.md)