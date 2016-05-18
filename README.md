# z-deploy
>单页应用自动化构建框架


***

##why z-deploy
* 集成browserify+watchify+babelify开发环境，支持最新es2015语法，支持require node/npm模块.
* 集成browser-sync，支持多终端同时监听，自动刷新页面
* 支持sass
* 支持全文件自动添加md5版本号
* 自动修改资源引用的相对路径

## 安装

```
[sudo] npm install -g z-deploy
```

## 基本命令

### init
初始化开发目录，自动创建目录结构。

```
[sodu] z-deploy init [--overwrite][-o]
```
##### options:
* --overwrite or -o 覆盖当前工作目录下可能重名的文件以及目录

##### folders:

```
-assets //存放psd、doc等文件
-bin-debug //生成临时编译文件
-css //sass scss
 main.scss //样式文件入口
 --libs //存放scss类库
 	normalize.scss 

-js //es2015
 main.js //前端逻辑入口
 --libs (存放js类库)
 	ployfill.min.js
-release //发布目录
-resources
 --images
 --videos
 --sounds
-server //node服务
index.html 
  	 
```


### default
监听文件的修改，自动编译SASS、BABEL，自动刷新浏览器等。

```
[sodu] z-deploy
```


### publish
发布项目文件，打包压缩js、css等资源，修改引用路径，增加版本号等。

```
[sodu] z-deploy publish
```


## warn
* js/libs下的js文件引入支持require以及script.
* 如果运行出现permission denied错误,请加上sudo.


