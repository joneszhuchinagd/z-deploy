/**
 * Created by joneszhu on 16/5/10.
 */
"use strict";
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var sass = require('./libs/sass');
var html = require('./libs/html');
var res = require('./libs/res');
var browserify = require('./libs/browserify');
var console = require('./libs/color_console');
var Promise = require('bluebird');
var devip = require('dev-ip');
var browser_sync = require('browser-sync').create("bsync");
var global = require('./libs/global');
var del = require('del');

var config = load_config();

browserify.init(config.browserify);

gulp.task('default', ()=> {
    browser_sync.init({
        server: {
            baseDir: global.PWD
        },
        host: devip()[1]
    });
    return Promise.all([
        sass.watch(config.sass),
        html.watch(config.html),
        res.watch(config.res),
        browserify.watch(config.browserify)
    ])
});

gulp.task('build', ()=> {
    // return Promise.join(sass.build(config.sass));
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
            console.info('publish success');
        })

    // Promise.all([
    //     sass.publish(config.sass),
    //     html.publish(config.html),
    //     res.publish(config.res),
    //     browserify.publish(config.browserify)
    // ]);
});


/**
 * 载入z-config.json配置文件
 */
function load_config() {
    try {
        var config = fs.readFileSync(path.join(process.env.PWD, 'z-config.json'), {encoding: 'utf8'});
    }
    catch (err) {
        if (err.code == 'ENOENT') {
            console.error("根目录下缺少z-config.json配置文件");
            process.exit();
        } else {
            throw err;
        }
    }
    config = JSON.parse(config);
    return config;
}