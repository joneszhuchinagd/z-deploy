/**
 * Created by joneszhu on 16/5/5.
 */
var path = require('path');
var fs_ext = require('./fs_ext');
var Promise = require('bluebird');


const CWD = process.cwd();
const TEMPLATE_DIR = path.resolve(__dirname, '../template');


exports.create_deploy_dir = (argv)=> {
    return Promise.resolve()
        .then(()=> {
            return fs_ext.cprfSync(TEMPLATE_DIR, CWD, {overwrite: argv.overwrite, filters: [/\.gitkeep$/]});
        })
}