<script>
/**
 * @file 输入框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plCheckbox from '@/components/checkbox';
export default {
    data() {
        return {
            value: [1, 3]
        };
    },
    components: {
        plCheckbox
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <div>
        <pl-checkbox v-model="value" :value="1">我是checkbox：1</pl-checkbox>
        <pl-checkbox disabled v-model="value" :value="3">我是checkbox：3</pl-checkbox>
        <pl-checkbox v-model="value" :value="3">我是checkbox：3</pl-checkbox>
        <p>{{value}}</p>
    </div>
    <h1>admin/adpos内部使用风格</h1>
    <div>
        <pl-checkbox is-old v-model="value" :value="1">我是checkbox：1</pl-checkbox>
        <pl-checkbox is-old v-model="value" :value="3">我是checkbox：3</pl-checkbox>
        <pl-checkbox is-old v-model="value" :value="3">我是checkbox：3</pl-checkbox>
        <p>{{value}}</p>
    </div>
</div>

</template>
