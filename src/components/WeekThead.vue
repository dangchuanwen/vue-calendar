<template>
    <div class="week-thead">
        <div class="week-day">日</div>
        <div class="week-day">一</div>
        <div class="week-day">二</div>
        <div class="week-day">三</div>
        <div class="week-day">四</div>
        <div class="week-day">五</div>
        <div class="week-day">六</div>
    </div>
</template>

<script>
export default {
    name: 'WeekThead'
}
</script>

<style scoped>
    .week-thead {
        width: 94%;
        padding: 0 3%;
        display: flex;
        height: 2.0rem;
        border-bottom: 1px solid whitesmoke;
    }

    .week-day {
        height: 100%;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .7rem;
        color: #ABABAB;
    }
</style>
