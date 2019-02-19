# 虚拟DOM
## 虚拟DOM的由来和作用
介绍虚拟DOM前，先来看一下DOM是什么和虚拟DOM产生的原因

DOM是浏览器提供操作HTML元素的一套API，W3C负责DOM标准的制定，浏览器厂商按照W3C标准去实现这套API；DOM操作是一个比较耗费系统资源的，在Jquery时代，前端都是使用Jquery在原生DOM API下封装好的API来进行前端页面交互逻辑的编写。

随着时代发展，web应用越来越复杂的情况下，使用Jqeury操作DOM的问题就显现出来了，DOM操作是很耗费系统资源的，频繁操作DOM经常会出现一些页面卡顿相关的问题，那么我们就需要对DOM操作进行优化了，那么怎么优化呢？那么虚拟DOM就是为了解决这个问题而产生的。

最早React.js中使用到了虚拟DOM技术

## 虚拟DOM核心原理
虚拟DOM是使用一个js对象来映射HTML，示例如下
``` js
let vNodes = {
    tagName: "div", // 标签名
    // 存放标签属性
    attributes: {
        "className": "parent",
        ...
    },
    // 子节点
    children: [
        {
            tag: "div",
            attributes: {
                "className": "child1",
                ...
            },
            chiidren: [
                ...
            ]                        
        },
        ...
    ]
}
```
上面js对象映射出来这样的HTML结构
``` html
<!-- 三个点表示省略的元素或者属性 -->
<div class="parent" ...>
    <div class="child1">
        ...
    </div>
    ...
</div>
```

有了js数据结构的映射之后呢，就需要根据数据结构去生成真实的HTML，这里有个函数render，需要提供js映射的数据
``` js 
function render (vNodes) {
    // 具体实现就是调用原生的DOM API去生成真实的HTML
}
```

当页面有一系列变化的时候，会将变化映射到js对象上面，有了变化前的数据和变化后的数据，会使用一套diff算法，找到页面变化的一个最优的DOM操作，核心就是这个diff算法的实现，算法会得到一个最优的DOM操作来优化

综上，虚拟DOM解决的问题是复杂页面DOM操作优化的问题，核心是diff算法的实现