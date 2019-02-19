# es6的语法糖
语法糖的意思是只是简化写的代码，本质上还是需要通过es6之前的语法实现

## 函数参数默认值
es6的函数参数默认值写法
``` js 
function sumEs6(a, b = 2) {
    return a + b
}
sum(1)
// es6之前是这样定义函数参数默认值的
function sumBeforeEs6(a, b) {
    b = b || 2
    return a + b
}

sumBeforeEs6(1)  // 3
```

``` js 

sum(1)
```

## 函数多参数合并
看如下例子：
``` js
function sum(...numbers) {
    // numbers是一个数组
    let result = 0
    for (let i = 0; i < numbers.length; i ++) {
        result += numbers[i]
    }
    return result
}
sum(1,2,3,4,5,6) 

function sumBeforeEs6() {
    let result = 0
    let numbers = Array.from(arguments)
    for (let i = 0; i < numbers.length; i ++) {
        result += numbers[i]
    }
    return result
}
sumBeforeEs6(1,2,3,4,5,6)
```

## 展开操作
``` js
let array1 = [1,2,3,4,5,6]
let [a,b,c, ...array2] = array1 // es6的语法很简单，es6之前的语法比这个复杂的多
console.log(a,b,c,array2) // a=1 b=2 c=3 array2=[4,5,6]

```

## 解构赋值
``` js 
// 变量交换值
let a = 'a'
let b = 'b'
[a, b] = [b, a]
console.log(a)  // b
console.log(b)  // a
// 附带默认值变量
let [t = 1, x = 2] = ['t'] // t为 't'   x为 2

// 对象
let person = {
    name: 'ssss',
    age: 18
}
let {name, age} = person
console.log(name) // ssss
console.log(age) // 18
// 对象浅拷贝
let obj = {
    name: 'obj',
    age: 18
}
let cloneObj = {...obj}
// 对象合并
let obj1 = {
    p1: 1,
    p2: 2
}
let obj2 = {
    p1: 11,
    p3: 3
}
let obj3 = {...obj1, ...obj2}
// 同名属性后面的会覆盖前面的
console.log(obj3) // { p1: 11, p2: 2, p3: 3 }
// 对象属性
let x = 'x'
let y = 'y'
let z = 'z'
let obj = {
    x, y, 
    [z + '1111']: z, // 动态属性名
    // 函数属性
    hello (name='world') {
        console.log('hello ' + name)
    }
}
console.log(obj)  // { x: 'x', y: 'y', z1111: 'z' }
obj.hello() // hello world
```

## 字符串
``` js 
let text = 'sssssssss'
// 多行文本使用 ` ` 包裹(TAB上面那个键)
// ${text} 会解析成text变量
let mutipleLineText = `
    <div>
        <p>${text}</p>
    </div>
`
console.log(mutipleLineText)
//<div>
//    <p>sssssssss</p>
//</div>

// 函数字符串
let fn = function () {
    console.log(arguments)
}
let line0 = 'line0'
let line4 = 'line4'
// 会执行函数
fn`line1 line2 line3` // { '0': [ 'line1 line2 line3' ] }
// 传递了变量
fn`${line0} line1 line2 line3 ${line4}`
// {
//   '0': [ '', ' line1 line2 line3 ', '' ],
//   '1': 'line0',
//   '2': 'line4' 
// }
```
[函数字符串的应用](https://github.com/styled-components/styled-components)