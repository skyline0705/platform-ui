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
</div>

</template>
