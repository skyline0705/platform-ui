/**
 * @file 部分公用函数
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Nov 13, 2016
 */

export function getDateRange(range, limit) {
    let result = {};
    let today = new Date();
    // TODO考虑不够严禁，当极限值（小时，分钟，秒，毫秒）的时候，这块逻辑是有问题的其实…
    // 回头有时间再说…
    switch (range) {
        case 'today':
            result.begin = today;
            result.end = today;
            break;
        case 'yesterday':
            result.begin = today - 3600 * 1000 * 24;
            result.end = today - 3600 * 1000 * 24;
            break;
        case 'last7':
            result.begin = today - 3600 * 1000 * 24 * 6;
            result.end = today;
            break;
        case 'lastweek':
            var day = today.getDay();
            day = day === 0 ? 7 : day;
            result.begin = today - 3600 * 1000 * 24 * (6 + day);
            result.end = today - 3600 * 1000 * 24 * day;
            break;
        case 'thismonth':
            result.begin = (new Date(today)).setDate(1);
            result.end = today > limit.end
                ? limit.end
                : today;
            break;
        case 'lastmonth':
            var monthStart = new Date(today);
            monthStart.setDate(1);
            monthStart.setMonth(monthStart.getMonth() - 1);
            result.begin = new Date(monthStart);

            var monthEnd = new Date(today);
            monthEnd.setDate(1);
            monthEnd = monthEnd - 3600 * 24 * 1000;
            result.end = new Date(monthEnd);
            break;
    }

    result.begin = new Date(result.begin);
    result.end = new Date(result.end);
    return result;
}

export function copyDateRange(range) {
    return {
        begin: range.begin ? new Date(range.begin) : null,
        end: range.end ? new Date(range.end) : null
    };
}

export function getMidDate(limit) {
    const {begin, end} = limit;
    return new Date(+begin + (end - begin) / 2);
}

export function generateCurrentRange(value, limit) {
    const {begin, end} = value;
    if (!begin && !end) {
        let midDate = getMidDate(limit);
        return {
            currentBeginYear: midDate.getFullYear(),
            currentBeginMonth: midDate.getMonth() + 1,
            currentEndYear: midDate.getFullYear(),
            currentEndMonth: midDate.getMonth() + 1
        };
    }
    if (!begin) {
        return {
            currentBeginYear: end.getFullYear(),
            currentBeginMonth: end.getMonth() + 1,
            currentEndYear: end.getFullYear(),
            currentEndMonth: end.getMonth() + 1
        };
    }
    if (!end) {
        return {
            currentBeginYear: begin.getFullYear(),
            currentBeginMonth: begin.getMonth() + 1,
            currentEndYear: begin.getFullYear(),
            currentEndMonth: begin.getMonth() + 1
        };
    }
    return {
        currentBeginYear: begin.getFullYear(),
        currentBeginMonth: begin.getMonth() + 1,
        currentEndYear: end.getFullYear(),
        currentEndMonth: end.getMonth() + 1
    };
}
