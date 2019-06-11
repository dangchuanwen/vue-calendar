import util from './util.js'

const dependence = function(obj, key, value, cb) {
    Object.defineProperty(obj, key, {
        get() {
            return value;
        },
        set(new_value) {
            value = new_value;
            cb(obj, new_value);
        },
        enumerable: false,
        configurable: false
    })
}

/** 获取是否今天的 className */
const getTodayClass = function(date, choose_date) {
    // 添加响应式
    dependence(date, 'is_today', true, function(obj, new_value) {
        obj.classArr = util.arrayRemove(obj.classArr, 'is-today-is-choose');
        obj.classArr = util.arrayRemove(obj.classArr, 'is-today-is-not-choose');
        obj.classArr = util.arrayRemove(obj.classArr, 'is-not-today-is-choose');
        obj.classArr = util.arrayRemove(obj.classArr, 'is-not-today-is-not-choose');
        if (new_value) {
            if (date === choose_date) {
                obj.classArr.push('is-today-is-choose');
            } else {
                obj.classArr.push('is-today-is-not-choose');
            }
        } else {
            if (date === choose_date) {
                obj.classArr.push('is-not-today-is-choose');
            } else {
                obj.classArr.push('is-not-today-is-not-choose');
            }
        }
    });
    
    var today_date = new Date();

    if (date.page_year === today_date.getFullYear() && 
        date.page_month === today_date.getMonth() + 1 &&
        date.cDay === today_date.getDate()
    ) {
        // 今日 且当页
        date.is_today = true;
    } else {
        // 非今日
        date.is_today = false;
    }
    return date;
}

/** 获取是否某个页面当月的 className */
const getNowMonthClass = function(date, year, month) {
    
    // 添加响应式
    dependence(date, 'is_this_month', true, function(obj, new_value) {
        obj.classArr = util.arrayRemove(obj.classArr, 'this-month');
        obj.classArr = util.arrayRemove(obj.classArr, 'not-this-month');

        if (new_value) {
            obj.classArr.push('this-month');
        } else {
            obj.classArr.push('not-this-month');
        }
        
    });

    if (date.cYear === year && date.cMonth === month) {
        date.is_this_month = true;
    } else {
        date.is_this_month = false;
    }
    
    return date;
}

/** 获取是否是节日的 className
 * 
 */
const getIsFestivalClass = function(date, year, month) {
    // 添加响应式
    dependence(date, 'is_festival', true, function(obj, new_value) {
        obj.classArr = util.arrayRemove(obj.classArr, 'is-festival');
        obj.classArr = util.arrayRemove(obj.classArr, 'is-not-festival');

        if (new_value) {
            obj.classArr.push('is-festival');
        } else {
            obj.classArr.push('is-not-festival');
        }
    });

    if (date.festival && date.festival.length < 4 && date.cYear === year && date.cMonth === month) {
        date.is_festival = true;
    } else {
        date.is_festival = false;
    }
    return date;
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
    return date;
}

/** 选中 or 未选中
 * 
 * @param {*} date 
 * @param {*} choose_date 
 */
const getChooseClass = function(date, choose_date) {
    // 添加响应式
    dependence(date, 'is_choose', true, function(obj, new_value) {
        obj.classArr = util.arrayRemove(obj.classArr, 'is-today-is-choose');
        obj.classArr = util.arrayRemove(obj.classArr, 'is-today-is-not-choose');
        obj.classArr = util.arrayRemove(obj.classArr, 'is-not-today-is-choose');
        obj.classArr = util.arrayRemove(obj.classArr, 'is-not-today-is-not-choose');
        if (new_value) {
            if (date === choose_date) {
                obj.classArr.push('is-today-is-choose');
            } else {
                obj.classArr.push('is-today-is-not-choose');
            }
        } else {
            if (date === choose_date) {
                obj.classArr.push('is-not-today-is-choose');
            } else {
                obj.classArr.push('is-not-today-is-not-choose');
            }
        }
    });
}


/** 初始化的添加 class
 *  @ date 日期对象
 *  @ year 某个页面的年份
 *  @ month 某个页面的月份
 *  @ choose_date 选中的日期（默认为今天对应的日期）
 */
const initAddClass = function(date, choose_date) {
    
    var [year, month] = [date.page_year, date.page_month];
    date.classArr = [];
    // 本月 or 非本月
    date = getNowMonthClass(date, year, month);
    // 节日 or 非节日
    date = getIsFestivalClass(date, year, month);
    // 今日 or 非今日
    date = getTodayClass(date, choose_date);
    // 选中 or 未选中
    
    return date;
}
export default initAddClass