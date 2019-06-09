
/** 获取是否今天的 className */
const getTodayClass = function(date) {
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth() + 1;
    var nowDay = nowDate.getDate();
    
    if (date.year === nowYear && date.month === nowMonth && date.day === nowDay) {
        date.classArr.push('today');
    } else {
        date.classArr.push('not-today');
    }
}

/** 获取是否本月的 className */
const getNowMonthClass = function(date) {
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth() + 1;

    if (date.year === nowYear && date.month === nowMonth) {
        date.classArr.push('this-month');
    } else {
        date.classArr.push('not-this-month');
    }
}

/** 获取是否是节日的 className
 * 
 */
const getIsFestivalClass = function(date) {
    if (date.isFestival) {
        date.classArr.push('is-festival');
    } else {
        date.classArr.push('is-not-festival');
    }
}

/** 获取是否是节假日休息或者上班的 className
 * 
 */
const getIfVacationClass = function(date) {
    if (date.isWork) {
        date.classArr.push('is-work');
    } else if (date.isVacation) {
        date.classArr.push('is-vacation');
    } else {
        date.classArr.push('no-vacation');
    }
}



/** 初始化的添加 class
 * 
 */
const initAddClass = function(date) {
    // 本月 or 非本月
    date = getNowMonthClass(date);
    // 节日 or 非节日
    date = getIsFestivalClass(date);
    // 假日 or 上班 or 无
    date = getIfVacationClass(date);
    // 今日 or 非今日
    date = getTodayClass(date);
    return date;
}