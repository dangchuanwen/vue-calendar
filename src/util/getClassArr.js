
/** 获取是否今天的 className */
const getTodayClass = function(date, choose_date) {
    if (date === choose_date) {
        // 选中且今日
        date.is_today = true;
        date.is_choose = true;
    } else {
        // 非选中 且不是今日
        date.is_today = false;
        date.is_choose = false;
    }
    return date;
}

/** 获取是否某个页面当月的 className */
const getNowMonthClass = function(date, year, month) {
    
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

/** 根据 true 或 false 添加样式
 * 
 */
const produceDateClass = function(date) {
    date.classArr = [];

    // 本月 or 非本月
    var month_class = date.is_this_month === true ? 'this-month' : 'not-this-month';
    date.classArr.push(month_class);
    // 节日 or 非节日
    var festival_class = date.is_festival === true ? 'is-festival' : 'is-not-festival';
    date.classArr.push(festival_class);
    // 今日选中 or 非今日未选中
    var today_choose_class = '';
    if (date.is_choose) {
        if (date.is_today) {
            today_choose_class = 'is-today-is-choose';
        } else {
            today_choose_class = 'is-not-today-is-choose';
        }
    } else {
        if (date.is_today) {
            today_choose_class = 'is-today-is-not-choose';
        } else {
            today_choose_class = 'is-not-today-is-not-choose';
        }
    }
    date.classArr.push(today_choose_class);
    return date;
}

/** 初始化的添加 class
 *  @ date 日期对象
 *  @ year 某个页面的年份
 *  @ month 某个页面的月份
 *  @ choose_date 选中的日期（默认为今天对应的日期）
 */
const initAddClass = function(date, year, month, choose_date) {

    // 本月 or 非本月
    date = getNowMonthClass(date, year, month);
    // 节日 or 非节日
    date = getIsFestivalClass(date, year, month);
    // 今日 or 非今日
    date = getTodayClass(date, choose_date);
    
    // 根据 每个样式的 true 或 false 往 classArr 添加
    date = produceDateClass(date);
    return date;
}
export default initAddClass