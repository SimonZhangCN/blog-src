# server详解
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

## 对象生命周期和内存管理