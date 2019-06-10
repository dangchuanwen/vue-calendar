<template>
    <div >
       <div class="app">
           <date-survey></date-survey>
            <week-thead></week-thead>
            <calendar></calendar>
       </div>
    </div>
</template>

<script>
import DateSurvey from './components/DateSurvey.vue'
import WeekThead from './components/WeekThead.vue'
import Calendar from './components/Calendar.vue'



export default {
    name: 'app',
    components: {
        DateSurvey,
        WeekThead,
        Calendar
    }
}
</script>

<style scoped>
   html {
       font-size: 16px;
   }
   .app {
       background: whitesmoke;
   }
  

</style>


