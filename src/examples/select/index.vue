<script>
/**
 * @file 下拉框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plSelect from '@/components/select';
export default {
    data() {
        return {
            value: 1111,
            options: [{
                value: 1111,
                text: '1111啊文理科黑客无人接听快让我个；'
            }, {
                value: 2222,
                text: '2222'
            }, {
                value: 3333,
                text: '3333'
            }, {
                value: 4444,
                text: '4444'
            }]
        };
    },
    components: {
        plSelect
    }
};
</script>

<template>

<div>
    <div>
        <p>{{value}}</p>
        <pl-select v-model="value" :options="options"></pl-select>
    </div>
    <h2>指定宽高：</h2>
    <div>
        <p>{{value}}</p>
        <pl-select width="200px" height="30px" v-model="value" :options="options"></pl-select>
    </div>
</div>

</template>
