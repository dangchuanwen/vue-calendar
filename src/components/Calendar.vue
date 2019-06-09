<template>
    <div class="calendar">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper">
            <!-- slides -->
            <swiper-slide>
                <swiper-slide-one></swiper-slide-one>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script scoped>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

import SwiperSlideOne from './SwiperSlide.vue'

export default {
    name: 'Calendar',
    components: {
        swiper,
        swiperSlide,
        SwiperSlideOne
    },
    data() {
        return {
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
