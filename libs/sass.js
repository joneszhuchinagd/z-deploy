/**
 * Created by joneszhu on 16/5/10.
 */
"use strict";
var gulp = require('gulp');
var sass = require('gulp-sass');
var Promise = require('bluebird');
var path = require('path');
var console = require('./color_console');
var browser_sync = require('browser-sync');
var replace = require('gulp-replace');
const global = require('./global');
var md5 = require("gulp-md5-plus");


exports.watch = function () {
    return new Promise((resolve, reject)=> {
        gulp.watch([path.join(global.PWD, 'css/*.scss'), path.join(global.PWD, 'css/libs/*.scss')], build);
        return build();
    })
}


function build() {
    return new Promise((resolve, reject)=> {
        gulp.src(global.SASS_ENTRY, {base: global.PWD})
            .pipe(sass())
            .on('error', (err)=> {
                console.error(err);
                reject();
            })
            .pipe(gulp.dest(global.DEBUG_DIR))
            .on('end', ()=> {
                browser_sync.get("bsync").reload();
                resolve();
            })
    });
}

exports.publish = function () {
    return new Promise((resolve, reject)=> {
        gulp.src(global.SASS_ENTRY, {base: global.PWD})
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .on('error', (err)=> {
                console.error(err);
                reject();
            })
            .pipe(replace(/(\.\.\/\.\.\/){1}/g, '../'))
            .pipe(md5(5, path.join(global.RELEASE_DIR, '*.html')))
            .pipe(gulp.dest(global.RELEASE_DIR))
            .on('end', ()=> {
                console.info("publish css success");
                resolve();
            })
    })
}

exports.build = build;