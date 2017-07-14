<script>
/**
 * @file 按钮示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */

import plButton from '@/components/button';

export default {
    methods: {
        alert(info) {
            alert(info);
        }
    },
    components: {
        plButton
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <h2>
        large：
    </h2>
    <p>
        <pl-button type="primary" size="large" @click="alert('primary')">primary</pl-button>
        <pl-button type="secondary" size="large" @click="alert('secondary')">secondary</pl-button>
        <pl-button type="success" size="large" @click="alert('success')">success</pl-button>
        <pl-button type="info" size="large" @click="alert('info')">info</pl-button>
        <pl-button type="warning" size="large" @click="alert('warning')">warning</pl-button>
        <pl-button type="danger" size="large" @click="alert('danger')">danger</pl-button>
        <pl-button disabled size="large">disabled</pl-button>
    </p>
    <h2>
        medium：
    </h2>
    <p>
        <pl-button type="primary" @click="alert('primary')">primary</pl-button>
        <pl-button type="secondary" @click="alert('secondary')">secondary</pl-button>
        <pl-button type="success" @click="alert('success')">success</pl-button>
        <pl-button type="info" @click="alert('info')">info</pl-button>
        <pl-button type="warning" @click="alert('warning')">warning</pl-button>
        <pl-button type="danger" @click="alert('danger')">danger</pl-button>
        <pl-button disabled>disabled</pl-button>
    </p>
    <h2>
        small：
    </h2>
    <p>
        <pl-button type="primary" size="small" @click="alert('primary')">primary</pl-button>
        <pl-button type="secondary" size="small" @click="alert('secondary')">secondary</pl-button>
        <pl-button type="success" size="small" @click="alert('success')">success</pl-button>
        <pl-button type="info" size="small" @click="alert('info')">info</pl-button>
        <pl-button type="warning" size="small" @click="alert('warning')">warning</pl-button>
        <pl-button type="danger" size="small" @click="alert('danger')">danger</pl-button>
        <pl-button disabled size="small">disabled</pl-button>
    </p>
    <h1>admin/adpos内部使用风格</h1>
    <h2>
        large：
    </h2>
    <p>
        <pl-button type="primary" is-old size="large" @click="alert('old-primary')">primary</pl-button>
        <pl-button type="secondary" is-old size="large" @click="alert('old-secondary')">secondary</pl-button>
        <pl-button type="success" is-old size="large" @click="alert('old-success')">success</pl-button>
        <pl-button type="info" is-old size="large" @click="alert('old-info')">info</pl-button>
        <pl-button type="warning" is-old size="large" @click="alert('old-warning')">warning</pl-button>
        <pl-button type="danger" is-old size="large" @click="alert('old-danger')">danger</pl-button>
        <pl-button disabled is-old size="large" @click="alert('old-disabled')">disabled</pl-button>
    </p>
    <h2>
        medium：
    </h2>
    <p>
        <pl-button type="primary" is-old @click="alert('old-primary')">primary</pl-button>
        <pl-button type="secondary" is-old @click="alert('old-secondary')">secondary</pl-button>
        <pl-button type="success" is-old @click="alert('old-success')">success</pl-button>
        <pl-button type="info" is-old @click="alert('old-info')">info</pl-button>
        <pl-button type="warning" is-old @click="alert('old-warning')">warning</pl-button>
        <pl-button type="danger" is-old @click="alert('old-danger')">danger</pl-button>
        <pl-button disabled is-old @click="alert('old-disabled')">disabled</pl-button>
    </p>
    <h2>
        small：
    </h2>
    <p>
        <pl-button type="primary" is-old size="small" @click="alert('old-primary')">primary</pl-button>
        <pl-button type="secondary" is-old size="small" @click="alert('old-secondary')">secondary</pl-button>
        <pl-button type="success" is-old size="small" @click="alert('old-success')">success</pl-button>
        <pl-button type="info" is-old size="small" @click="alert('old-info')">info</pl-button>
        <pl-button type="warning" is-old size="small" @click="alert('old-warning')">warning</pl-button>
        <pl-button type="danger" is-old size="small" @click="alert('old-danger')">danger</pl-button>
        <pl-button disabled is-old size="small" @click="alert('old-disabled')">disabled</pl-button>
    </p>
</div>

</template>
