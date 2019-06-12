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

// 存储私有变量
var choose_date = null;


const eventDispatch = {
    bind(comp) {
        bind(comp, this);   
    },
    initData() {
        var data = getIninData();
        data = dealData(data);
        return data;
    },
    chooseDate(date) {
        choose_date.is_choose = false;
        date.is_choose = true;
        choose_date = date;
        
    }
}

export default eventDispatch