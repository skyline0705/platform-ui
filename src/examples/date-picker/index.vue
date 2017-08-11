<script>
/**
 * @file 日历选择器示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plDatePicker from '@/components/date-picker';
export default {
    data() {
        return {
            date: new Date()
        };
    },
    components: {
        plDatePicker
    }
};
</script>

<template>

<div>
    <div>
        <pl-date-picker
            v-model="date"
            :limit="{
                begin: new Date('2016', '0', '1'),
                end: new Date('2018', '0', '1')
            }"
            :range="{
                begin: new Date('2015', '0', '1'),
                end: new Date('2019', '0', '1')
            }"
        ></pl-date-picker>
    </div>
</div>

</template>
