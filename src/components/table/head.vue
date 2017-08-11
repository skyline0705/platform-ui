<script>
/**
 * @file table-head
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 27 Apr 2017
 */

// TODO后续配置是不是抽出来
const MIN_COLUMN_WIDTH = 40;
export default {
    props: {
        type: {
            type: String,
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
    data() {
        return {
            canResize: false,
            isResizing: false,
            activeColumn: null,
            startX: 0,
            oldWidth: 0
        };
    },
    methods: {
        mouseMove(event, column) {
            if (!column || !column.resizable || this.isResizing) {
                return;
            }
            const index = this.realColumns.findIndex(item => item === column);
            const target = event.target;
            const rect = target.getBoundingClientRect();
            const bodyStyle = document.body.style;
            if (rect.width > 12 && rect.right - event.pageX < 8 && index !== this.realColumns.length - 1) {
                bodyStyle.cursor = 'col-resize';
                this.canResize = true;
            } else {
                bodyStyle.cursor = '';
                this.canResize = false;
            }
        },
        mouseDown(event, column) {
            if (!this.canResize) {
                return;
            }
            this.isResizing = true;
            this.activeColumn = column;
            this.startX = event.pageX;
            this.oldWidth = column.width;
            this.$emit('column-resize-start', {
                left: event.pageX - this.$parent.$el.getBoundingClientRect().left
            });
        },
        bodyMouseMove(event) {
            if (!this.isResizing) {
                return;
            }
            this.$emit('column-resize', {
                left: event.pageX - this.$parent.$el.getBoundingClientRect().left
            });
        },
        bodyMouseUp(event) {
            if (!this.isResizing) {
                return;
            }
            const width = this.oldWidth + event.pageX - this.startX;
            this.$emit('column-resize-end', {
                activeColumn: this.activeColumn,
                width: width > MIN_COLUMN_WIDTH ? width : MIN_COLUMN_WIDTH,
                oldWidth: this.oldWidth
            });
            this.isResizing = false;
            this.activeColumn = null;
            // TODO临时性解决，后续再看怎么处理
            document.body.style.cursor = '';
            this.canResize = false;
        }
    },
    mounted() {
        document.body.addEventListener('mousemove', this.bodyMouseMove);
        document.body.addEventListener('mouseup', this.bodyMouseUp);
    },
    beforeDestroy() {
        document.body.removeEventListener('mousemove', this.bodyMouseMove);
        document.body.removeEventListener('mouseup', this.bodyMouseUp);
    },
    render() {
        const thList = this[`${this.type}Columns`].map((column, index) => {
            return (
                <th
                    on-mousemove={event => this.mouseMove(event, column)}
                    on-mousedown={event => this.mouseDown(event, column)}
                >
                    {column.renderColumn({$index: index})}
                </th>
            );
        });
        const colList = this[`${this.type}Columns`].map(column => {
            return <col width={column.width} />;
        });
        return (
            <table>
                <colgroup>
                    {colList}
                </colgroup>
                <thead>
                    <tr>
                        {thList}
                    </tr>
                </thead>
            </table>
        );
    }
};
</script>
<style lang="stylus" scoped>
tr:nth-child(2n)
    background #fbfbfb
th
    box-sizing border-box
    border-top 1px solid #e0e0e0
    font-size 12px
    color #666
    vertical-align middle
    height 29px
    font-weight normal
    padding 0 10px
    overflow hidden
    white-space nowrap
    text-align left
    text-overflow ellipsis
</style>
