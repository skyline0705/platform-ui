<script>
/**
 * @file 输入框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plInput from '@/components/input';
export default {
    data() {
        return {
            text: '测试资源'
        };
    },
    components: {
        plInput
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <div>
        <pl-input v-model="text" placeholder="123"></pl-input>
        <p>{{text}}</p>
    </div>
    <h2>通过style来控制大小：</h2>
    <div>
        <pl-input v-model="text" placeholder="123" style="width: 200px; height: 50px;"></pl-input>
        <p>{{text}}</p>
    </div>
    <h1>admin/adpos内部使用风格</h1>
    <div>
        <pl-input is-old v-model="text" placeholder="123"></pl-input>
        <p>{{text}}</p>
    </div>
    <h2>通过style来控制大小：</h2>
    <div>
        <pl-input v-model="text" placeholder="123" style="width: 200px; height: 50px;"></pl-input>
        <p>{{text}}</p>
    </div>
</div>

</template>
