<template>
  <div class="home">
    <MonthlyChart msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MonthlyChart from '@/components/chart/MonthlyChart.vue'

export default {
  name: 'CompView',
  components: {
    MonthlyChart
  }
}
</script>