# nginx
## nginx简介
维基百科nginx的介绍：
> nginx是一个web server(web服务器)，也可用于反向代理、负载均衡、邮件代理、HTTP缓存。该软件由Igor Sysoev创建，于2004年公开发布。

### nginx产生原因
原因主要有以下三点：
1. 由于互联网的普及、全球化和物联网等，导致互联网的数据量快速增长
2. 服务器的硬件由单核CPU向多核的转变
3. 低效的apache（也是一个web服务器）

由于上面这些原因，nginx解决了以下两个问题
1. 处理高并发、并且保持高性能
2. nginx的架构是基于多核CPU的，能充分利用系统资源

### nginx主要优点
1. 高并发、高性能
2. 可扩展性好：这一点主要取决于它的模块化设计
3. 高可靠性：能在服务器稳定运行数年而不需要重启
4. 热部署：可以在不停止nginx服务的情况下，升级nginx版本
5. 开源协议使用的是BSD许可证：BSD许可证让nginx源代码开源免费，并且可以根据自身需求修改源代码用于商业环境

### nginx四个重要的组成部分
1. 二进制可执行文件：服务器启动是通过这个文件
2. 配置文件nginx.conf：配置文件控制着ngixn的行为
3. 访问日志access.log：记录每个http请求的访问记录
4. 错误日志error.log：当请求异常时会将错误信息写入错误日志，便于排查问题

## nginx的发行版本选择
1. [开源版nginx](http://nginx.org/)：开源免费
2. [商业版nginx](https://www.nginx.com/)：由nginx作者成立的商业公司管理，不开源，使用需要收费
3. [Tengine](http://tengine.taobao.org/)：由淘宝网发起的一个web服务器开源项目，基于nginx基础上，添加了很多高级功能和特性.Tengine修改了nginx的主干代码，也就不会随着官方的Nginx版本走
4. [开源版OpenResty](https://openresty.org/cn/)：OpenResty® 是一个基于 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。
5. [商业版OpenResty](https://openresty.com/cn/)

选择建议：
没有复杂的业务诉求情况下，使用1即可，涉及复杂的业务诉求可以选择4

---

## nginx的编译安装
除了编译安装，还可以通过工具来安装，如yum(linux)、brew（macOS），这种方式安装起来都便捷，而编译安装很大的好处就是可以自己指定需要安装那些模块

接下来需要下载nginx的源码包，[nginx.org](http://nginx.org/en/download.html)，也可以是使用curl命令下载文件，生产环境建议使用stable版本，学习用可以使用最新的版本
``` bash
curl -O http://nginx.org/download/nginx-1.15.8.tar.gz
tar -zxvf nginx-1.15.8.tar.gz
```
进入到解压后的目录，执行配置命令
```
./configure --help
```
上面命令查看可以使用哪些参数，这些参数大概可以分为三类
1. 安装路径设置，一般设置一个`--prefix=PATH`即可，其它目录会相对这个目录生成对应的目录，需要特殊指定的用参数来设置
``` bash
  --prefix=PATH                      set installation prefix
  --sbin-path=PATH                   set nginx binary pathname
  --modules-path=PATH                set modules path
  --conf-path=PATH                   set nginx.conf pathname
  --error-log-path=PATH              set error log pathname
  --pid-path=PATH                    set nginx.pid pathname
  --lock-path=PATH                   set nginx.lock pathname
```
2. 确定使用哪些模块和不使用哪些模块
``` bash
# 这种前缀的通常表示默认不安装，需要安转就要使用参数指定
--with-
# 这种前缀的通常默认都会安转，不需要安装也要用参数指定
--without-
```
3. 一些杂项参数的设置，具体看文档描述即可

接下来进行编译前的配置，指定一个安装目录（macOS系统做测试），命令行执行完成如下
``` bash
./configure --prefix=/Users/simon/Code/nginx
...
Configuration summary
  + using system PCRE library
  + OpenSSL library is not used
  + using system zlib library

  nginx path prefix: "/Users/simon/Code/nginx"
  nginx binary file: "/Users/simon/Code/nginx/sbin/nginx"
  nginx modules path: "/Users/simon/Code/nginx/modules"
  nginx configuration prefix: "/Users/simon/Code/nginx/conf"
  nginx configuration file: "/Users/simon/Code/nginx/conf/nginx.conf"
  nginx pid file: "/Users/simon/Code/nginx/logs/nginx.pid"
  nginx error log file: "/Users/simon/Code/nginx/logs/error.log"
  nginx http access log file: "/Users/simon/Code/nginx/logs/access.log"
  nginx http client request body temporary files: "client_body_temp"
  nginx http proxy temporary files: "proxy_temp"
  nginx http fastcgi temporary files: "fastcgi_temp"
  nginx http uwsgi temporary files: "uwsgi_temp"
  nginx http scgi temporary files: "scgi_temp"
```
配置之后会生成中间文件目录`objs`，该目录有个`ngx_modules.c`，该文件记录了哪些模块会编译进来
``` bash
# 编译并安装
make && make install
```
进入之前指定的`--prefix`目录，启动文件在sbin目录
``` bash 
sbin/nginx
```
在浏览器访问`http://localhost`即可看到默认的nginx欢迎页面

### nginx配置文件的通用语法介绍
nginx的配置文件有以下语法规则
1. 指令和指令块组成，每条指令以`；`分号结尾
2. 指令与参数间以空格符号分割
3. 指令块以`{}`（大括号）将多条指令组织在一起
4. include语句允许组合多个配置文件以提升可维护性
5. 使用`#`符号添加注释，提升可读性
6. 使用`$`符号就可以使用一个变量
7. 部分指令的参数支持正则表达式

nginx的结构设计是模块化的，一个指令块是由对应的nginx模块去解析并处理的

这里以http指令块来作例子
``` nginx
http {
    include       mime.types;

    server {
        listen       80;
        server_name  localhost;
        root 	     /usr/local/var/www/default;
        access_log   /usr/local/var/log/nginx/default.access.log  main;

        location / {
            index  index.html index.htm index.php;
            autoindex   on;
            include /usr/local/etc/nginx/fastcgi.conf;
            fastcgi_intercept_errors on;
            fastcgi_pass 127.0.0.1:9000;
        }
        location /hls{
            types{
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }
            root /usr/local/var/www;
            add_header Cache-Control no-cache;
        }
    }

    error_page  404     /404.html;
    error_page  403     /403.html;

    include /usr/local/etc/nginx/servers/*.conf;
}
```
http指令块主要有以下几部分组成
1. http
2. server：一个server对应一个或者一组域名服务，设置的域名的时候可以设置多个域名都通过这个server来处理
3. upstream：上游服务，当需要与其它服务交互可以使用到upstrem
4. location：location表示一个url表达式

### 配置参数的常用单位
时间单位有八种
1. ms（milliseconds）：毫秒
2. s（seconds）：秒
3. m（minutes）：分钟
4. h（hours）：小时
5. d（days）:天
6. w（weeks）：周
7. M（months）：月，以30天计算
8. y（years）：年，以365天计算

空间单位有四种
1. 留空：表示字节（bytes）
2. k/K：千字节（kilobytes）
3. m/M：兆字节（megabytes）
4. g/G：吉字节（gigabytes）

## nginx命令行的使用
安转好后使用命令长查看命令帮助
``` bash
nginx -h
# 或者 nginx -?
# 得到如下信息
nginx version: nginx/1.15.7
Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/local/Cellar/nginx-full/1.15.7/)
  -c filename   : set configuration file (default: /usr/local/etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file
```

1. -v，-V：打印出版本信息，-V会打印出编译安装时候的configure选项
2. -t，-T：会检测配置文件是否存在语法问题并打印出问题信息，常用于服务修改后上线前的测试
3. -s：这个会给nginx主进程一个信号，有以下4种
- stop：立刻停止服务
- quit：优雅的停止服务，处理正在进行的请求，新的请求将会直接拒绝，等到处理完所有请求就会停止服务
- reload：这个在不停止对外服务的情况下重新载入配置文件
- reopen：当需要换一个日志文件来记录日志时，可以使用这个信号
4. -c：指定启动的配置文件来启动，不使用默认的配置文件
5. -p：指定运行目录

### nginx版本热更新和日志切割
大致原理：

通过直接替换`sbin`目录下面的`nginx`二进制可执行文件，替换前需要先备份一下之前的二进制文件；给master进程通过`kill`命令发送一个`-USR2`信号，就会使用之前复制的二进制文件启动一个nginx服务，
两个nginx服务是并存的，但是旧的nginx服务中的worker进程是不会监听80和443端口的，之后给旧的nginx的master进程使用`kill`命令发送一个`-WINCH`信号，旧的worker进程就会被关闭，旧master进程会继续运行，当新版本存在问题时，让旧的master进程重新创建worker进程

nginx服务启动之后会生成两个进程一个master和一个worker进程，使用命令行查看
``` bash 
ps aux | grep nginx
# 这里省略调 grep 命令产生的进程
simon 75728 0.0 0.0 4296252  1304  ??  S  9:31PM  0:00.00 nginx: worker process
simon 75727 0.0 0.0 4296016  516   ??  Ss 9:31PM  0:00.00 nginx: master process sbin/nginx
# 75728 为worker进程id
# 75727 为master进程id
```

日志切割原理：

先将日志使用`mv`进行备份（cp命令会造成部分日志丢失问题，而mv不会），在通过执行`nginx -s reopen`就会新生成日志文件


## 静态服务器的一些重要配置
nginx.conf配置文件如下
``` nginx
# 设置worker的进程个数
worker_processes  1;
events {
    # worker进程允许的最大连接数
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on;
    server {
        listen       80;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        location / {
            root   html;
            index  index.html index.htm;
        }
    }
}
```
server中几个重要的设置项
1. listen：监听的端口号
2. server_name：域名
3. root：静态资源的根目录，也可以使用alias
root和alias使用上有差别，主要有以下几点
- alias只能在location中使用，root可以在http、server、location中使用
- alias指定当前location的访问根路径，
4. gzip：为了让静态资源文件在网络中传输更快，需要使用这个指令
``` nginx
# gzip是设置在http指令块里面的
# 开启gzip
gzip on;
# 设置需要压缩文件的最小值，无单位默认是字节（Bytes），也可使用其它单位
# 压缩是需要消耗服务器CPU资源的，所以压缩最小值设置不能过小，设置很小的值只是为了测试效果
gzip_min_length 1;
# 设置文件压缩等级
gzip_comp_level 2;
# 设置那些类型的文件需要压缩
gzip types text/plain text/css text/javascript application/xml image/gif;
```
5. autoindex: 当根目录或者根目录下某个子目录需要以一个列表的形式展现的时候可以，使用这个指令
``` nginx
# 这个指令在location指令块中
autoindex on;
```
6. set $limit_rate：设置资源的传输速度；在服务器带宽有限的情况下，当用户访问某些大资源文件的时候，不设置传输速度的话，会影响其它用户或其它资源的访问，这个值设置在location中
``` nginx
# 可以给某些大资源文件放在一个目录，通过一个location去限制一下他的传输速度
# set 也可设置其它东西，具体需要去nginx官网查看提供了哪些变量可以设置
set $limit_rate 1k;
```
7. log_format：定义日志的格式，在http指令块中使用，可以存在多个log_format用于针对不同场景写不同的日志
``` nginx
# main 表示这种日志格式的名字，后面的变量表示日志的格式，具体有哪些变量可供使用需要查看官方文档
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                     '$status $body_bytes_sent "$http_referer" '
                     '"$http_user_agent" "$http_x_forwarded_for"';
```
8. access_log和error_log：设置访问日志和错误日志，可以在server和location指令块中使用，写在不同的指令块中，决定了请求如何写日志
``` nginx
# 通过之前给log_format设置名字，在这里就可以使用了
access_log logs/access.log main;
error_log logs/error.log error;
```