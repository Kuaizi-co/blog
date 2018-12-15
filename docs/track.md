---
title: vuepress-theme-track
heroText: Track # title
layout: Activity
pageLayout: Activity
type: false
hidden: true # 设置是否在文章列表中显示
tagline: vuepress 博客主题 # 描述
heroImage: https://tomieric.github.io/assets/images/post/20160107202032_470.jpg # logo
# 参考官方默认主题的配置
actionText: 开始使用 →  
actionLink: https://github.com/tomieric/vuepress-theme-track # action 链接
features:
  - title: 这是什么
    details: 一个基于 vuepress 的博客主题, 它基于 vuepress 及 `vuepress-theme-yubisaki` 提供的默认主题
  - title: 有哪些特点
    details: 提供文章列表, 文章分页, 文章详情, 自定义活动页 layout 等等功能
  - title: 致谢
    details: 感谢<a href="https://github.com/Yubisaki/vuepress-theme-yubisaki">vuepress-theme-yubisaki <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a> 和好用的Vue 驱动的静态网站生成器 <a href="https://vuepress.vuejs.org/" target="_blank">vuepress <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a>
---

## vuepress markdown

### Table

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Emoji

```
:tada: :100:
```

:tada: :100:

### Custom Containers

```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::
```

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

### TODO List

```
- [x] done
- [ ] doing
```

- [x] done
- [ ] doing

### Image size

```
![test](/blog/images/logo.png =200x80)
```

![test](/blog/images/logo.png =200x80)

### flowchart

[vuepress-plugin-flowchart](https://flowchart.vuepress.ulivz.com/)

```
@flowstart
st=>start: 开始|past:>https://github.com/tomieric/vuepress-theme-track.git[blank]
e=>end: 发布|future:>https://kuaizi-co.github.io/blog/
op1=>operation: 安装vuepress-theme-track|past
op2=>operation: 手动 deploy|current
sub1=>subroutine: 设置.vuepress/config.js主题|invalid
cond=>condition: 写文章?|approved:>https://kuaizi-co.github.io/blog/
c2=>condition: 是否自动发布|rejected
io=>inputoutput: Git push...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
@flowend
```

@flowstart
st=>start: 开始|past:>https://github.com/tomieric/vuepress-theme-track.git[blank]
e=>end: 发布|future:>https://kuaizi-co.github.io/blog/
op1=>operation: 安装vuepress-theme-track|past
op2=>operation: 手动 deploy|current
sub1=>subroutine: 设置.vuepress/config.js主题|invalid
cond=>condition: 写文章?|approved:>https://kuaizi-co.github.io/blog/
c2=>condition: 是否自动发布|rejected
io=>inputoutput: Git push...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
@flowend