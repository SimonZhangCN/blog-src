# Server详解
## 启动server流程图
下图是官方的启动server的流程图
![server启动流程图](./swoole.jpg)
之前的入门篇介绍了创建一个http-server和websocket-server，这两种server都是继承自`swoole\server`的，所以下面讲的同样适用swoole入门篇的server

启动server前通常需要做以下三个步骤
1. 实例化server对象，需要设定绑定ip和端口号
2. 设置server启动前的配置选项
3. 注册不同事件回调处理函数，官方文档中支持13种事件

图中$serv->start()后，会存在三种类型的进程（master，manager，worker、taskWorker），下节通过启动一个server，结合ps和pstree命令来查看启动server之后的进程结构

## Server的进程模型
Server存在[两种运行模式](https://wiki.swoole.com/wiki/page/353.html)，单线程模式和进程模式，下面我们只介绍进程模式

先看如下server.php代码
``` php
$serv = new Swoole\Server('0.0.0.0', 9501, SWOOLE_PROCESS, SWOOLE_SOCK_TCP);

$serv->on('start', function ($server) {
    echo 'master进程ID：' . $server->master_pid . PHP_EOL;
    echo 'manager进程ID：' . $server->manager_pid . PHP_EOL;
    var_dump($server->setting);
});

$serv->on('WorkerStart', function (Swoole\Server $server, int $worker_id) {
    if ($server->taskworker) {
        echo 'taskWorker进程ID：' .$server->worker_pid . PHP_EOL;
    } else {
        echo 'worker进程ID：' .$server->worker_pid . PHP_EOL;
    }
});

$serv->start();
```
在命令行中输入`php server.php`启动server，在命令行会看到如下的打印信息
``` bash 
master进程ID：640
manager进程ID：641
array(4) {
  ["worker_num"]=>
  int(4)
  ["task_worker_num"]=>
  int(0)
  ["buffer_output_size"]=>
  int(2097152)
  ["max_connection"]=>
  int(7168)
}
worker进程ID：642
worker进程ID：643
worker进程ID：644
worker进程ID：645
```
代码中其实没有指定任何的server配置项，但是确打印出来了4个配置项，而且其中的worker进程的数量为4

使用`ps aux | grep server.php`
``` bash
simon              656   0.0  0.0  4286452    832 s001  S+    1:19PM   0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn server.php
simon              645   0.0  0.0  4375576   3196 s002  S+    1:19PM   0:00.00 php server.php
simon              644   0.0  0.0  4367384   3244 s002  S+    1:19PM   0:00.00 php server.php
simon              643   0.0  0.0  4375576   3192 s002  S+    1:19PM   0:00.00 php server.php
simon              642   0.0  0.0  4375576   3196 s002  S+    1:19PM   0:00.00 php server.php
simon              641   0.0  0.0  4377504    620 s002  S+    1:19PM   0:00.00 php server.php
simon              640   0.0  0.4  4389680  30768 s002  S+    1:19PM   0:00.14 php server.php
```
第一行使用grep命令产生的进程可以忽略，可以看到第二列的进程ID和之前启动server时打印的进程ID一致，而且worker进程的个数为swoole扩展自己定义

使用命令`pstree -p 640`，640为之前的master进程ID，打印出如下信息
``` bash 
-+= 00001 root /sbin/launchd
 \-+= 93751 simon /Applications/iTerm.app/Contents/MacOS/iTerm2
   \-+= 94118 simon /Applications/iTerm.app/Contents/MacOS/iTerm2 --server login -fp simon
     \-+= 94119 root login -fp simon
       \-+= 94120 simon -zsh
         \-+= 00640 simon php server.php
           \-+- 00641 simon php server.php
             |--- 00642 simon php server.php
             |--- 00643 simon php server.php
             |--- 00644 simon php server.php
             \--- 00645 simon php server.php
```
可以很清楚的看到进程之间的关系，下面看一下官方给出的进程结构图
![进程结构图](./process1.png)
下图为官方给出的各种进程的主要处理的任务
![进程功能图](./process.jpg)

总结：

swoole启动一个Server后，会存在2+N+M个进程，N表示worker进程的个数，M为taskWorker进程个数
1. Master：是一个多线程程序
2. Manager
- 专门负责worker/task进程的fork操作和管理, manager的任务本来可以由master进程来负责，对于多线程的Master进程而言，想要多Worker进程就必须fork操作。通常，worker进程被误杀或者由于业务代码出现异常的原因会导致进程异常退出，Manager进程为了保证设计上master进程的稳定，将worker进程管理交给了manager进程
3. worker/taskWorker：
- worker：主要业务逻辑都是都是在worker进程中处理
- task：耗时任务一般都会在worker进程中将任务投递给这个进程处理

swoole所使用的这种进程架构模型，创始人韩天峰-Rango在慕课网写了一篇手记文章来深度讲述，请移步[慕课网手记传送门](https://www.imooc.com/article/8449)阅读

## 事件回调函数
之前慕课手机那篇文章中介绍到请求过来最后都会转化成一个事件，根据绑定的事件回调函数来进行处理。结合入门篇讲到的http-server的onRequest事件回调，websocket-server的onHandShake、onOpen、onMessage事件回调，还有如下事件回调
- onStart
- onShutDown
- onManagerStart
- onManagerStop
- onWorkerStart
- onWorkerError
- onWorkerExit
- onWorkerStop
- onTask
- onFinish
- onConnect
- onReceive
- onClose

下面以代码来演示一下各个事件的触发，server.php代码如下
``` php
$serv = new Swoole\Server('0.0.0.0', 9501, SWOOLE_PROCESS, SWOOLE_SOCK_TCP);

$serv->set([
    'worker_num' => 2,
    'task_worker_num' => 1,
    'reload_async' => true
]);

// 下面所有事件回调的详细介绍请查看官方文档，以更加全面了解
$serv->on('start', function (Swoole\Server $server) {
    echo '触发了Start事件回调' . PHP_EOL;
    echo 'master进程ID：' . $server->master_pid . PHP_EOL;
    echo 'manager进程ID：' . $server->manager_pid . PHP_EOL;
});
// 整个服务停止时触发的回调
$serv->on('ShutDown', function (Swoole\Server $server) {
    echo '触发了ShutDown事件回调' . PHP_EOL;
});

// manager进程启动时触发的回调
$serv->on('ManagerStart', function (Swoole\Server $server) {
    echo '触发了ManagerStart事件回调' . PHP_EOL;
});
// manager进程结束时触发的回调
$serv->on('ManagerStop', function (Swoole\Server $server) {
    echo '触发了ManagerStop事件回调' . PHP_EOL;
});


// worker/taskWorker进程启动时触发的回调
$serv->on('WorkerStart', function (Swoole\Server $server, int $worker_id) {
    echo '触发了WorkerStart事件回调，' .
        ($server->taskworker === true ?
            'taskWorker进程PID为' . $server->worker_pid :
            'Worker进程PID为' . $server->worker_pid) . PHP_EOL;
    // 使用php的Fatal Error模拟进程异常退出的错误，进程出错就可以触发WorkerError事件回调
    // 一般情况都会在业务代码使用try catch捕获异常，防止进程异常重启
    // 使用命令：php server.php >> test.txt   将命令行打印的信息输出到文本文件中查看
    // new fsfsdfds();
});
// worker/taskWorker进程异常触发的回调
$serv->on('WorkerError', function (Swoole\Server $server, int $worker_id) {
    echo '触发了WorkerError事件回调' . PHP_EOL;
});
$serv->on('WorkerExit', function (Swoole\Server $server) {
    echo '触发了WorkerExit事件回调' . PHP_EOL;
});
// 进程结束会触发此回调函数
$serv->on('WorkerStop', function (Swoole\Server $server, int $worker_id) {
    echo "触发了WorkerStop事件回调" . PHP_EOL;
});

$serv->on('Task', function (Swoole\Server $server, int $task_id, int $src_worker_id, $data) {
    echo '接收到了worker进程投递过来的任务，收到投递任务时发送的信息如下' . PHP_EOL;
    var_dump($data);
    // 通知worker进程任务处理完成
    sleep(3);
    $server->finish('task finish');
});
// 任务完成后的回调处理函数
$serv->on('Finish', function (Swoole\Server $server, int $task_id, string $data) {
    echo '接收到了任务完成的通知，任务完成传递过来的数据如下' . PHP_EOL;
    var_dump($data);
});


// 客户端建立连接时触发的回调
$serv->on('Connect', function (Swoole\Server $server, int $fd, int $reactorId) {
    echo '触发了Connect事件回调' . PHP_EOL;
});
// 收到客户端发送过来的数据时触发的回调，
//如果启动的是udp服务，监听的是onPacket事件
$serv->on('Receive', function (Swoole\Server $server, int $fd, int $reactor_id, string $data) {
    echo '触发了Receive事件回调' . PHP_EOL;
    $server->task('发送给taskWorker进程的数据');
});
// 客户端或者服务端断开连接时触发的回调
$serv->on('Close', function (Swoole\Server $server, int $fd, int $reactorId) {
    echo '触发了Close事件回调' . PHP_EOL;
});

$serv->start();
```
使用命令`php server.php`启动TCPServer，会有如下打印信息
``` bash
触发了ManagerStart事件回调
触发了Start事件回调
master进程ID：32855
manager进程ID：32856
触发了WorkerStart事件回调，taskWorker进程PID为32857
触发了WorkerStart事件回调，Worker进程PID为32858
触发了WorkerStart事件回调，Worker进程PID为32859
```
在新的命令行窗口通过使用`kill -USR1 32855`命令向主进程发送平滑重启worker和taskWorker进程，之前命令行会新增如下打印
``` bash 
触发了WorkerStop事件回调
触发了WorkerStop事件回调
触发了WorkerStop事件回调
触发了WorkerStart事件回调，Worker进程PID为33723
触发了WorkerStart事件回调，Worker进程PID为33724
触发了WorkerStart事件回调，taskWorker进程PID为33725
```
再通过一个swoole扩展提供的client客户端来连接前面启动的server，client.php代码如下
``` php
$client = new swoole_client(SWOOLE_SOCK_TCP);
if (!$client->connect('127.0.0.1', 9501, -1))
{
    exit("connect failed. Error: {$client->errCode}\n");
}
$client->send("hello world\n");
$client->close();
```

使用命令`php client.php`，会看到之前开启server的命令行窗口新增打印如下信息
``` bash
触发了Connect事件回调
触发了Receive事件回调
触发了Close事件回调
接收到了worker进程投递过来的任务，收到投递任务时发送的信息如下
string(34) "发送给taskWorker进程的数据"
接收到了任务完成的通知，任务完成传递过来的数据如下
string(11) "task finish"
```

string(11) "task finish"，这行信息会延迟3秒打印，使用sleep(3)来模拟耗时操作，worker进程和taskWorker进程都是用来处理业务逻辑的进程，而taskWorker是专门用来处理这种耗时任务的

下面通过使用命令`kill -SIGTERM 32855`向master进程发送安全终止的信号，之前的server命令行窗口会新增如下打印信息
``` bash
触发了WorkerStop事件回调
触发了WorkerStop事件回调
触发了WorkerStop事件回调
触发了ManagerStop事件回调
触发了ShutDown事件回调
```
上面演示了一个server启动到终止的完整生命周期，其中WorkerExit事件一直没有触发，暂未找到问题，不知道是不是一个bug。

## server启动配置项
官方文档中的配置项，大概有以下几类，这里只做大概介绍，细节请移步[官方文档](https://wiki.swoole.com/wiki/page/274.html)
1. 进程数和最大连接数相关配置
- reactor-num：主进程内事件处理线程的数量，充分利用cpu资源，默认会和CPU核数一样
- worker_num：启动的worker进程数
- max_request：worker进程的最大任务数，主要作用是解决php进程内存溢出问题
- max_conn：最大允许维持多少个TCP连接
- task_worker_num：耗时任务taskWoker进程的个数
- task_max_request：taskWorker进程的最大任务数，同max_request作用一样
- task_tmpdir：投递任务时传递数据超过8180自己的，将会是用临时文件来存储数据，这个是设置临时文件的存放目录
2. worker进程和taskWorker进程通信模式相关配置
- task_ipc_mode：worker和taskWorker进程通信方式，默认是使用unix socket通信
- message_queue_key：task_ipc_mode使用消息队列的方式，那么需要通过这个来设置消息队列的key值
3. 工作进程安全性相关
具体的业务逻辑都是通过worker和taskWorker进程来处理的，如果代码存在漏洞，服务器的安全性就会降低，linux系统通过用户和用户组来控制权限，存在代码漏洞的情况下，也不至于服务器很容易被攻破
- user：设置worker和taskWorker进程所属用户
- group：设置worker和taskWorker进程所属用户组
- chroot：设置worker/taskWorker进程的根目录，作用是隔离操作系统其它的目录
4. cpu亲和性设置
- open_cpu_affinity：启用CPU亲和性设置，此特性会将swoole的reactor线程/worker进程绑定到固定的一个核上。可以避免进程/线程的运行时在多个核之间互相切换
- cpu_affinity_ignore：用于设置不占用哪些CPU
5. 日志文件等的配置
- daemonize：让服务以守护进程的方式启动
- reload_async：设置异步重启，启用次特性，worker进程会等待异步事件完成后再重启进程
- pid_file：server启动时会将master进程的pid写入到此文件
- log_file：设置运行期间的错误日志文件
- log_level：设置什么等级的错误会被抛出
- request_slowlog_file
6. ssl隧道加密相关
当通信协议需要使用https、wss时，需要通过下面这些来设置证书。通常生产环境，证书的设置都会放在nginx来管理，nginx再把请求代理到上游服务器
- ssl_cert_file
- ssl_key_file
- ssl_method
- ssl-ciphers
- ssl-verify-peer
- ssl_client_cert_file
- ssl_allow_self_signed
7. 协程相关配置
- enable_coroutine：是否开启事件回调中自动创建协程，影响的事件回调请看官方文档
- max_coroutine：设置当前worker进程能创建的最大协程数量
- task_enable_coroutine：设置当前taskWorker进程能创建的最大协程数量，这个特性在V4.2.12版本才支持

swoole也可以使用代码的方式来创建协程，这样灵活性相对于配置的方式会更好，我只需要在我需要用到协程的地方用代码开启
8. 协议相关配置
之前入门篇内容的http-server、ws-server，启动服务式，onStart事件回调中将`$server->setting`打印出来，就可以看到，没通过set方法设置配置项，但是会打印出很多配置项，其中就有下面这些配置项，可以自行去修改之前的入门篇的server代码，将配置项打印出来查看
- open_http_protocol
- open_http2_protocol
- open_websocket_protocol
- open_mqtt_protocol
- open_websocket_close_frame

其它没有提到的都是一些和TCP底层相关配置项，这块内容讲起来需要很多前置知识，对于web开发来说基本也用不上，这里就不做介绍，需要了解请自行查看官方文档

总结：

Server篇以多线程+多进程的架构为主线，结合事件回调和启动前的配置项，来理解server启动背后发生了什么。官方文档还详细介绍了server的属性和方法，这些内容请移步文档中查看。