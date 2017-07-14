<script>
/**
 * @file tooltip示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 25 Mar 2017
 */

import plTooltip from '@/components/tooltip';
export default {
    components: {
        plTooltip
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <div>
        <pl-tooltip content="1111111" placement="left">
            <span>啦啦啦啦啦</span>
        </pl-tooltip>
    </div>
    <h1>admin/adpos内部使用风格</h1>
    <div>
        <pl-tooltip content="222222">
            <span>啦啦啦啦啦</span>
        </pl-tooltip>
    </div>
</div>

</template>
