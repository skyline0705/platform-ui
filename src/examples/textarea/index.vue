<script>
/**
 * @file 文本域示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 25 Mar 2017
 */

import plTextarea from '@/components/textarea';
export default {
    data() {
        return {
            text: '1223'
        };
    },
    components: {
        plTextarea
    }
};
</script>

<template>

<div>
    <div>
        <pl-textarea v-model="text" placeholder="请输入价格"></pl-textarea>
        <p>{{text}}</p>
    </div>
    <h2>自适配高度：</h2>
    <div>
        <pl-textarea v-model="text" placeholder="请输入价格" auto-size></pl-textarea>
        <p>{{text}}</p>
    </div>
    <h2>通过style来控制大小：</h2>
    <div>
        <pl-textarea v-model="text" placeholder="请输入价格" style="width: 200px; height: 50px;"></pl-textarea>
        <p>{{text}}</p>
    </div>
</div>

</template>
