<script>
/**
 * @file table-body
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 27 Apr 2017
 */

import plRow from './row';
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        fixedColumns: {
            type: Array,
            required: true
        },
        realColumns: {
            type: Array,
            required: true
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
    computed: {
        rowHoverIndex() {
            return this.$parent.rowHoverIndex;
        }
    },
    components: {
        plRow
    },
    render() {
        if (!this.data.length && this.type !== 'real') {
            return '';
        }
        if (!this.data.length && this.type === 'real') {
            return (
                <table is-old={this.$parent.isOld}>
                    <tbody>
                        <tr>
                            <td colspan={this.realColumns.length}>
                                <div style="text-align: center">
                                    暂无数据
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }

        const colList = this[`${this.type}Columns`].map(column => {
            return <col width={column.width} />;
        });
        return (
            <table is-old={this.$parent.isOld}>
                <colgroup>
                    {colList}
                </colgroup>
                <tbody>
                    {this.data.map((row, index) => {
                        return (
                            <pl-row
                                on-change-hover-line={this.changeHoverLine}
                                on-row-click={this.rowClick}
                                columns={this[`${this.type}Columns`]}
                                index={index}
                                row={row}
                            >
                            </pl-row>
                        );
                    })}
                </tbody>
            </table>
        );
    }
};
</script>
<style lang="stylus" scoped>
@import '../common/variables.styl'
td
    color #fff
[is-old] td
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
