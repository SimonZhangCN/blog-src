# let和const
## es6为什么要新增let和const
es5声明一个变量是使用`var`来声明的，es6引入`let`和`const`来声明变量，
首先来看一下使用var声明会存在什么问题
``` js 
function fn() {
    if (true) {
        console.log(a)
    } else {
        var a
        cnosole.log(1)
    }
}
fn() 
```
上述代码，按照正常思维是会报错的，因为a没有声明就被使用了，但是打印出来的是`undefined`，
这就是因为var声明的变量存在声明提升，就是会把`var a`提前。var声明的变量还会挂载在window对象下面（函数内声明的不会）

所以，var存在下面两个重大问题
1. 变量声明提升，容易出现bug
2. 一不小心就会污染全局变量，多人合作开发时很容易出问题
3. 无法声明局部变量，es5声明局部变量只能使用立即执行函数

## let和const
先来看一段代码
``` js 
{
    console.log(a) // 会报错
    let a = 1

    const A // 会报错报错，const必须在声明的时候赋值
    A = 2
    
    const B = 2 
    B = 3  // 会报错
}
console.log(A)   // 会报错
```
es6在`{}`中使用声明`let`和`const`就会让变量只在这个花括号内能够访问到

总结：
1. let和const都是用于声明一组括号内可以被访问的变量，也就是局部变量
2. let可以先声明，再赋值，const不可以
3. const声明的变量只有一次赋值机会，也就是其它编程语言里面有的常量
4. let和const在一组花括号内不能重复声明相同的变量

所以，基本可以放弃使用`var`声明变量了