(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{146:function(t,s,a){t.exports=a.p+"assets/img/function.ecd909e2.jpg"},170:function(t,s,a){"use strict";a.r(s);var n=[function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"函数"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#函数","aria-hidden":"true"}},[t._v("#")]),t._v(" 函数")]),t._v(" "),n("h2",{attrs:{id:"函数声明"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#函数声明","aria-hidden":"true"}},[t._v("#")]),t._v(" 函数声明")]),t._v(" "),n("p",[t._v("函数就是一个可以反复调用的代码块，可以传入参数，可以有返回值")]),t._v(" "),n("p",[t._v("声明一个函数有五种方式")]),t._v(" "),n("p",[t._v("第一种：这种声明会存在函数提升，即使函数声明代码放在调用函数代码的后面，也是可以的，和变量的声明提升是一样的")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("xxxx")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x2"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token comment"}},[t._v("// 函数所要执行的代码")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("// 访问函数可以直接使用 xxxx 标志符访问")]),t._v("\n")])])]),n("p",[t._v("第二种：使用一个变量来保存匿名函数")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),n("span",{attrs:{class:"token function-variable function"}},[t._v("x")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x2"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token comment"}},[t._v("// 函数所要执行的代码")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("// 访问函数可以通过变量 x 访问")]),t._v("\n")])])]),n("p",[t._v("第三种：第一、二种的结合版")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),n("span",{attrs:{class:"token function-variable function"}},[t._v("x")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("xxx")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token comment"}},[t._v("// 函数所要执行的代码")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("div",{staticClass:"warning custom-block"},[n("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),n("p",[t._v("这种方式还是只能通过 x 来访问函数，不能通过 xxx 访问")])]),t._v(" "),n("p",[t._v("第四种：使用"),n("code",[t._v("window.Function")]),t._v("函数对象定义")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" x "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{attrs:{class:"token class-name"}},[t._v("Function")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x2"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" lastone"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("// lastone 为函数体所要执行的代码，类型为字符串")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("// 之前传递的参数都是函数定义的参数")]),t._v("\n")])])]),n("p",[t._v("第五种：箭头函数（es6语法）方式")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),n("span",{attrs:{class:"token function-variable function"}},[t._v("x")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x2"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token comment"}},[t._v("// 函数所要执行代码")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("// 函数体只有一行 return 语句时，可以简写成如下形式")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),n("span",{attrs:{class:"token function-variable function"}},[t._v("x")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x2"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" x1 "),n("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" x2 "),n("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("// 函数参数只有一个时可以简写如下形式")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),n("span",{attrs:{class:"token function-variable function"}},[t._v("x")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" x1 "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" x1 "),n("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v(" x1\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h2",{attrs:{id:"函数的本质"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#函数的本质","aria-hidden":"true"}},[t._v("#")]),t._v(" 函数的本质")]),t._v(" "),n("p",[t._v("在浏览器中声明一个函数，打印出来如下\n"),n("img",{attrs:{src:a(146),alt:"函数的本质"}}),t._v("\n由上图可以，函数的本质也是一个对象，有arguments、caller、length、name等属性，对象的原型prototype的指向了Object.prototype，对象的"),n("code",[t._v("__proto__")]),t._v("指向了Function.prototype，这也就是为什么函数可以使用apply，bind，call等方法的原因")]),t._v(" "),n("p",[t._v("所以说函数本质上也是一个对象，这个对象的"),n("code",[t._v("__proto__")]),t._v("指向了Function.prototype")]),t._v(" "),n("p",[t._v("下面来介绍es6中的箭头函数")]),t._v(" "),n("h2",{attrs:{id:"箭头函数的基本语法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#箭头函数的基本语法","aria-hidden":"true"}},[t._v("#")]),t._v(" 箭头函数的基本语法")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),n("span",{attrs:{class:"token function-variable function"}},[t._v("fn")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("param1"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" param2"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token comment"}},[t._v("// 函数体代码")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("// 当只有一个参数或者函数体只有一条语句则可以这么写")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),n("span",{attrs:{class:"token function-variable function"}},[t._v("fn")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" param1 "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" 语句\n")])])]),n("p",[t._v("从上面代码看只是换了一种简洁方式声明一个函数，但是远不止这么简单")]),t._v(" "),n("h3",{attrs:{id:"es6箭头函数解决了什么问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#es6箭头函数解决了什么问题","aria-hidden":"true"}},[t._v("#")]),t._v(" es6箭头函数解决了什么问题")]),t._v(" "),n("p",[t._v("先来看es6之前的函数的一个问题，看如下代码")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" name "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'window'")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("getName")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("log")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token keyword"}},[t._v("this")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" obj "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    name"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'obj'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    getName"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" getName \n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{attrs:{class:"token function"}},[t._v("getName")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("// 等价于window.getName(), this的值是window")]),t._v("\nobj"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("getName")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("// this的值时obj")]),t._v("\n\ngetName"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("call")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \nobj"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("getName"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("call")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("p",[t._v("由上面代码可知，函数的this值是有调用的时候决定的，一般是指向"),n("code",[t._v(".")]),t._v("前面那个对象，使用call来调用时，call的第一个参数就是this，call第二个之后的参数都会当做函数调用时的参数。函数里面的"),n("code",[t._v("this")]),t._v("，本质上就是call函数的第一个参数。")]),t._v(" "),n("p",[t._v("但是箭头函数是没有上面这个规则的，不管你使用哪种方式调用，我是不管this的，由于函数内是没有this，由于作用域链的关系，会往作用域链上面找，所以会是"),n("code",[t._v("window")]),t._v("对象")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" name "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'window'")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),n("span",{attrs:{class:"token function-variable function"}},[t._v("getName")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("log")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token keyword"}},[t._v("this")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" obj "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    name"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'obj'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    getName"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" getName"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    getThis"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            console"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("log")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token keyword"}},[t._v("this")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("// 箭头函数内不存在 this, 就会往作用域上找到this")]),t._v("\n"),n("span",{attrs:{class:"token function"}},[t._v("getName")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("// window")]),t._v("\nobj"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("getName")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("// window")]),t._v("\n\ngetName"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("call")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("//window")]),t._v("\nobj"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("getName"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("call")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("//window")]),t._v("\n\nobj"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("getThis")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("// 由作用域链往上找，最终的this就是obj")]),t._v("\n")])])]),n("p",[t._v("总结:")]),t._v(" "),n("ol",[n("li",[t._v("箭头函数内不存在"),n("code",[t._v("this")]),t._v(", 需要this的时候会去作用域链的上端找，")]),t._v(" "),n("li",[t._v("es6之前的函数声明的"),n("code",[t._v("this")]),t._v(", 使用调用的时候决定，本质上是由call的第一个参数决定的")])])])}],o=a(0),e=Object(o.a)({},function(){this.$createElement;this._self._c;return this._m(0)},n,!1,null,null,null);e.options.__file="arrowFunction.md";s.default=e.exports}}]);