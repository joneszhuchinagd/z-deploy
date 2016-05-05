#!/usr/bin/env node

"use strict";
const LIBS = '../libs/';
var console = require(LIBS + 'color_console');
var init = require(LIBS + 'init');
var Promise = require('bluebird');
var argv = require('minimist')(process.argv.slice(2));

var command = argv['_'][0];

//缺少命令
if (!command) {
    console.error("错误: 必须输入一个命令 如(init,build,publish)");
    return;
}

switch (command) {
    case 'init':
        init.create_deploy_dir()
            .then(()=> {
                console.info('成功生成开发目录!');
            })
            .catch(err=> {
                console.error(err);
            })
        break;

}

