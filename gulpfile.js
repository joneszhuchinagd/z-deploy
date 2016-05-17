/**
 * Created by joneszhu on 16/5/10.
 */
"use strict";
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var sass = require('./libs/sass');
var html = require('./libs/html');
var res = require('./libs/res');
var browserify = require('./libs/browserify');
var Promise = require('bluebird');
var browser_sync = require('browser-sync').create("bsync");
var global = require('./libs/global');
var del = require('del');


browserify.init();

gulp.task('default', ()=> {
    browser_sync.init({
        server: {
            baseDir: global.PWD
        },
        browser: "google chrome",
        open: "external",
    });
    return Promise.all([
        sass.watch(),
        html.watch(),
        res.watch(),
        browserify.watch()
    ])
});

gulp.task('publish', ()=> {
    return del([path.join(global.PWD, 'release/**/*')])
        .then(()=> {
            return html.publish();
        })
        .then(()=> {
            return sass.publish();
        })
        .then(()=> {
            return browserify.publish();
        })
        .then(()=> {
            return res.publish();
        })
});