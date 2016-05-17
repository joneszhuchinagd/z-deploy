/**
 * Created by joneszhu on 16/5/11.
 */
var watchify = require('watchify');
var gulp = require('gulp');
var browserify = require('browserify');
var source_buffer = require('vinyl-source-buffer');
var browser_sync = require('browser-sync');
var path = require('path');
var global = require('./global');
var argv = require('minimist')(process.argv.slice(2));
var Promise = require('bluebird');
var console = require('./color_console');
var md5 = require("gulp-md5-plus");
var uglify = require('gulp-uglify');
var babelify = require('babelify');


var b = null;

function build() {
    return new Promise((resolve, reject)=> {
        b.bundle()
            .on('error', err=> {
                console.error(err);
                reject(err);
            })
            .pipe(source_buffer('bundle.js'))
            .pipe(gulp.dest(path.join(global.DEBUG_DIR, 'js')))
            .on('end', ()=> {
                resolve();
                browser_sync.get("bsync").reload();
            });
    })
}


function build_libs() {
    return new Promise((resolve, reject)=> {
        gulp.src(path.join(global.PWD, 'js/libs/**/*.js'), {base: global.PWD})
            .pipe(gulp.dest(global.DEBUG_DIR))
            .on('end', ()=> {
                resolve();
                browser_sync.get("bsync").reload();
            })
    })
}

function publish() {
    return new Promise(function (resolve, reject) {
        b.bundle()
            .on('error', err=> {
                console.error(err);
                reject(err);
            })
            .pipe(source_buffer('bundle.js'))
            .pipe(md5(5, path.join(global.RELEASE_DIR, "*.html")))
            //.pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            //.pipe(sourcemaps.write())
            .pipe(gulp.dest(path.join(global.RELEASE_DIR, 'js')))
            .on('end', ()=> {
                resolve();
            })
    })
}

function publish_libs() {
    return new Promise((resolve, reject)=> {
        gulp.src(path.join(global.PWD, 'js/libs/**/*.js'), {base: global.PWD})
            .pipe(md5(5, path.join(global.RELEASE_DIR, "*.html")))
            .pipe(gulp.dest(global.RELEASE_DIR))
            .on('end', ()=> {
                resolve();
            })
    })
}

exports.init = function () {
    var debug = true;
    if (argv['_'][0] == 'publish') {
        debug = false;
    }
    b = browserify({
        debug: debug,
        entries: [global.JS_ENTRY],
        cache: {},
        packageCache: {}
    }).transform(babelify, {presets: [path.join(process.cwd(), 'node_modules/babel-preset-es2015')]});

}


exports.watch = function () {
    b.plugin(watchify);
    b.on('update', build);

    gulp.watch(path.join(global.PWD, 'js/libs/**/*.js'), build_libs);

    return Promise.join(build(), build_libs());
}

exports.publish = function () {
    return Promise.join(publish(), publish_libs())
        .then(()=> {
            console.info('publish js success');
        })
}

exports.build = build;
