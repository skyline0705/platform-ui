<script>
/**
 * @file 数字输入框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plNumberInput from '@/components/number-input';
export default {
    data() {
        return {
            text: '1223'
        };
    },
    components: {
        plNumberInput
    }
};
</script>

<template>

<div>
    <div>
        <pl-number-input v-model="text" placeholder="请输入数字"></pl-number-input>
        <p>{{text}}</p>
    </div>
    <h2>通过style来控制大小：</h2>
    <div>
        <pl-number-input v-model="text" placeholder="请输入数字" style="width: 200px; height: 50px;"></pl-number-input>
        <p>{{text}}</p>
    </div>
    <h2>只能输入整数：</h2>
    <div>
        <pl-number-input v-model="text" placeholder="请输入数字" :int="true"></pl-number-input>
        <p>{{text}}</p>
    </div>
</div>

</template>
