<template>
    <div class="calendar">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper">
            <!-- slides -->
            <swiper-slide v-for="item in dateData" :key="item.id">
                <swiper-slide-one :pageData="item"></swiper-slide-one>
            </swiper-slide>
            
        </swiper>
    </div>
</template>

<script scoped>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import SwiperSlideOne from './SwiperSlide.vue'

import getClassArr from '../util/getClassArr.js'
import initMonth from '../util/initMonth.js'

export default {
    name: 'Calendar',
    components: {
        swiper,
        swiperSlide,
        SwiperSlideOne
    },
    mounted() {
        // 初始化五个月，本月为中间月份
        var data = this.initData();
        this.dateData = this.dealData(data);
    },
    methods: {
        // 处理数据，添加样式等
        dealData (datas) {
            datas.forEach((data) => {
                // 中间值日期 必为页面的所属
                var middle_date = data[Math.floor(data.length / 2)];
                var year = middle_date.cYear;
                var month = middle_date.cMonth;
                data.forEach((e, index, arr) => {
                    
                    arr[index] = getClassArr(e, year, month);    
                });
            });
     
            return datas;
        },
        initData () {
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
        },
    },
    data() {
        return {
            dateData: [],
            swiperOption: {
            // some swiper options/callbacks
            // 所有的参数同 swiper 官方 api 参数
            // ...
            }
        }
    }
}
</script>

<style scoped>
    .calendar {
        width: 94%;
        margin: 0 3%;
       
    }

    .swiper {
        width: 100%;
        
    }
</style>
