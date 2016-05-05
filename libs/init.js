/**
 * Created by joneszhu on 16/5/5.
 */
var path = require('path');
var fs_extra = require('fs.extra');
var Promise = require('bluebird');


const CWD = process.cwd();
const TEMPLATE_DIR = path.resolve(__dirname, '../template');

exports.create_deploy_dir = ()=> {
    var copy_recursive = Promise.promisify(fs_extra.copyRecursive);
    return copy_recursive(TEMPLATE_DIR, CWD);
}