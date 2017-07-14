<script>
export default {
    props: {
        index: {
            type: Number,
            required: true
        },
        row: {
            type: Object,
            required: true
        },
        columns: {
            type: Array,
            required: true
        }
    },
    computed: {
        rowHoverIndex() {
            return this.$parent.$parent.rowHoverIndex;
        },
        rowHoveredClassName() {
            return this.$parent.$parent.rowHoveredClassName;
        }
    },
    methods: {
        changeHoverLine(index) {
            this.$emit('change-hover-line', index);
        },
        rowClick(event, obj) {
            this.$emit('row-click', event, obj);
        }
    },
    render() {
        return (
            <tr
                on-mouseenter={() => this.changeHoverLine(this.index)}
                on-mouseleave={() => this.changeHoverLine(NaN)}
                on-click={event => this.rowClick(event, {row: this.row.item, index: this.index})}
                class={this.row.hovered ? this.rowHoveredClassName : ''}
            >
                {this.columns.map(column => {
                    return (
                        <td
                            is-old={this.$parent.isOld}
                        >{column.renderCell({row: this.row.item})}</td>
                    );
                })}
            </tr>
        );
    }
};
</script>
<style lang="stylus" scoped>
@import '../common/variables.styl'
tr:nth-child(2n)
    background #fbfbfb
tr.row-hovered
    background brand-primary
    td
        color #fff
[is-old] tr.row-hovered
    background #e0f1ff
    td
        color #666
[is-old] td
    font-size 14px
    border-top none
    height 34px
td
    box-sizing border-box
    border-top 1px solid #e0e0e0
    font-size 12px
    color #666
    vertical-align middle
    padding 0 10px
    height 59px
    overflow hidden
    white-space nowrap
    text-align left
    text-overflow ellipsis
    cursor default
</style>

