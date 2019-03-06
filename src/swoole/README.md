# Swoole

## 写这篇博客的原因
基于swoole扩展开发的php框架（easyswoole、swoft等）已经很多了，框架文档也写的很详细，使用起来非常方便。但是不深入理解swoole扩展工作机制的话，当遇到一些通过看文档解决不了的问题时，那么如果你对swoole工作机制理解的深入的话，也许很快就能够找到解决的办法。

## swoole简介
官方简介如下：
> 使 PHP 开发人员可以编写高性能的异步并发 TCP、UDP、Unix Socket、HTTP，WebSocket 服务。Swoole 可以广泛应用于互联网、移动通信、企业软件、云计算、网络游戏、物联网（IOT）、车联网、智能家居等领域。 使用 PHP + Swoole 作为网络通信框架，可以使企业 IT 研发团队的效率大大提升，更加专注于开发创新产品。

看介绍，让php开发人员不局限于开发web应用。下面从启动一个server开始，来揭开swoole的神秘面纱。

## swoole的版本和环境介绍
swoole-1.x版本需要PHP >= 5.3.10，swoole-4.x版本需要PHP >= 7.0.0，php只需要安装基本的扩展即可

Unix系的操作系统（linux、Mac OSX、ubantu等），可以直接在github下载swoole的源码编译安装扩展，或者使用pecl安装，源码编译安装优点是可以在configure时自定义配置选项。

windows系统可以通过安装cygwin，将swoole跑在cygin的环境中，或者win10开启linux子系统，将swoole跑在子系统中

对于扩展的安装就不做过多的介绍，详细安装请自行百度或者谷歌。接下来从我们最熟悉的http-server开始做介绍。

## 启动一个http-server
我自己的环境是macOS系统，PHP版本为7.2.11，swoole扩展为4.2.13。swoole的4.x版本是从2.x版本演化过来的，2.0就支持了协程（学习过go语言的应该听说过），4.x版本对协程实现进行了重构，当然也有一些其它功能的更新。有了协程之后就可以使用写同步的代码来实现异步，不用像1.x版本那样去使用异步回调的代码写法。

传统的php开发都是在web领域，所以先从最熟悉的http_server开始。为了代码的简单，这里使用面向过程的写法，代码如下：
``` php
// 可以是域名或者ip地址，
// 如果是域名就需要通过在本地hosts文件加入  127.0.0.1  swoole-demo.com
$host = 'swoole-demo.com';
$port = '9501';
$http_server = new swoole_http_server($host, $port);

// 启动server前的配置项，暂不做详细介绍，http-server和websocket-server都是继承自server，server再对set方法做详细介绍
$options = [

];
$http_server->set($options);

// 注册request事件回调函数
$http_server->on('request', function ($request, $response) {
    // $request对象携带了请求信息，比如使用$_SERVER,$_GET,$_POST,$_COOKIE等，
    // $response响应对象，比如设置响应头，设置cookie、响应内容等
    // 上诉对象详细内容请查看官方文档介绍
    var_dump($request);
    var_dump($response);

    // 响应信息
    $response->end('<h1>hello world!!!</h1>');
});

// 启动http-server
$http_server->start();
```
将上面代码保存成http-server.php文件，并执行
``` bash
# 使用php-cli执行http-server.php文件，启动之后命令行会是挂起状态，ctrl + c会将http-server关闭
php http-server.php
```
在浏览器访问`http://swoole-demo.com:9501/sfsfsfdsfs/sffsfsdf/sdfsdfsdf`，能在浏览器中看到hello world!!!，而在命令行会打印两次`$request`和`$response`，因为浏览器默认会向服务器发送依次`/favicon.ico`请求。

这里挑一个很重要的值`$request->server['request_uri']`，path_info和request_uri的值是一样的，框架路由功能的实现都是基于这个值的


上述就实现了一个不需要依赖nginx或者apache的一个http服务，官方文档中提到了对http协议的支持不完整，建议在上层使用nginx把请求代理到swoole服务器。

启动一个http-server很重要的几点
1. 启动server前需要使用set对服务器进行配置，讲到server时再对set方法进行详细介绍
2. 需要注册Request事件处理函数，函数有两个参数，$request(请求对象)，$response（响应对象）
3. $request->server['request_url']或['path_info']，框架都是基于这个值来做路由映射到不同的控制器和方法的

接下来使用swoole来实现一个简单的聊天功能

## websocket_server
编写中

## server详解
编写中


## swoole的进程模型
swoole启动一个Server后，会存在三类进程
1. Master
2. Manager
3. worker/taskWorker

### Master进程
是一个多线程程序，包括主线程和Reactor
1. 主线程主要是Accept操作和信号处理
2. Reactor线程负责处理TCP连接、网络IO和收发数据等

### Manager进程
专门负责worker/task进程的fork操作和管理, manager的任务本来可以由master进程来负责，对于多线程的Master进程而言，想要多Worker进程就必须fork操作，但是fork操作是不安全的. 所以Manager进程就是为了保证Master进程的稳定.

通常，worker进程被误杀或者由于程序的原因会异常退出，Manager进程为了保证服务的稳定性，会重新拉起新的worker进程

### worker/taskWorker进程
worker进程：负责具体的业务代码

task进程：负责处理时间比较久的任务