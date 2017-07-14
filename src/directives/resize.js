/* Modified from https://github.com/ElemeFE/element/blob/dev/src/utils/resize-event.js
 * version: 1.1.0
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Sebastián Décima
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @file resize
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 10 May 2017
 */

import {raf, caf, getAnimationEventName} from '@/common/util';
import {prefix, needPrefix} from '@/common/config';

const animationName = 'platform-ui-resize';
const keyFramePrefix = needPrefix ? `-${prefix}-` : '';

function resetTrigger(trigger) {
    const expand = trigger.firstElementChild;
    const contract = trigger.lastElementChild;
    const expandChild = expand.firstElementChild;

    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
}

function createAnimationStyle() {
    const animationKeyframes = `
        @${keyFramePrefix}keyframes ${animationName} {
            from {
                opacity: 0;
            }
            to {
                opacity: 0;
            }
        }`;
    const animationStyle = `${keyFramePrefix}animation: 1ms ${animationName};`;
    return {animationKeyframes, animationStyle};
}


function createResizeStyle() {
    if (document.getElementById('platform-ui-resize-triggers')) {
        return;
    }
    const {animationKeyframes, animationStyle} = createAnimationStyle();
    // Chrome的bug，地址：https://code.google.com/p/chromium/issues/detail?id=286360
    const css = `
        ${animationKeyframes}
        .resize-triggers {
            visibility: hidden; opacity: 0;
            ${animationStyle}
        }
        .resize-triggers,
        .resize-triggers > div,
        .contract-trigger:before {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            height: 100%;
            width: 100%;
            overflow: hidden;
            z-index: -1;
        }
        .resize-triggers > div {
            background: #eee;
            overflow: auto;
        }
        .contract-trigger:before {
            content: '';
            width: 200%;
            height: 200%;
        }`;

    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    style.id = 'platform-ui-resize-triggers';

    head.appendChild(style);
}

function generateResizeTrigger() {
    const trigger = document.createElement('div');
    trigger.className = 'resize-triggers';
    trigger.innerHTML = `
        <div class="expand-trigger">
            <div></div>
        </div>
        <div class="contract-trigger"></div>
    `;
    return trigger;
}

function checkTrigger(element) {
    /* eslint-disable no-underscore-dangle */
    return element.offsetWidth !== element.__resizeOldRect.width
        || element.offsetHeight !== element.__resizeOldRect.height;
}

function scroll(event) {
    /* eslint-disable no-underscore-dangle */
    resetTrigger(this.__resizeTrigger);
    if (this.__resizeRAFId) {
        caf(this.__resizeRAFId);
    }
    this.__resizeRAFId = raf(() => {
        if (checkTrigger(this)) {
            this.__resizeOldRect.width = this.offsetWidth;
            this.__resizeOldRect.height = this.offsetHeight;
            this.__resizeListener.forEach(fn => {
                fn.call(this, event);
            });
        }
    });
}

function animation(event) {
    if (event.animationName === animationName) {
        resetTrigger(this);
    }
}

const animationStart = getAnimationEventName('animationstart');
export default {
    bind(el, {value}) {
        createResizeStyle();
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
        }
        /* eslint-disable no-underscore-dangle */
        el.__resizeTrigger = generateResizeTrigger();
        el.__resizeListener = el.__resizeListener || [];
        el.__resizeListener.push(value);
        el.appendChild(el.__resizeTrigger);
        resetTrigger(el.__resizeTrigger);
        el.__resizeOldRect = {
            width: el.offsetWidth,
            height: el.offsetHeight
        };
        el.addEventListener('scroll', scroll, true);
        // 动画触发resetTrigger，保证滚动监听正常
        el.__resizeTrigger.addEventListener(animationStart, animation);
    },
    unbind(el, {value}) {
        el.removeEventListener('scroll', scroll);
        el.__resizeTrigger.removeEventListener(animationStart, animation);
        /* eslint-disable no-underscore-dangle */
        const index = el.__resizeListener.indexOf(value);
        el.__resizeListener.splice(index, 1);
        if (!el.__resizeListener.length) {
            el.__resizeListener = null;
        }
        el.removeChild(el.__resizeTrigger);
        el.__resizeTrigger = null;
        el.__resizeOldRect = null;
    }
};
