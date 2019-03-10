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
这节，来做一个简单的聊天功能，服务端和客户端之间通信基于[websocket协议](https://www.kancloud.cn/kancloud/websocket-protocol/56235)，不了解此协议，请移步上面链接了解，websocket服务端代码如下
``` php
$host = "swoole-demo.com";
$port = 9501;
$ws_server = new Swoole\WebSocket\Server($host, $port);

// server有一个属性connections记录了所有的连接，当然也包括通过http请求的连接
// 为了避免向不是websocket的连接发送信息，
// 所以这里使用了swoole的内存表记录所有websocket客户端连接
// 表中只有一列name字段
$fd_table = new swoole_table(1024);
$fd_table->column('name', \Swoole\Table::TYPE_STRING, 20);
$fd_table->create();

// 使用内存表记录用户发送的信息
// 存在三列字段fd,name,message
$msg_table = new swoole_table(1024);
$msg_table->column('fd', \Swoole\Table::TYPE_INT);
$msg_table->column('name', \Swoole\Table::TYPE_STRING, 20);
$msg_table->column('message', \Swoole\Table::TYPE_STRING, 200);
$msg_table->create();

// 监听了request事件用于处理http请求，设置根目录让用户能访问到index.html
$ws_server->set([
    'document_root' => '/Users/simon/Study/backEnd/swoole-demo',
    'enable_static_handler' => true,
]);


// 1.客户端和服务端建立连接握手成功后会回调此函数，
// 2.swoole内置了握手，如需自己实现握手可通过绑定handshake事件回调函数，
// 3.自行实现握手后，将不会自动触发open事件
// 4.open和handshake都是可选的
$ws_server->on('open', function (Swoole\WebSocket\Server $server, $request) use($fd_table, $msg_table) {
    // 客户端连接到服务器并完成握手的回调处理函数
    $cur_fd = $request->fd;
    $name = '用户' . $cur_fd;
    // 通知所有用户，有新用户进入聊天室了
    foreach ($fd_table as $fd => $row) {
        $server->push($fd, $name . '进入聊天室了');
    }
    // 将建立连接的用户记录到内存表中
    $fd_table->set($cur_fd, [
        'name' => $name
    ]);
    echo '当前连接的客户端总数'. $fd_table->count(). PHP_EOL;
    // 最多发送10条聊天记录过去
    if ($msg_table->count() > 0) {
        $all_msg = [];
        foreach ($msg_table as $row) {
            $all_msg[] = $row;
        }
        $offset = $msg_table->count() >= 10 ? $msg_table->count() - 10 : 0;
        $data = array_slice($all_msg, $offset, 10);
        $server->push($cur_fd, json_encode($data));
    }
});

// message事件回调必须要设置,否则启动server的时候会失败，open和handshake可以不设置
// message事件用于处理客户端主动发送过来的消息
$ws_server->on('messagess', function (Swoole\WebSocket\Server $server, $frame) use($ws_server, $fd_table, $msg_table) {
    // 向除自己以外的用户发送信息
    $cur_fd = $frame->fd;
    $client_msg = $frame->data;
    $name = $fd_table->get($cur_fd)['name'];
    $msg = "{$name}：{$client_msg}";
    // 模拟用户发送不雅内容时，将用户踢出聊天室
    if ($client_msg == 'fuck') {
        $ws_server->disconnect($cur_fd, 1000, '发送不雅信息，已被赶出聊天室');
        $fd_table->del($cur_fd);
        $msg = $name . '被移除出聊天室';
    } else {
        // 将信息写入到表中
        $msg_table->set(time(), [
            'fd' => $cur_fd,
            'name' => $name,
            'message' => $msg
        ]);
    }
    // 向所有用户（不包括自己）发送消息
    foreach ($fd_table as $fd => $val) {
        if ($fd != $cur_fd) {
            $server->push($fd, $msg);
        }
    }
});


// 客户端断开连接时的处理事件
// ws和http连接底层都会占用一个tcp连接，所以http类请求会在客户端一定时间内没使用时自动断开，也会触发close事件
// 下面只对ws的连接断开进行对在线用户的通知
$ws_server->on('close', function ($ser, $cur_fd) use($ws_server, $fd_table)  {
    // 判断是否是websocket客户端断开连接
    if ($ws_server->isEstablished($cur_fd)) {
        // 删除断开连接客户端
        $name = $fd_table->get($cur_fd)['name'];
        $fd_table->del($cur_fd);
        foreach ($fd_table as $fd => $val) {
            $ser->push($fd, $name.'离开了聊天室');
        }
    } else {
        echo '非webwocket客户端断开连接'.PHP_EOL;
    }
});

// request事件回调函数
$ws_server->on('request', function ($request, $response) use($fd_table, $ws_server) {
    // ws-server继承自https-server，开启服务同时，设置了request的事件回调，即可接收http请求并处理
    // 可以通过手动发送一个http请求，根据请求来向所有连接的ws客户端主动推送消息
    if ($request->server['path_info'] == '/broadcast') {
        foreach ($fd_table as $fd => $val) {
            $ws_server->push($fd, '广播消息');
        }
        $response->end('broadcast success');
    }
});

$ws_server->start();
```
保存文件为ws-server.php，使用`php ws-server.php启动server`，这里我们使用浏览器提供的[websocket API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)，来模拟websoket客户端。在ws-server.php同级目录新建一个index.html文件，为了简单，前端对于消息处理通过弹窗方式
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>swoole-chat</title>
</head>
<body>
<div>
    <h1>chat-demo</h1>
    <input type="text" id="msg">
    <button id="submit">发送</button>
</div>
<script>
    let url = 'ws://swoole-demo.com:9501'
    let ws = new WebSocket(url)

    // 建立连接成功后的回调函数
    ws.onopen = function (event) {
        console.log('和服务器建立连接了', event)
    }

    // 连接失败的回调函数
    ws.onerror = function (event) {
        console.log('连接服务器失败了', event)
    }


    // 接收到服务端发送过来的消息回调事件
    ws.onmessage = function (event) {
        console.log('接收到服务端的信息', event)
        alert(event.data)
    }

    // 向服务器主动发送信息
    // ws.send(Math.random() * 1000)
    document.getElementById('submit').addEventListener('click', function () {
        let msg = document.getElementById('msg').value
        console.log('向服务器发送了' + msg)
        ws.send(msg)
    })

    // 连接关闭后的回调处理函数
    ws.onclose = function (event) {
        console.log('和服务器断开连接了',event)
    }

    // ws.close(主动关闭和服务端的连接)
</script>
</body>
</html>
```
服务端实现要点：

1. open事件的回调处理
- 通知已连接的用户，有新用户进入聊天室了
- 将每一个新连接的用户记录到内存表（内存表暂不做介绍，把他理解成mysql的表）
- 新连接的用户会收到服务端发送过去的最多10条信息
2. message事件的回调处理
- 接收用户发送过来的消息，并写入到内存表
- 将发送过来的信息发给每一个建立连接的用户（不包括发送这条信息的用户）
- 主动将发布不雅内容的用户踢出聊天室
3. onclose事件回调处理
- 将断开连接的用户从内存表中删除
- 通知已建立连接的用户，哪个用户离开了聊天室
4. request事件回调处理
- 使用`server->set`设置了静态文件目录，静态文件目录找不到的请求会被request事件回调处理
- 对/broadcast请求，向建立连接的用户发送广播消息掉
5. ws-server提供几个重要功能函数，详细使用请自行查看官方文档
- disconnect方法：服务端主动关闭掉客户端的连接
- isEstablished：检查连接是否为websocket

到此，一个聊天室的基本功能demo就完成了。