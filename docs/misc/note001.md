---
sidebarDepth: 2
sidebar: auto
---

# JS 获取随机数

> 一个 demo 文章

## 两种方式

```js
// e.g.1 单例子
// [0, 5]
console.log(Math.round(Math.random() * 5))
console.log(Math.floor(Math.random() * 6))

// e.g.2 通用
// [x, y]，转为 [0, y-x] + x
let x = 4
let y = 13
console.log(Math.round(Math.random() * (y - x)) + x)
console.log(Math.floor(Math.random() * (y - x + 1)) + x)
console.log('---')
```

## 验证随机性

验证随机数的概率分布，发现 `random_floor` 分布比较好，推荐使用

```js
//封装
function random_round(x, y) {
  return Math.round(Math.random() * (y - x)) + x
}
function random_floor(x, y) {
  return Math.floor(Math.random() * (y - x + 1)) + x
}

const count = 10000000
;(function () {
  const staistics = new Map()
  for (let i = 0; i < count; i++) {
    let r = random_round(x, y) // 概率分布有问题！
    // let r = random_floor(x, y)
    if (staistics.has(r)) {
      staistics.set(r, staistics.get(r) + 1)
    } else {
      staistics.set(r, 1)
    }
  }
  // 根据 statistics 的 key 排序
  for (let i = x; i <= y; i++) {
    console.log(`${i} ===> ${(staistics.get(i) / count) * 100}%`)
  }
})()
```
