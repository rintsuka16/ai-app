<template>
  <v-container>
    <IncomeList />
</v-container>
</template>

<script>
  import IncomeList from '@/components/list/IncomeList.vue' //IncomeList.vueをインポート

  export default {
        name: 'IncomeView',

    components: {
      IncomeList,
    },

  }
</script>