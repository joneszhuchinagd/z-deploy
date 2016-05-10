#!/usr/bin/env node

"use strict";
const LIBS = '../libs/';
var console = require(LIBS + 'color_console');
var init = require(LIBS + 'init');
var Promise = require('bluebird');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');

var command = argv['_'][0];

switch (command) {
    case 'init':
        init.create_deploy_dir(argv)
            .then(()=> {
                console.info('成功生成开发目录!');
            })
            .catch(err=> {
                console.error(err);
            })
        break;
    default :
        process.argv.push(
            '--cwd',
            path.resolve(__dirname, '../')
        );
        require('gulp/bin/gulp');
        break;
}


