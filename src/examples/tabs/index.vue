<script>
/**
 * @file tabs示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 13 Apr 2017
 */

import plTabs from '@/components/tabs';
import plTabPanel from '@/components/tabs/tab-panel';
export default {
    computed: {
    },
    methods: {
        alert(tab, index) {
            console.log(tab, index);
            // alert('tab is change');
        }
    },
    components: {
        plTabs,
        plTabPanel
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <pl-tabs @tab-change="alert">
        <pl-tab-panel>
            <template slot="tab">我是1</template>
            啦啦啦啦1
        </pl-tab-panel>
        <pl-tab-panel disabled>
            <template slot="tab">我是2</template>
            啦啦啦啦2
        </pl-tab-panel>
        <pl-tab-panel>
            <template slot="tab">我是3</template>
            啦啦啦啦3
        </pl-tab-panel>
        <pl-tab-panel>
            <template slot="tab">我是4</template>
            啦啦啦啦4
        </pl-tab-panel>
    </pl-tabs>
    <h1>admin/adpos内部使用风格</h1>
    <pl-tabs @tab-change="alert" is-old>
        <pl-tab-panel>
            <template slot="tab" active>我是1</template>
            啦啦啦啦1
        </pl-tab-panel>
        <pl-tab-panel disabled>
            <template slot="tab">我是2</template>
            啦啦啦啦2
        </pl-tab-panel>
        <pl-tab-panel>
            <template slot="tab">我是3</template>
            啦啦啦啦3
        </pl-tab-panel>
        <pl-tab-panel>
            <template slot="tab">我是4</template>
            啦啦啦啦4
        </pl-tab-panel>
    </pl-tabs>
</div>

</template>
