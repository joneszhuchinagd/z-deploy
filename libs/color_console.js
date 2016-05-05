/**
 * Created by joneszhu on 16/5/5.
 */
var colors = require('colors');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

function parse_to_string(any) {

    if (any instanceof String || typeof any === 'string') {
        return any;
    }
    if (any instanceof Error) {
        return any.stack;
    }
    return JSON.stringify(any);

}

exports.info = function (any) {
    console.log(parse_to_string(any).info);
}

exports.warn = function (any) {
    console.log(parse_to_string(any).warn);
}

exports.debug = function (any) {
    console.log(parse_to_string(any).debug);
}

exports.error = function (any) {
    console.log(parse_to_string(any).error);
}

exports.log = function (any) {
    console.log(any);
}

