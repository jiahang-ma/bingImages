## 一键下载最近7天的必应每日一图

### 使用方法

>- npm run start

### 打包方法

>- tsc -w 会自动监视文件变化,从而重新打包

### 注册到windows服务

>- node nw.js
>- 在服务里面查看,如果已经有node_bing,就是添加成功了
>- 因为nw.js只能执行app.js文件. 所以需要至少打包一次,才能使用.如果代码有更改,那么需要重新打包

### 将nginx注册到windows服务

>- 在项目下nginx文件夹内启动`cmd`输入 `nginx-service.exe install`

### 从windows中注销服务

>- sc delete 服务名称
>- 服务名称在资源管理器服务里面右键属性查看服务全名

### bing每日一图前端

>- bing-gallery内为angular6开发的bing美图前端部分,打包以后80端口即可访问
>- 打包: 在bing-gallery内使用ng build --prod 即可完成打包

### 等待开发

>- 将此用于打包放入docker,更简单的使用此应用
