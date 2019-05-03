# php两种常用模式的生命周期
swoole中的大部分功能都必须在php-cli模式运行，所以这节来聊聊php两种常用模式的生命周期

## php-cli模式生命周期
php-cli模式就是我们之前通过`php ***.php`这样的命令直接运行php文件，也叫命令行模式

cli模式的生命周期有五个阶段，分别为
1. 模块初始化阶段(php_module_startup)
2. 请求初始化阶段(php_request_startup)
3. 脚本执行阶段(php_excute_script)
- 此阶段会读取到需要执行的PHP文件，之后对PHP文件进行词法、语法分析成抽象语法树(ast)，ast最终会解析成opcode给zend引擎去执行
4. 请求关闭阶段(php_request_shutdown)
5. 模块关闭阶段(php_module_shutdown)

## php-fpm模式生命周期
php-fpm模式是通过启动很多个worker进程去处理请求，通过nginx将动态请求转发到worker进程处理

fpm模式和cli模式主要有以下几点的不同
1. php-fpm的worker进程和nginx通信使用的是fast-CGI协议，在模块初始化阶段和请求初始化阶段之间会有一个接收网络请求（fcgi_accept_request）的处理
2. 在脚本执行阶段前有个fpm请求执行处理（fpm_request_excuting），之后有个fpm请求结束处理（fpm_request_end）
3. php-fpm是常驻内存的，请求关闭阶段（php_request_shutdown）后，又会回到fcgi_accept_request继续循环处理网络请求，当进程退出时，才会进入到模块关闭阶段

## php不同类型框架性能比较
通过对php两种生命周期的学习，突然萌发出想要写这篇不同PHP框架性能的博客

1. 原生php代码
应用不复杂的情况下，用最少php的代码实现功能

这种模式的缺点有如下几点
- 代码不易于后期维护，易冗余
- 复杂应用使用此模式开发效率不高

2. 传统php框架
此种类型的框架的典型代表有laravel、ThinkPHP、YII、CI等，此类型框架将web应用常用到的功能都封装成对应的类，业务代码调用框架的类，快速实现需求

缺点有：
- 每个请求都需要在脚本执行阶段（php_execue_script）解析大量框架的php文件
优点有：
- 开发效率高
- 代码易于维护


3. C扩展类框架
此种类型的框架典型代表有phalcon等。此种框架将所有web开发常用的功能都实现在扩展中，所有框架提供的功能在模块加载阶段就完成了，降低了脚本执行阶段（php_excute_script）性能损失

这种类型框架，在性能和开发效率都不逊色传统的php框架，但是phalcon由于中文文档较少，在国内的普及程度没有传统php框架高

4. 基于swoole扩展的框架
此类框架的代表有Swoft、EasySwoole、lawoole。swoole扩展让php的开发领域不仅仅局限在web应用上面，例如移动通信、企业软件、云计算、网络游戏、物联网（IOT）、车联网、智能家居等领域

此种框架基于swoole强大的异步网络通信引擎，在swoole_server启动后，在worker进程启动后的onWorkerStart事件回调中加载框架文件，只在每个worker进程中常驻框架的文件，网络请求通过对应的事件回调去处理，不用每个请求都需要加载一次框架文件。

优点：
1. 使用swoole提供的毫秒定时器实现定时任务(crontab)
2. 资源池的使用（redis连接池、mysql连接池等）
3. CSP编程模型的实现
4. 性能优异

总结：

基于swoole扩展的框架，拥有了C扩展框架和传统php框架的优点，性能和开发效率上面都很出色，但是对于开发者的要求更加的高了。

接触swoole是在看过韩大佬写过的一篇博客中，讲到计算机基础知识的重要性。一开始看swoole的文档的时候，脑子里面是懵的，看过韩大佬介绍的计算机基础知识的书（C语言程序设计、数据结构与算法分析：C语言版、深入理解计算机系统、现代操作系统、Unix环境高级编程）之后，再次来看swoole的文档的时候，有种醍醐灌顶的感觉。2019年有幸在慕课网跟着陈雷老师学习[全方位深度剖析PHP7底层源码](https://coding.imooc.com/class/312.html)课程，才有了这篇博客的产生。