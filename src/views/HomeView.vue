<template>
  <v-container>
    <KakeiboList />
</v-container>
</template>

<script>
  import KakeiboList from '@/components/list/KakeiboList.vue' //KakeiboList.vueをインポート

  export default {
        name: 'HomeView',


    components: {
      KakeiboList,
    },
    computed: {

    Total() {
        return this.$store.getters['Items/Total']; // 名前空間の変更
    }
    },

  }
</script>