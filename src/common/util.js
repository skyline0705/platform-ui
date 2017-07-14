/**
 * @file util
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 10 May 2017
 */

import {isServer, prefix, needPrefix} from './config';

const fakeRaf = fn => setTimeout(fn, 20);

const fakeCaf = clearTimeout;

export const raf = isServer ? fakeRaf : window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || fakeRaf;

export const caf = isServer ? fakeCaf : window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || fakeCaf;


export const getAnimationEventName = (() => {
    const animationEvents = {
        animationstart: 'AnimationStart',
        animationiteration: 'AnimationIteration',
        animationend: 'AnimationEnd'
    };

    return function (name) {
        return needPrefix
            ? prefix + animationEvents[name]
            : name;
    };
})();
