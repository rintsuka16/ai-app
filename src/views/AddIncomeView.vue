<template>
  <v-container>
    <AddIncome />
</v-container>
</template>

<script>
  import AddIncome from '@/components/input/AddIncome.vue' //AddIncome.vueをインポート

  export default {
        name: 'AddIncomeView',


    components: {
      AddIncome,
    },

  }
</script>