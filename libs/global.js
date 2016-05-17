/**
 * Created by joneszhu on 16/5/11.
 */

var path = require('path');

const PWD = process.env.PWD;

module.exports = {
    PWD: PWD,
    DEBUG_DIR: path.join(PWD, 'bin-debug'),
    RELEASE_DIR: path.join(PWD, 'release'),
    SASS_ENTRY: path.join(PWD, 'css/main.scss'),
    JS_ENTRY: path.join(PWD, 'js/main.js'),

};