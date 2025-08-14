<template>
  <v-container>
    <AddExpense />
</v-container>
</template>

<script>
  import AddExpense from '@/components/input/AddExpense.vue' //AddExpense.vueをインポート

  export default {
        name: 'AddExpenseView',


    components: {
      AddExpense,
    },

  }
</script>