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

// 存储私有变量
var choose_date = null;


const eventDispatch = {
    initData() {
        var data = getIninData();
        data = dealData(data);
        return data;
    },
    chooseDate(date) {
        choose_date.is_choose = false;
        
    }
}

export default eventDispatch