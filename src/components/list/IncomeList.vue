<template>
  <v-container>
      <v-row justify="center">
      
      <v-col cols="12" md="7">
        
    <h2 class="text-h5 font-weight-bold   mb-4">
      一覧を表示する</h2>

    <v-row class="mt-4">

      <v-btn text to="/" tag="router-link">チャット</v-btn>

      <v-btn text to="/%E5%8F%8E%E5%85%A5" tag="router-link">収入</v-btn>
      <v-btn text to="/%E6%94%AF%E5%87%BA" tag="router-link">支出</v-btn>
      <v-col>
        <p class="text-subtitle-1 font-weight-bold" style="text-align:right">
          収入合計：{{SumIn}}円
        </p>
      </v-col>
    </v-row>
    <v-divider class="mb-2"></v-divider>

      </v-col>
    </v-row>
    <v-row justify="center">

      <v-col cols="12" md="7">
        <v-row style="margin-bottom:0px">
          <v-col style="padding-left:25px">日付（昇順）</v-col>
          <v-col>カテゴリ</v-col>
          <v-col>金額</v-col>
        </v-row>

        <v-list class=" d-flex flex-column" style="border:solid grey 1px; border-radius:4px;">

          <v-list-item v-for="item in Items" :key="item">

            <v-list-item-content>
              <v-row>
                <v-col style="border-bottom:solid 1px grey">{{ item.Date }}</v-col>
                <v-col style="border-bottom:solid 1px grey">{{ item.Category }}</v-col>
                <v-col style="border-bottom:solid 1px grey">{{ item.Amount }} 円</v-col>
              </v-row>
              <v-list-item-subtitle>
              </v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>

        </v-list>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    computed: {
      // VueXのstateから商品リストを取得
      Items() {
        return this.$store.state.incomes.Items; // 名前空間の変更
      },
      // getterから合計金額を取得
      SumIn() {
        return this.$store.getters['incomes/SumIn']; // 名前空間の変更
      },
    },
    mounted() {
      this.$store.dispatch('incomes/API');
    },
  }
</script>