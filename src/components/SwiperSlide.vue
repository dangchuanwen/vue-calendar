<template>
    <div class="swiper-slide">
        <div 
        class="date"
        v-for="(item, index) in dateList" 
        :key="item.id"
        
        >
            <p class="date-day">{{ item.date }}</p>
            <p class="date-festival">初一</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SwiperSlide',
    data() {
        return {
            dateList: []
        }
    },
    mounted() {
        var list = [];
        for (let i = 0; i < 35; i ++) {
            list.push({
                id: i,
                date: i + 1
            });
        }
        this.dateList = list;
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
    }
    
    
    

    .date-day {
        font-size: 1.2rem;
        color: #333;
    
        font-family: "AC Big Serif One";
    }
    .date-festival {
        font-size: .7rem;
        color: gray;
        margin-top: .4rem;
    }
</style>
