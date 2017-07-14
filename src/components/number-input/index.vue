<script>
/**
 * @file 数字输入框
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 22 Mar 2017
 */
import plInput from '@/components/input';
function isNumberOrBlank(val, isInt) {
    val = val + '';
    if (val === '') {
        return true;
    }
    if (val.indexOf(' ') !== -1) {
        return false;
    }
    if (isNaN(+val)) {
        return false;
    }
    if (isInt && val.indexOf('.') !== -1) {
        return false;
    }
    return true;
}
export default {
    name: 'number-input',
    props: {
        value: {
            required: true
        },
        int: {
            type: Boolean,
            default: false
        }
    },
    components: {
        plInput
    },
    created() {
        if (!isNumberOrBlank(this.value, this.int)) {
            throw new Error('[platform-ui number-input error]: value must be a number');
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.value;
            },
            set(val) {
                if (isNumberOrBlank(val, this.int)) {
                    this.$emit('input', val);
                    return;
                }
                // TODO唯一一个需要特殊判断的字符，如果是负数的话…
                // 后续再看怎么考虑会周全一些
                if (val === '-') {
                    return;
                }
                if (this.$refs.input.$el.value.indexOf('--') === 0) {
                    this.$refs.input.$el.value = this.$refs.input.$el.value.substr(1);
                } else {
                    this.$refs.input.$el.value = this.value;
                }
            }
        }
    }
};
</script>

<template>

<pl-input
    ref="input"
    v-model="computedValue"
></pl-input>

</template>
