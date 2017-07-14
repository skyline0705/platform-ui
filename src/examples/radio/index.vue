<script>
/**
 * @file 输入框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plRadio from '@/components/radio';
export default {
    data() {
        return {
            value: 1
        };
    },
    components: {
        plRadio
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <div>
        <pl-radio name="aaa" v-model="value" :value="1">我是radio：1</pl-radio>
        <pl-radio disabled name="aaa" v-model="value" :value="3">我是radio：3</pl-radio>
        <pl-radio name="aaa" v-model="value" :value="3">我是radio：3</pl-radio>
        <p>{{value}}</p>
    </div>
    <h1>admin/adpos内部使用风格</h1>
    <div>
        <pl-radio name="bbb" is-old v-model="value" :value="1">我是radio：1</pl-radio>
        <pl-radio name="bbb" is-old v-model="value" :value="3">我是radio：3</pl-radio>
        <pl-radio name="bbb" is-old v-model="value" :value="3">我是radio：3</pl-radio>
        <p>{{value}}</p>
    </div>
</div>

</template>
