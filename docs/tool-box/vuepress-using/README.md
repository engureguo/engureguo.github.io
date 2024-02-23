# Vuepress v1 实践记录

## 开始编写文章

1、在 md 文件头部使用 `YAML front matter` 语法，用于自动生成侧边栏

```
---
sidebarDepth: 2
sidebar: auto
---
```

2、根据上一步配置，组织文章标题时需要遵守的规则为：文章标题使用一级标题；章节标题使用二级标题。示例：

```markdown
# title

## chapter 1

this is chapter 1

## chapter 2

this is chapter 2
```

3、修改 config.js，指定文章所在的分类

## 参考

- [网站所在仓库](https://gitee.com/egu0/ops)
- [vuepress-v1 中文文档](https://v1.vuepress.vuejs.org/zh/guide/)
- [vuepress v1 使用教程，来自 codemonkey](https://www.youtube.com/playlist?list=PLGR7Axzvu1uyrMhld39BK1BqP7ncPkTaV)
