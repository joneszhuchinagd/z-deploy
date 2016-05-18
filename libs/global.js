/**
 * Created by joneszhu on 16/5/11.
 */

var path = require('path');

var PWD = process.env.PWD || process.env.INIT_CWD;

module.exports = {
    PWD: PWD,
    DEBUG_DIR: path.join(PWD, 'bin-debug'),
    RELEASE_DIR: path.join(PWD, 'release'),
    SASS_ENTRY: path.join(PWD, 'css/main.scss'),
    JS_ENTRY: path.join(PWD, 'js/main.js'),

};