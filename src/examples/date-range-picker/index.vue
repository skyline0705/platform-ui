<script>
/**
 * @file 日期范围选择器示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plDateRangePicker from '@/components/date-range-picker';
export default {
    data() {
        return {
            date: {
                begin: new Date('2017', '3', '1'),
                end: new Date('2017', '3', '1')
            }
        };
    },
    components: {
        plDateRangePicker
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <div>
        <pl-date-range-picker
            v-model="date"
            :limit="{
                begin: new Date('2016', '0', '1'),
                end: new Date('2018', '0', '1')
            }"
            :range="{
                begin: new Date('2015', '0', '1'),
                end: new Date('2019', '0', '1')
            }"
            :can-be-infinity="{
                begin: true,
                end: true
            }"
        ></pl-date-range-picker>
    </div>
    <h1>admin/adpos内部使用风格</h1>
    <div>
        <pl-date-range-picker is-old v-model="date"></pl-date-range-picker>
    </div>
</div>

</template>
