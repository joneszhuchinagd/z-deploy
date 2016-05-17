/**
 * Created by joneszhu on 16/5/11.
 */


'use strict';
var gulp = require('gulp');
var browser_sync = require('browser-sync');
var path = require('path');
var global = require('./global');
var Promise = require('bluebird');
var md5 = require("gulp-md5-plus");
var console = require('./color_console');


exports.watch = function () {
    return new Promise((resolve, reject)=> {
        gulp.watch(path.join(global.PWD, 'resources/**/*'), ()=> {
            browser_sync.get("bsync").reload();
        });
        resolve();
    })
}

exports.publish = function () {
    return new Promise(function (resolve, reject) {
        gulp.src(path.join(global.PWD, 'resources/**/*'), {base: global.PWD})
            .pipe(md5(5, [
                path.join(global.RELEASE_DIR, '*.html'),
                path.join(global.RELEASE_DIR, 'js/*.js'),
                path.join(global.RELEASE_DIR, 'css/*.css'),
            ]))
            .pipe(gulp.dest(global.RELEASE_DIR))
            .on('end', ()=> {
                resolve();
                console.info("publish res success");
            })
    })
}
