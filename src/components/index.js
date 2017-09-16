/**
 * @file 总打包入口
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 10 Apr 2017
 */
import button from '@/components/button';
import input from '@/components/input';
import radio from '@/components/radio';
import checkbox from '@/components/checkbox';
import textarea from '@/components/textarea';
import select from '@/components/select';
// import upload from '@/components/upload';
import datePicker from '@/components/date-picker';
import dateRangePicker from '@/components/date-range-picker';
import table from '@/components/table';
import tableColumn from '@/components/table/table-column';
import tree from '@/components/tree';
import tabs from '@/components/tabs';
import tabPanel from '@/components/tabs/tab-panel';
import modal from '@/components/modal';
import modalAlert from '@/components/modal-alert';
import modalConfirm from '@/components/modal-confirm';
// import steps from '@/components/steps';
import breadcrumb from '@/components/breadcrumb';
import breadcrumbItem from '@/components/breadcrumb/breadcrumb-item';
import tooltip from '@/components/tooltip';
// import popover from '@/components/popover';
import pagination from '@/components/pagination';
import loading from '@/components/loading';


function install(Vue) {
    Vue.component(button.name, button);
    Vue.component(input.name, input);
    Vue.component(radio.name, radio);
    Vue.component(checkbox.name, checkbox);
    Vue.component(textarea.name, textarea);
    Vue.component(select.name, select);
    // Vue.component(upload.name, upload);
    Vue.component(datePicker.name, datePicker);
    Vue.component(dateRangePicker.name, dateRangePicker);
    Vue.component(table.name, table);
    Vue.component(tableColumn.name, tableColumn);
    Vue.component(tree.name, tree);
    Vue.component(tabs.name, tabs);
    Vue.component(tabPanel.name, tabPanel);
    Vue.component(modal.name, modal);
    Vue.component(modalAlert.name, modalAlert);
    Vue.component(modalConfirm.name, modalConfirm);
    // Vue.component(steps.name, steps);
    Vue.component(breadcrumb.name, breadcrumb);
    Vue.component(breadcrumbItem.name, breadcrumbItem);
    Vue.component(tooltip.name, tooltip);
    // Vue.component(popover.name, popover);
    Vue.component(pagination.name, pagination);
    Vue.component(loading.name, loading);
}

export default {
    install: install,
    version: '0.1.3',
    button,
    input,
    radio,
    checkbox,
    textarea,
    select,
    // upload,
    datePicker,
    dateRangePicker,
    table,
    tableColumn,
    tree,
    tabs,
    tabPanel,
    modal,
    modalAlert,
    modalConfirm,
    // steps,
    breadcrumb,
    breadcrumbItem,
    tooltip,
    // popover,
    pagination,
    loading
};
