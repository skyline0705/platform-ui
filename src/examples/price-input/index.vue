<script>
/**
 * @file 价格输入框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plPriceInput from '@/components/price-input';
export default {
    data() {
        return {
            text: '1223'
        };
    },
    components: {
        plPriceInput
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <div>
        <pl-price-input v-model="text" placeholder="请输入价格"></pl-price-input>
        <p>{{text}}</p>
    </div>
    <h2>通过style来控制大小：</h2>
    <div>
        <pl-price-input v-model="text" placeholder="请输入价格" style="width: 200px; height: 50px;"></pl-price-input>
        <p>{{text}}</p>
    </div>
    <h1>admin/adpos内部使用风格</h1>
    <div>
        <pl-price-input is-old v-model="text" placeholder="请输入价格"></pl-price-input>
        <p>{{text}}</p>
    </div>
    <h2>通过style来控制大小：</h2>
    <div>
        <pl-price-input is-old v-model="text" placeholder="请输入价格" style="width: 200px; height: 50px;"></pl-price-input>
        <p>{{text}}</p>
    </div>
</div>

</template>
