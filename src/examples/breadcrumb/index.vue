<script>
/**
 * @file 面包屑示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */

import plBreadcrumb from '@/components/breadcrumb';
import plBreadcrumbItem from '@/components/breadcrumb/breadcrumb-item';

export default {
    components: {
        plBreadcrumb,
        plBreadcrumbItem
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <div>
        <pl-breadcrumb>
            <pl-breadcrumb-item to="/">111</pl-breadcrumb-item>
            <pl-breadcrumb-item>222</pl-breadcrumb-item>
            <pl-breadcrumb-item>333</pl-breadcrumb-item>
        </pl-breadcrumb>
    </div>
    <h1>admin/adpos内部使用风格</h1>
    <div>
        <pl-breadcrumb is-old>
            <pl-breadcrumb-item
                :to="{
                    path: '/?a=3',
                    query: {
                        a: 1,
                        b: 2
                    }
                }"
            >111</pl-breadcrumb-item>
            <pl-breadcrumb-item>222</pl-breadcrumb-item>
            <pl-breadcrumb-item>333</pl-breadcrumb-item>
        </pl-breadcrumb>
    </div>
</div>

</template>
