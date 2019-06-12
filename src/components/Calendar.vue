<template>
    <div class="calendar">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper" >
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
    updated() {
        if (!this.ifInit) {
            this.ifInit = true;
            eventDispatch.bind(this);
            // 将本月的页面置于中间位置
            this.swiper.slideTo(2, 0);
        } else {
            
        }
        
    },
    methods: {
        adjustSwiper() {
            var dateData = this.dateData;
            var activeIndex = this.swiper.activeIndex;
            if (activeIndex < 2) {
                for (let i = activeIndex; i < 2; i ++) {
                    dateData.unshift(
                        dateData.pop()
                    );
                }
            } else if (activeIndex > 2) {
                for (let i = activeIndex; i > 2; i --) {
                    dateData.push(dateData.shift());
                }
            }
            this.swiper.slideTo(2, 0);
        }
    },
    data() {
        var that = this;
        return {
            timer: null,
            ifInit: false,
            swiper: null,
            dateData: [],
            swiperOption: {
                on: {
                    init() {
                        that.swiper = this;
                    },
                    transitionEnd() {
                        // 结束滑动
                        // 防抖
                        clearTimeout(that.timer);
                        that.timer = setTimeout(() => {
                            // 调整页面
                            that.adjustSwiper();
                        }, 300);
                        
                    }
                }
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
