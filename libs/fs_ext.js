/**
 * Created by joneszhu on 16/5/5.
 */
"use strict";

const EventEmitter = require('events');
const fs = require("fs");
const path = require('path');

class Fs_ext extends EventEmitter {

    constructor() {
        super();
    }

    /**
     * 遍历目录
     * @param path_name
     * @returns {{directory: Array, file: Array}}
     */
    static walkSync(path_name) {
        var directory_arr = [];
        var file_arr = [];
        recursion.call(this, path_name, path_name.match(/\/([^\/]*)$/)[1]);
        return {directory: directory_arr, file: file_arr};

        function recursion(path_name, name) {
            var stats = fs.statSync(path_name);
            if (stats.isDirectory()) {
                directory_arr.push({path_name: path_name, name: name});
                var names = fs.readdirSync(path_name);
                for (var name of names) {
                    var file_path = path.join(path_name, name);
                    recursion.call(this, file_path, name);
                }
            } else if (stats.isFile()) {
                file_arr.push({path_name: path_name, name: name});
            }
        }
    }


    /**
     * 递归删除目录内容
     * @param path_name
     * @param opts {remove_base:true,filters:[]}
     */
    static rmrfSync(path_name, opts) {
        var remove_base = opts.remove_base == undefined ? true : opts.remove_base;
        var filters = opts.filters == undefined ? [] : opts.filters;

        var res = this.walkSync(path_name);
        var directory_arr = res.directory;
        var file_arr = res.file;
        for (var file of file_arr) {
            fs.unlinkSync(file.path_name);
        }
        for (var i = directory_arr.length - 1; i >= 0; i--) {
            if (i == 0 && remove_base == false) {
                break;
            }
            fs.rmdirSync(directory_arr[i]['path_name']);
        }
    }

    /**
     * 递归复制目录
     * @param from
     * @param to
     * @param opts {overwrite:false,filters:[]}
     */
    static cprfSync(from, to, opts) {

        var old_mask = process.umask();
        process.umask(0);
        var overwrite = opts.overwrite == undefined ? false : opts.overwrite;
        var filters = opts.filters == undefined ? [] : opts.filters;
        var flag = overwrite ? 'w' : 'wx';

        var regexp_arr = [];
        for (var filter of filters) {
            regexp_arr.push(new RegExp(filter));
        }

        var res = this.walkSync(from);
        var directory_arr = this.filter(res.directory, regexp_arr);
        var file_arr = this.filter(res.file, regexp_arr);
        var from_length = from.length;

        for (var dir of directory_arr) {
            let stats = fs.statSync(dir.path_name);
            if (stats.isDirectory()) {
                let dist_path = path.join(to, dir.path_name.substr(from_length));
                try {
                    fs.mkdirSync(dist_path, 0o755);
                }
                catch (err) {
                    if (err.code == 'EEXIST') {
                    } else {
                        throw err;
                    }
                }
            }
        }
        for (var file of file_arr) {
            let dist_path = path.join(to, file.path_name.substr(from_length));
            let contents = fs.readFileSync(file.path_name);
            try {
                fs.writeFileSync(dist_path, contents, {flag: flag, mode: 0o777});
            }
            catch (err) {
                if (err.code == 'EEXIST') {
                }
                else {
                    throw err;
                }
            }
        }
        process.umask(old_mask);
    }


    /**
     * 过滤文件
     * @param sources
     * @param filters
     * @returns {Array}
     */
    static filter(sources, filters) {
        var res = [];
        for (var source of sources) {
            for (var filter of filters) {
                if (filter.test(source.path_name)) {
                    continue;
                } else {
                    res.push(source);
                }
            }
        }
        return res;
    }
}

module.exports = Fs_ext;
