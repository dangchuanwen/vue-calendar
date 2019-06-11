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

import eventDispatch from '../util/eventDispatch.js'

export default {
    name: 'Calendar',
    components: {
        swiper,
        swiperSlide,
        SwiperSlideOne
    },
    mounted() {
        // 初始化五个月，本月为中间月份
        this.dateData = eventDispatch.initData();
    },
    methods: {
      
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
