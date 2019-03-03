# Swoole

## 写这篇博客的原因
基于swoole扩展开发的php框架（easyswoole、swoft等）已经很多了，框架文档也写的很详细，使用起来非常方便。但是不深入理解swoole扩展工作机制的话，当遇到一些通过看文档解决不了的问题时，那么如果你对swoole工作机制理解的深入的话，也许很快就能够找到解决的办法。

## swoole简介
官方简介如下：
> 使 PHP 开发人员可以编写高性能的异步并发 TCP、UDP、Unix Socket、HTTP，WebSocket 服务。Swoole 可以广泛应用于互联网、移动通信、企业软件、云计算、网络游戏、物联网（IOT）、车联网、智能家居等领域。 使用 PHP + Swoole 作为网络通信框架，可以使企业 IT 研发团队的效率大大提升，更加专注于开发创新产品。

看介绍，让php开发人员不局限于开发web应用。下面从启动一个server开始，来揭开swoole的神秘面纱。

## swoole的版本和环境介绍
swoole-1.x版本需要PHP >= 5.3.10，swoole-4.x版本需要PHP >= 7.0.0，php只需要安装基本的扩展即可

Unix系的操作系统（linux、Mac OSX、ubantu等），可以直接在github下载swoole的源码编译安装扩展，或者使用pecl安装，源码编译安装优点是可以在configure时指定开启哪些选项。

windows系统可以通过安装cygwin，将swoole跑在cygin的环境中，或者win10开启linux子系统，将swoole跑在子系统中

对于扩展的安装就不做过多的介绍。接下来的内容是按照

## 启动一个http-server
先从启动一个http_server来开启swoole之旅。

代码如下：


## swoole的进程模型
swoole启动一个Server后，会存在三种进程
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