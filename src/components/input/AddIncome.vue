<template>
  <v-container>
    <v-row justify="center">

      <v-col cols="12" md="7">

        <h2 class="text-h5 font-weight-bold   mb-4">
          収入を追加する</h2>

        <v-row class="mt-4">

          <v-btn text to="/%E5%8F%8E%E5%85%A5%E5%85%A5%E5%8A%9B" tag="router-link" style="">収入</v-btn>

          <v-btn text to="/%E6%94%AF%E5%87%BA%E5%85%A5%E5%8A%9B" tag="router-link" style="">支出</v-btn>
          <v-col>
            <p class="text-subtitle-1 font-weight-bold" style="text-align:right">
            </p>
          </v-col>
        </v-row>
        <v-divider class="my-7"></v-divider>

      </v-col>

    </v-row>

    <v-row justify="center">

      <v-col cols="12" md="7">

        <div style="border:solid 1px grey; border-radius:4px; padding:30px;">

          <v-row class="mb-4" align="center" justify="center">
            <v-col cols="12" md="4" align="center" justify="center">
              <datepicker v-model="selectedDate" :format="dateFormat" placeholder="日付を選択" class="mb-6 pa-2" style="
        display:inline-block;
        border:solid 1px grey;
        border-radius:4px;" />
            </v-col>
          </v-row>

          <v-row class="mb-4" align="center" justify="center">

            <v-col cols="5" md="4">
              <v-text-field v-model="Amount" label="収入" placeholder="金額を入力" outlined dense />
            </v-col>
          </v-row>

          <v-row class="mb-4" align="center" justify="center">

            <v-col cols="5" md="4">
              <v-select v-model="selected" :items="categories" label="カテゴリを選択" outlined dense item-text="label" item-value="value" />
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-btn @click="addData" :loading="loading" color="#cc2988" dark large>収入を登録する</v-btn>
          </v-row>

        </div>
        <v-row class="mt-5" justify="center">
          <v-alert v-if="showPopup" type="#cc2988" class="mt-4" border="left" colored-border elevation="2">
            支出が追加されました
          </v-alert>
          <v-alert v-if="showAlert" type="#cc2988" class="mt-4" border="left" colored-border elevation="2">
            すべての項目を入力してください
          </v-alert>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import axios from "axios";
  export default {
    name: 'AddIncome',
    components: {
      datepicker: Datepicker
    },
    data() {
      return {
        selectedDate: null,
        dateFormat: 'yyyy-MM-dd',
        selected: "",
        Amount: "",
        categories: [{
            label: "💰給料",
            value: "💰給料"
          },
          {
            label: "💸臨時収入",
            value: "💸臨時収入"
          },
          {
            label: "🏅賞与",
            value: "🏅賞与"
          },
          {
            label: "その他",
            value: "その他"
          },
        ],
        loading: false,
        showPopup: false,
        showAlert: false
      };
    },
    methods: {
      // DBにデータを追加する関数
      addData: async function() {
        //Date, Amountの入力チェック（空白か数字以外なら終了）
        if (!this.selectedDate || !this.Amount || !this.selected) {
          console.log("入力に間違いがあります。");
          this.loading = false;
          this.showAlert = true;
          this.showPopup = false;
          return;
        } else {
          //POSTメソッドで送るパラメーターを作成
          const param = {
            Date: this.selectedDate,
            Inout: "収入",
            Category: this.selected,
            Amount: this.Amount,
          };
          //INSERT用のAPIを呼び出し
          const response = await axios.post(
            "https://m3h-rintarootsuka-0730.azurewebsites.net/api/insert",
            param
          );
          this.loading = false;
          this.showPopup = true;
          this.showAlert = false;
          // ポップアップは2秒後に消える
          setTimeout(() => {
            this.showPopup = false;
          }, 20000);
          //結果をコンソールに出力
          console.log(this.selectedDate);
          console.log(response);
          this.selectedDate = "";
          this.Amount = "";
          this.selected = "";
        }
      },
    }
  };
</script>