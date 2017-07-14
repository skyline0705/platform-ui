<script>
/**
 * @file 表格column
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 26 Apr 2017
 */

export default {
    name: 'pl-table-column',
    props: {
        width: {
            type: Number
        },
        fixed: {
            type: Boolean,
            default: false
        },
        resizable: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if (typeof this.width === 'number' && this.width <= 0) {
            throw new Error([
                '[platform-ui pl-table-column error]: ',
                'width must a positive integer'
            ].join(','));
        }
        /* eslint-disable no-underscore-dangle */
        this.column = {
            id: this._uid,
            width: this.width,
            hasDefaultWidth: typeof this.width === 'number',
            fixed: this.fixed,
            resizable: this.resizable,
            renderColumn: data => this.$scopedSlots.column(data),
            renderCell: data => this.$scopedSlots.cell(data)
        };
        this.$parent.appendColumn(this.column);
    },
    beforeDestroy() {
        this.$parent.removeColumn(this.column);
        this.column = null;
    },
    render(h) {
        return h('div', this.$slots.default);
    },
    watch: {
        // TODO这块手动同步width其实有点蛋疼，后面看看能不能扔给computed
        width(val) {
            this.column.width = val;
            this.column.hasDefaultWidth = typeof val === 'number';
        }
    }
};
</script>
