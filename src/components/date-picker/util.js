/**
 * @file 时间计算相关的公共方法
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Aug 11, 2016
 */

import {leftpad} from '../common/util';

/**
 * 获取某一月份的最大天数
 * @param  {number} year  年份
 * @param  {number} month 月份
 * @return {number}       最大天数
 */
export function getMaxDate(year, month) {
    return new Date(year, month, 0).getDate();
}

/**
 * 根据范围生成对应数组
 * @param  {number}   begin    开始值
 * @param  {number}   end      结束值
 * @param  {Function} callback 生成器回调
 * @return {Array}             返回的数组
 */
export function generateArrayByRange(begin, end, callback = val => val) {
    let arr = [];
    for (;begin < end + 1;) {
        arr.push(callback(begin++));
    }
    return arr;
}

export function getAvailableMonthRange(nowYear, beginDate, endDate) {
    const beginYear = beginDate.getFullYear();
    const endYear = endDate.getFullYear();
    if (endYear > nowYear && nowYear > beginYear) {
        return generateArrayByRange(1, 12);
    }
    const beginMonth = beginDate.getMonth() + 1;
    const endMonth = endDate.getMonth() + 1;
    if (endYear === nowYear && nowYear === beginYear) {
        return generateArrayByRange(beginMonth, endMonth);
    }
    if (nowYear === beginYear) {
        return generateArrayByRange(beginMonth, 12);
    }
    return generateArrayByRange(1, endMonth);
}

function generateDayOptions(options) {
    const {
        day,
        month,
        year,
        currentYear,
        currentMonth,
        currentDate,
        beginDate,
        endDate
    } = options;
    const date = new Date(year, month - 1, day);
    const checkedYear = currentDate.getFullYear();
    const checkedMonth = currentDate.getMonth() + 1;
    const checkedDay = currentDate.getDate();
    return {
        value: day,
        isChecked: checkedYear === year && checkedMonth === month && checkedDay === day,
        canSelected: beginDate <= date && date <= endDate,
        inMonth: month === currentMonth && year === currentYear,
        date: date
    };
}

export function generateDateList({currentDate, currentMonth, currentYear, beginDate, endDate}) {
    const prevMaxDate = getMaxDate(currentYear, currentMonth - 1);
    const firstDate = new Date(currentYear, currentMonth - 1, 1);
    let prevPadDays = (firstDate.getDay() - 1) % 7;
    prevPadDays = prevPadDays < 0 ? prevPadDays + 7 : prevPadDays;
    const prevDayList = generateArrayByRange(prevMaxDate - prevPadDays + 1, prevMaxDate, day => {
        const month = currentMonth === 1
            ? 12
            : currentMonth - 1;
        const year = month === 12
            ? currentYear - 1
            : currentYear;
        return generateDayOptions({
            day,
            month,
            year,
            currentYear,
            currentMonth,
            currentDate,
            beginDate,
            endDate
        });
    });
    const maxDate = getMaxDate(currentYear, currentMonth);
    const dayList = generateArrayByRange(1, maxDate, day => {
        return generateDayOptions({
            day: day,
            month: currentMonth,
            year: currentYear,
            currentYear: currentYear,
            currentMonth: currentMonth,
            currentDate: currentDate,
            beginDate: beginDate,
            endDate: endDate
        });
    });
    const surplusDays = (prevDayList.length + dayList.length) % 7;
    const nextPadDays = surplusDays ? 7 - surplusDays : 0;
    const nextDayList = generateArrayByRange(1, nextPadDays, day => {
        const month = currentMonth === 12
            ? 1
            : currentMonth + 1;
        const year = month === 1
            ? currentYear + 1
            : currentYear;
        return generateDayOptions({
            day,
            month,
            year,
            currentYear,
            currentMonth,
            currentDate,
            beginDate,
            endDate
        });
    });
    return [...prevDayList, ...dayList, ...nextDayList];
}

/**
 * 获取日期格式输出
 * @param  {Date}   time   时间
 * @param  {String} format 输出格式，要求必须含有yyyy,mm,dd
 * @return {String}        默认返回yyyymmdd格式时间
 */
export function getTimeStr(time, format = 'yyyy-MM-dd') {
    if (typeof time === 'string') {
        time = new Date(time);
    }
    return format
        .replace('yyyy', time.getFullYear())
        .replace('MM', leftpad(time.getMonth() + 1, 2, '0'))
        .replace('dd', leftpad(time.getDate(), 2, '0'))
        .replace('HH', leftpad(time.getHours(), 2, '0'))
        .replace('mm', leftpad(time.getMinutes(), 2, '0'))
        .replace('ss', leftpad(time.getSeconds(), 2, '0'));
}

export function getYearOffsetDate(date, offset) {
    date = new Date(date);
    const year = date.getFullYear();
    date.setFullYear(year + offset);
    return date;
}

export function getRealRangeDate(date, type) {
    date = new Date(date);
    if (type === 'begin') {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
    } else {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
    }
    return date;

}
