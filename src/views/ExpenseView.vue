<template>
  <v-container>
    <ExpenseList />
</v-container>
</template>

<script>
  import ExpenseList from '@/components/list/ExpenseList.vue' //ExpenseList.vueをインポート

  export default {
        name: 'ExpenseView',


    components: {
      ExpenseList,
    },

  }
</script>