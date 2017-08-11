<script>
/**
 * @file loading
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */

import plLoading from '@/components/loading';

export default {
    components: {
        plLoading
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <div>
        <pl-loading :show="true"></pl-loading>
    </div>
</div>

</template>
