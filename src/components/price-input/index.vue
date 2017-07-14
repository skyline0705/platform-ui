<script>
/**
 * @file 价格输入框
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 22 Mar 2017
 */
import plNumberInput from '@/components/number-input';
function isPriceNumberOrBlank(val) {
    val = val + '';
    if (val.indexOf('.') === -1 || val === '') {
        return true;
    }
    const dotIndex = val.indexOf('.');
    if (val.substr(dotIndex + 1).length > 2) {
        return false;
    }
    return true;
}
export default {
    name: 'price-input',
    props: {
        value: {
            required: true
        }
    },
    components: {
        plNumberInput
    },
    created() {
        if (!isPriceNumberOrBlank(this.value)) {
            throw new Error('[platform-ui number-input error]: value must be a price number');
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.value;
            },
            set(val) {
                if (!isPriceNumberOrBlank(val)) {
                    this.$refs.input.$el.value = this.value;
                } else {
                    this.$emit('input', val);
                }
            }
        }
    }
};
</script>

<template>

<pl-number-input
    ref="input"
    v-model="computedValue"
></pl-number-input>

</template>
