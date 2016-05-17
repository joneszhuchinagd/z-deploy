/**
 * Created by joneszhu on 16/5/11.
 */
'use strict';
var gulp = require('gulp');
var browser_sync = require('browser-sync');
var path = require('path');
var global = require('./global');
var Promise = require('bluebird');
var replace = require('gulp-replace');
var console = require('./color_console');



exports.publish = function () {
    return new Promise(function (resolve, reject) {
        gulp.src(path.join(global.PWD, '*.html'), {base: global.PWD})
            .pipe(replace(/bin-debug\//g, ''))
            .pipe(gulp.dest(global.RELEASE_DIR))
            .on('end', ()=> {
                resolve();
                console.info('publish html success');
            })
    })
}

exports.watch = function () {
    return new Promise((resolve, reject)=> {
        gulp.watch(path.join(global.PWD, '*.html'), ()=> {
            browser_sync.get("bsync").reload();
        });
        resolve();
    })
}


