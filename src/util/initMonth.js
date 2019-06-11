import getDateInfo from './calendar.js'

/** 获取某个月的天数
 * 
 * @param  year 年份 
 * @param  month 月份
 */
function getMonthDayNum(year, month) {
    var month_day_num = 31;
    switch(month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            month_day_num = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            month_day_num = 30;
            break;
        case 2:
            month_day_num = year % 4 === 0 ? 29 : 28;
            break;
        default: 
            throw new Error("month 不能为: "  + month);
    }
    return month_day_num;
}
/** 获取某个月的日期数据
 * 
 * @param year 年份
 * @param month 月份 
 * @param start 开始日期，默认为1
 * @param end 结束日期
 */
function getMonthDate(year, month, start = 1, end) {
    // 初始化结果为一个数组
    var res = [];
    // 获取月的天数
    var month_day_num = end !== undefined ? end : getMonthDayNum(year, month);
   
    for (let i = start; i <= month_day_num; i ++) {
        let date = getDateInfo({
            year: year,
            month: month,
            day: i
        });
        
        res.push(date);
    };
    return res;
}

/** 根据年份，月份获取真实年份月份
 * @param year  年份
 * @param month  月份
 */
function getYearMonth(year, month) {
    
    var real_year = year;
    var real_month = month % 12;
    if (month > 12) {
        real_year ++;
    } else if (month < 1) {
        real_year --;
    } else {

    }

    return [ real_year, real_month ];

}

/** 获取某个月的第一天是周几
 * 
 * @param  year 年份
 * @param  month 月份
 */
function getMonthFirstDayWeek(year, month) {
    var date = new Date(year, month - 1, 1);
    var first_day_week = date.getDay();
    return first_day_week;
}

// 在此暴露
var initMonthInfo = {
    
    // 获取一页的日期数据（包括上个月的几天和下个月的几天）
    getOnePageData(year, month) {

        // 首先获取本月的日期数据
        var this_month_data = getMonthDate(year, month);
    
        // 获取本月的第一天是星期几
        var first_day_week = getMonthFirstDayWeek(year, month);
        // 计算该页面显示多少天数 ()
        var this_month_day_num = getMonthDayNum(year, month);
        var page_date_num = 42;
       
        // 计算上个月和下个月在此页面出现的天数
        // 计算上个月的日期开始时间，下个月的日期开始时间
        var last_month_day_num = first_day_week;
        var next_month_day_num = page_date_num - this_month_day_num - last_month_day_num;
       
        // 获取上个月的日期数据
        var [ last_month_year, last_month ] = getYearMonth(year, month - 1);
        var last_month_data = getMonthDate(last_month_year, last_month, getMonthDayNum(last_month_year, last_month) + 1 - last_month_day_num );
        // 获取下个月的数据
        var [ next_month_year, next_month ] = getYearMonth(year, month + 1);
        var next_month_data = getMonthDate(next_month_year, next_month, 1, next_month_day_num);
      
        // 返回数据为 上个月数据 + 本月数据 + 下个月的数据
        var res = [].concat(last_month_data, this_month_data, next_month_data);
        // 添加日期的页面所属年份和月份
        res.forEach((e) => {
            e.page_year = year;
            e.page_month = month;
        });
        return res;
    }
}

export default initMonthInfo