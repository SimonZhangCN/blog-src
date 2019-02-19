# 对象
## es6新增声明对象的方法
es6新增了一种方式`Object.create()`创建一个对象，可以通过指定第一个参数指定对象的原型

例子：
``` js
// 第一个参数指定新创建对象的原型对象，必须是一个 对象 或者 null
// null值创建的对象原型将未定义，也就不存在对象的一些公用方法，比如toString()等方法
// 第二个参数表示对象拥有的属性描述，可以省略，省略的话值为 undefined
let obj = Object.create(null, {
// foo会成为所创建对象的数据属性
  foo: { 
    // 这个对象是对foo属性的描述
    writable:true,   
    configurable:true,
    value: "hello" 
  },
})
```
::: tip
es6推荐使用`Object.getPrototypeOf(object)`来获取对象的原型
:::

### 属性描述符
属性描述符可以使用六个值来描述
1. configurable: 为 true 时，属性描述符才可以被改变，即是否允许修改这六个属性描述符的值
2. writable: 为 true 时，属性值才可以背被赋值运算符`=`改变
3. enumberable: 为 true 时，对象的属性值才能被枚举（即遍历时是否会被遍历到）
4. value：属性的初始值（即定义的时候的值，描述符未给value值将会是undefined
5. get: 值为一个函数，定义了此函数，将会在获取属性值时执行此函数，函数返回值当做属性值
6. set: 值为一个函数，定义了此函数（需要定义一个参数，接受设置属性时候的属性值），将会在设置属性值时执行次函数，此函数负责修改设置的属性值

::: tip
获取一个对象的属性描述符时:

可以使用`Object.getOwnPropertyDescriptor(object, propertyName)`
:::

### 动态键名
es6可以使用变量来动态生成一个对象的键名

例子：
``` js 
let name = 'Myname'

let obj = {
    [name]: 'Myname'
}
console.log(obj) //  { Myname: 'Myname' }
```
### 使用symbol当做键名
Symbol是一个唯一的字符串，所以是不会存在属性明冲突的
``` js  
let prop = Symbol()
let prop1 = Symbol()
let obj = {
    [prop]: 'symbolKey',
    [prop1]: 'symbolKey1'
}
console.log(obj)  // { [Symbol()]: 'symbolKey', [Symbol()]: 'symbolKey1' }
```
::: tip
symbol的属性键名可以通过`Object.getOwnPropertySymbols(object)`来获取，使用`Object.keys(object)`和`Object.getOwnPropertyNames(object)`是无法获取到的
:::


## 对象的浅拷贝
es6之前浅拷贝一个对象，需要使用一个for循环来实现，es6提供了`Object.assign()`
``` js 
let obj1 = {
    a: 1,
    b: 2
}
// 可以使用另外的一种语法
// let obj2 = {...obj1}
// assign的第一个参数为目标对象，之后的参数是需要拷贝的对象，可以有多个拷贝对象
// 多对象重名属性后面将会覆盖前面的
// 多对象拷贝语法
// let obj2 = {...obj1, ...obj3}
let obj2 = Object.assign({}, obj1) 
console.log(obj2)
obj2.a = 100
console.log(obj1)  // { a: 1, b: 2 } 
```