<template>
  <div class="signup-wrapper">
    <div class="signup-card">
      <!-- タイトル -->
      <div class="signup-title">ユーザー登録</div>

      <!-- 入力フォーム -->
      <v-text-field v-model="userid" label="ユーザーID" outlined />
      <v-text-field v-model="password" label="パスワード" type="password" outlined />
      <v-text-field v-model="displayName" label="表示名" outlined />

      <!-- 登録ボタン -->
      <v-btn color="primary" class="mt-4" block @click="signup">登録</v-btn>

      <!-- ログイン画面に戻る -->
      <v-btn text class="mt-2" block @click="goToLogin">ログインに戻る</v-btn>

      <!-- エラーダイアログ -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">エラー</v-card-title>
          <v-card-text>{{ errorMessage }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 成功ダイアログ -->
      <v-dialog v-model="successDialog" max-width="400">
        <v-card>
          <v-card-title class="headline">成功</v-card-title>
          <v-card-text>{{ message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="goToLogin">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignupView",
  data() {
    return {
      userid: "",
      password: "",
      displayName: "",
      message: "",
      errorMessage: "",
      dialog: false,
      successDialog: false
    };
  },
  methods: {
async signup() {
  if (!this.userid || !this.password || !this.displayName) {
    this.errorMessage = "全ての項目を入力してください。";
    this.dialog = true;
    return;
  }

  try {
    // Users に登録
    const response = await axios.post(
      "https://m3h-rintarootsuka-0730.azurewebsites.net/api/INSERTUSER",
      {
        ID: this.userid,
        Password: this.password,
        Name: this.displayName
      }
    );

    console.log(response);

    if (response.data === "登録結果:1件のユーザー情報を登録しました。") {
      // PlayerData に初期データを登録
      const response2 = await axios.post(
        "https://m3h-rintarootsuka-0730.azurewebsites.net/api/INSERTPLAYER",
        {
          UserId: this.userid   // ← 修正ポイント
        }
      );
      this.message = response2.data;
    } else {
      this.message = response.data;
    }

    this.successDialog = true;
    this.errorMessage = "";
  } catch (err) {
    this.errorMessage = "登録エラー：" + (err.response?.data || err.message);
    this.dialog = true;
  }
},
goToLogin() {
  this.$router.push("/"); // IndexView に戻る
}

  }
};
</script>

<style scoped>
/* 黒背景に合わせて中央配置 */
.signup-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
}

/* 白いカード風デザイン */
.signup-card {
  background-color: #fff;
  color: #333;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
}

.signup-title {
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
  color: #165e83;
}
</style>
