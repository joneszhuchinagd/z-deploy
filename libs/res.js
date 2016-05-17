/**
 * Created by joneszhu on 16/5/11.
 */


'use strict';
var gulp = require('gulp');
var browser_sync = require('browser-sync');
var path = require('path');
var global = require('./global');
var Promise = require('bluebird');


/**
 * 监听img,audio等静态资源
 * @param config
 */
exports.watch = function (config) {
    return new Promise((resolve, reject)=> {
        gulp.watch(path.join(global.PWD, 'resources/**/*'), ()=> {
            browser_sync.get("bsync").reload();
        });
        resolve();
    })
}
