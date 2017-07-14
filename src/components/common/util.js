/**
 * @file 一些工具函数
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 24 Mar 2017
 */

export function leftpad(str, len, ch = ' ') {
    str = str + '';
    len = len - str.length;
    if (len <= 0) {
        return str;
    }
    ch = ch + '';
    let pad = '';
    while (len) {
        if (len & 1) {
            pad += ch;
        }
        len >>= 1;
        ch += ch;
    }
    return pad + str;
}

export function getClosest(el, target) {
    while (el !== target && el !== null) {
        el = el.parentNode;
    }
    return el;
}

export function upperFirst(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

export function noop() {}
