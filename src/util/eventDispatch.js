import getClassArr from './getClassArr.js'
import initMonth from './initMonth.js'

function getIninData() {
    var data = [];
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    
    data.push(initMonth.getOnePageData(year, month - 2));
    data.push(initMonth.getOnePageData(year, month - 1));
    data.push(initMonth.getOnePageData(year, month));
    data.push(initMonth.getOnePageData(year, month + 1));
    data.push(initMonth.getOnePageData(year, month + 2));

    // 添加 id 用于 key
    data.forEach( ( e, index, arr ) => {
        arr[index].id = index;
    })
    
    return data;
}

function dealData(datas) {
    datas.forEach((data) => {
        
        data.forEach((e, index, arr) => {
            // 判断当前日期是否为今日，初始化 choose_date
            var [year, month] = [e.page_year, e.page_month];
            var today_date = new Date();
            var today = {
                year: today_date.getFullYear(),
                month: today_date.getMonth() + 1,
                day: today_date.getDate()
            };
            if (e.cYear === year && 
                e.cMonth === month && 
                today.year === e.cYear &&
                today.month === e.cMonth &&
                today.day === e.cDay
            ) {
                choose_date = e;   
            }
            arr[index] = getClassArr(e, choose_date);    
        });
    });
   
    return datas;
}

/** 将 $eventDispatch 绑定到组件以及子组件上
 *  
 */
function bind(comp, obj) {

  
    if (typeof comp === 'object') {
        comp.$eventDispatch = obj;
    }

    if ('$children' in comp && comp.$children.length > 0) {
        
        var children = comp.$children;
      
        children.forEach((e) => {
            bind(e, obj);
        });
    }

    if ('$slots' in comp && 'default' in comp.$slots) {
        var all_slot = comp.$slots.default;
        all_slot.forEach((e) => {
            bind(e, obj);
        });
    }
   
}

/** 数组操作函数，最后一个移到第一个
 * 
 */
function lastToFirst(arr) {
    
    var first_page = arr[0];
    var middle_date = first_page[Math.floor(first_page.length / 2)];
    var year = middle_date.cYear;
    var month = middle_date.cMonth;
    
    updatePageData(arr[arr.length - 1], year, month - 1);
    arr.unshift(arr.pop());
    return ;
}
/** 数组操作函数，第一个移到最后一个
 * 
 */
function firstToLast(arr) {
    
    var first_page = arr[arr.length - 1];
    var middle_date = first_page[Math.floor(first_page.length / 2)];
    var year = middle_date.cYear;
    var month = middle_date.cMonth;
    
    updatePageData(arr[0], year, month + 1);
    arr.push(arr.shift());
    return ;
}

/** 更新页面的数据
 *  @ page_data 一页的数据
 *  @ year 更新后的年份
 *  @ month 更新后的月份
 */
function updatePageData(page_data, year, month) {
   
    // 校正年份月份
    [year, month] = initMonth.getYearMonth(year, month);
    
    // 获取更新后月份的日历数据
    var new_data = initMonth.getOnePageData(year, month);
    new_data.forEach((e, index, arr) => {
        arr[index] = getClassArr(e, year, month, choose_date);
        arr[index].page_year = year;
        arr[index].page_month = month;
    });
    
    //修改 page_data 中数据
    page_data.forEach((date, index, arr) => {
        
        // type date === object
        var new_date = new_data[index];
        for (let key in date) {
            date[key] = new_date[key];
        }
    });
    return;
}

// 存储私有变量
var choose_date = null;     // 选择的日期
var ifSwiperInit = false;   // swiper是否初次渲染
var swiperTimer = null;     // 滑动防抖的定时器引用

const eventDispatch = {
    // 将 事件中心绑定到组件以及子组件上
    bind(comp) {
        bind(comp, this);   
    },
    // 定义初始化的日期数据
    initData() {
        var data = getIninData();
        data = dealData(data);
        return data;
    },
    // 选择日期
    chooseDate(date) {
        choose_date.is_choose = false;
        date.is_choose = true;
        choose_date = date;   
    },
    getIfSwiperInit() {
        return ifSwiperInit;
    },
    setIfSwiperInit(new_value) {
        ifSwiperInit = new_value;
    },
    /** 结束滑动后处理
     * 
     * @param {组件} comp
     * @param {swiper实例} swiper
     */
    endSwiper(comp, swiper) {
        // 结束滑动
        var dateData = comp.dateData;;
        var activeIndex = swiper.activeIndex;
        
        if (activeIndex === 1) {
            // 最后一个移到第一个
            lastToFirst(dateData);
        } else if (activeIndex === 3) {
            // 第一个移到最后一个
            firstToLast(dateData);
        } else if (activeIndex !== 2){
            // 防抖
            clearTimeout(swiperTimer);
            swiperTimer = setTimeout(() => {
                // 调整页面
                console.log("调整")
                this.adjustSwiper(comp, swiper);
            }, 300);
        }
        return;
    },
    /** 调整滑动器页面
     *  
     */
    adjustSwiper(comp, swiper) {
        var dateData = comp.dateData;
        var activeIndex = swiper.activeIndex;
        if (activeIndex < 2) {
            for (let i = activeIndex; i < 2; i ++) {
                //最后一个移到第一个
                lastToFirst(dateData);
            }
        } else if (activeIndex > 2) {
            for (let i = activeIndex; i > 2; i --) {
                //第一个移到最后一个
                firstToLast(dateData);
            }
        }

        return;
    }
    
}

export default eventDispatch