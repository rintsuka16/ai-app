<template>
      <v-container>
            <v-btn text to="/%E5%8F%8E%E5%85%A5%E5%85%A5%E5%8A%9B" tag="router-link">家計簿に追加する</v-btn>
      <v-btn text to="/%E5%8F%8E%E5%85%A5" tag="router-link">一覧を表示する</v-btn>

        <!-- タイトル -->
        <v-row class="text-h4 mb-4" justify="center">ログイン</v-row>

        <!-- 入力フォーム -->
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <!-- ユーザー名入力欄 -->
            <v-text-field 
              v-model="userid" 
              label="ユーザーID" 
              outlined>
            </v-text-field>

            <!-- パスワード入力欄 -->
            <v-text-field 
              v-model="password" 
              label="パスワード" 
              type="password" 
              outlined>
            </v-text-field>

            <!-- ログインボタン -->
            <v-btn color="primary" class="mt-4" block @click="login">ログイン</v-btn>

            <!-- サインアップボタン -->
            <v-btn text class="mt-2" block @click="goToSignup">新規登録はこちら</v-btn>
          </v-col>
        </v-row>

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
      </v-container>
</template>
  <script>
  import axios from "axios";

    export default {
    name: 'IndexView',

    data() {
      return {
        userid: '',
        password: '',
        errorMessage: '',
        dialog: false
      };
    },
    methods: {
        // ログイン処理（セッション処理なし）
        login: async function () {
          if (!this.userid || !this.password) {
            this.errorMessage = "ユーザーIDとパスワードを入力してください。";
            this.dialog = true;
            return;
          }

          try {
            const response = await axios.post('※ここにLOGONAPIのURLを記載※', {
              ID: this.userid,
              Password: this.password
            });

            console.log("レスポンス:", response.data);

            if (response.status === 200 && response.data?.result === "Succeeded") {
              // ログインに成功した場合はhome.htmlに画面遷移
              window.location.href = "home.html";
            } else {
              this.errorMessage = response.data?.Message || "ログインに失敗しました。";
              this.dialog = true;
            }
          } catch (err) {
            console.error("ログインエラー:", err);
            this.errorMessage = "ログインエラー：" + (err.response?.data || err.message);
            this.dialog = true;
          }
        },
        // サインアップページへ遷移
        goToSignup() {
          window.location.href = "signup.html";
        }    }

    };
  </script>
