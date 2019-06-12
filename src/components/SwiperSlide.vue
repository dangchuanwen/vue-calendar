<template>
    <div class="swiper-slide">
        <div 
        class="date"
        v-for="(item, index) in dateList" 
        :key="item.id"
        :class="item.classArr"
        @click="chooseDate(item)"
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
        chooseDate(item) {
            
            this.$eventDispatch.chooseDate(item);
        }
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
       
        position: relative;
    }
    
    .date-day {
        font-size: 1.2rem;
        font-family: "AC Big Serif One";
    }
    .date-festival {
        margin-top: .4rem;
        font-size: .6rem;
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

    .is-today-is-choose {
        background: #0490F1;
    }
    .is-today-is-choose .date-day{
        color: white;
    }
    .is-today-is-choose .date-festival {
        color: white;
    }
    .is-today-is-not-choose .date-day{
        color: #0490F1;
    }
    .is-not-today-is-choose::after {       
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: transparent;
        border: 1px solid gray;
        left: 0;
        top: 0;
    }
    .is-not-today-is-not-choose {

    }
    
    
    
</style>
