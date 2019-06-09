<template>
    <div class="date-survey">
        <div class="month">
            <h1>5月</h1>
        </div>
        <div class="year-week">
            <p class="week">周日</p>
            <p class="year">2019年</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DateSurvey'
}
</script>

<style scoped>
    .date-survey {
        width: 94%;
        padding: 0 3%;
        height: 3.7rem;
        display: flex;
    }
    
    .month, .year-week {
        width: 3rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .month {
        align-items: center;
    }
    .month h1 {
        font-size: 1.7rem;
        font-weight: bold;
    }
    .year-week {
    }
    
    .year, .week {
        color: #333;
        font-size: .8rem;
    }
    .week {
        margin-bottom: .1rem;
    }
    
</style>
