/**
 * @file 工具函数
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Nov 14, 2016
 */

// TODO后续这个if else可以抽象
export function getFixedString(fixed) {
    if (typeof fixed === 'undefined') {
        return 'none';
    }
    if (fixed === 'right') {
        return 'right';
    }
    return 'left';
}
