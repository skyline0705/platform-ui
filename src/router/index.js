/**
 * @file fileDesc
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        component: () => import('@/examples')
    }, {
        path: '/button',
        component: () => import('@/examples/button')
    }, {
        path: '/input',
        component: () => import('@/examples/input')
    }, {
        path: '/checkbox',
        component: () => import('@/examples/checkbox')
    }, {
        path: '/radio',
        component: () => import('@/examples/radio')
    }, {
        path: '/select',
        component: () => import('@/examples/select')
    }, {
        path: '/textarea',
        component: () => import('@/examples/textarea')
    }, {
        path: '/date-picker',
        component: () => import('@/examples/date-picker')
    }, {
        path: '/date-range-picker',
        component: () => import('@/examples/date-range-picker')
    }, {
        path: '/modal',
        component: () => import('@/examples/modal')
    }, {
        path: '/modal-confirm',
        component: () => import('@/examples/modal-confirm')
    }, {
        path: '/modal-alert',
        component: () => import('@/examples/modal-alert')
    }, {
        path: '/breadcrumb',
        component: () => import('@/examples/breadcrumb')
    }, {
        path: '/pagination',
        component: () => import('@/examples/pagination')
    }, {
        path: '/tabs',
        component: () => import('@/examples/tabs')
    }, {
        path: '/tree',
        component: () => import('@/examples/tree')
    }, {
        path: '/table',
        component: () => import('@/examples/table')
    }, {
        path: '/loading',
        component: () => import('@/examples/loading')
    }, {
        path: '/tooltip',
        component: () => import('@/examples/tooltip')
    }]
});
