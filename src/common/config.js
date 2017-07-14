/**
 * @file 全局公共配置
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 11 May 2017
 */

// TODO以后也许用的到，在SSR的时候
export const isServer = typeof window === 'undefined';

let testNode = document.createElement('div');
const testProperty = 'animation';
export const needPrefix = typeof testNode.style[testProperty] === 'undefined';
const prefixes = ['o', 'MS', 'moz', 'webkit'];

export const prefix = !needPrefix
    ? ''
    : prefixes.find((prefix) => {
        return typeof testNode.style[`-${prefix.toLowerCase()}-${testProperty}`] !== 'undefined';
    });

testNode = null;
