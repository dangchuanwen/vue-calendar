<template>
    <div class="swiper-slide">
        <div 
        class="date"
        v-for="(item, index) in dateList" 
        :key="item.id"
        :class="item.classArr"
        >
            <p class="date-day">{{ item.cDay }}</p>
            <p class="date-festival">{{ item.festival && item.festival.length <= 3 ? item.festival : item.IDayCn }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SwiperSlide',
    props: {
        pageData: Array
    },
    mounted() {
        
    },
    data() {
        return {
            dateList: this.pageData
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
    .swiper-slide {
        width: 100%;
       
        display: flex;
        flex-wrap: wrap;
    }
    .date {
        
        width: 14.2%;
        height: 0;
        padding: 7.1% 0;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-bottom: 1.5rem;
        overflow: hidden;
    }
    
    .date-day {
        font-size: 1.2rem;
        font-family: "AC Big Serif One";
    }
    .date-festival {
        margin-top: .4rem;
        font-size: .7rem;
    }

    .this-month .date-day{
        color: #333;
    }
    .this-month .date-festival {
        color: gray;
    }
    .not-this-month .date-day {
        color:  #D4D4D4;
    }
    .not-this-month .date-festival {
        color: #E4E4E4;
    }

    .is-festival .date-festival {
        color: #0490F1;
    }
    
    
</style>
