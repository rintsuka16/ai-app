<template>
  <div class="wrapper">

    <div class="status-wrapper">
      <table class="table">
        <tr>
          <td>
            なまえ: </td>
          <td>
            {{ status.UserId }}
          </td>
        </tr>
        <tr>
          <td>
            けいけんち: </td>
          <td>
            {{ status.Exp }}
          </td>
        </tr>
        <tr>

          <td>
            ちから: </td>
          <td>
            {{ status.Parameter1 }}
          </td>
        </tr>
        <tr>

          <td>
            まもり: </td>
          <td>
            {{ status.Parameter2 }}
          </td>
        </tr>
        <tr>

          <td>
            すばやさ: </td>
          <td>
            {{ status.Parameter3 }}
          </td>
        </tr>

      </table>
    </div>

    <v-container class="pb-16 px-4 pt-4">

      <table class="table" border>
        <tr colspan="12">
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
        </tr>

      </table>
      <div class="character">
        <img class="" contain src="https://i.gyazo.com/3ff238758fb7cabf237a3640ae367669.png" transition="scale-transition" width="500" height="300" />
      </div>

      <!-- チャットメッセージ1件ごとに繰り返し表示 -->
      <div v-for="(message, index) in messages" :key="index" class="mb-2 mt-2 d-flex" :class="{'justify-end': message.role === 'user', 'justify-start': message.role === 'bot'}">
        <!-- メッセージ吹き出しデザイン -->
        <v-sheet :class="[message.role === 'user' ? 'indigo lighten-5' : 'grey lighten-3', 'pa-3', 'rounded-lg']" elevation="1" max-width="60%">
          <!-- メッセージ本文 -->
          <div class="text-pre-line">{{ message.text }}</div>
        </v-sheet>
      </div>
    </v-container>
    <div class="bottom-space">余白</div>

    <div class="dialog">
      <div class="speaker">
        <v-container>
          りゅうおう
        </v-container>
      </div>
      <v-container style="color:white">
        <div id="ityped"></div>

      </v-container>
    </div>
    <!-- メッセージ入力欄 -->

    <div class="chat-input-bar">
      <v-container class="pa-3">
        <v-row no-gutters>
          <v-col cols="10">
            <v-textarea v-model="message" placeholder="メッセージを入力..." auto-grow rows="1" outlined hide-details rounded></v-textarea>
          </v-col>

          <!-- 送信ボタン -->
          <v-col cols="2" class="pl-2">
            <v-btn color="#165e83" block class="mt-2" @click="sendMessage">
              送信
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  import {
    init
  } from "ityped";
  export default {
    name: "AIView",
    data: () => ({
      message: "",
      messages: []
    }),
    methods: {
      async sendMessage() {
        const trimmed = this.message.trim();
        const event = "1+1=?"
        if (!trimmed) return;
        const message = event + "\n" + trimmed;
        // 自分のメッセージを履歴に追加
        this.messages.push({
          role: "user",
          text: message
        });
        this.message = "";
        // APIにメッセージを送信
        const response = await axios.post(
          "https://m3h-rintarootsuka-0730.azurewebsites.net/api/OpenAI?", {
            message: message
          }
        );
        console.log("APIレスポンス:");
        // レスポンスコンソールに出力
        console.log("APIレスポンス:", response);
        // 応答内容を出力
        const contentText = response.data.Content[0].Text;
        const text = JSON.parse(contentText);
        // Vuexのstateに加算
        this.$store.commit("status/addParameters", {
          Parameter1: text.Intelligence,
          Parameter2: text.Vitality,
          Parameter3: text.Empathy
        });
        console.log(text);
        console.log("パラメータ1:", text.Intelligence);
        console.log("パラメータ2:", text.Vitality);
        console.log("パラメータ3:", text.Empathy);
        const text1 = "Parameter1: " + text.Intelligence;
        const text2 = "Parameter2: " + text.Vitality;
        const text3 = "Parameter3: " + text.Empathy;
        this.messages.push({
          role: "bot",
          text: text1
        });
        this.messages.push({
          role: "bot",
          text: text2
        });
        this.messages.push({
          role: "bot",
          text: text3
        });
      },
    },
    computed: {
      // VueXのstateから商品リストを取得
      status() {
        return this.$store.state.status.status; // 名前空間の変更
      },
      // getterから合計金額を取得
      Level() {
        return this.$store.getters['status/Level']; // 名前空間の変更
      },
    },
    mounted() {
      this.$store.dispatch("status/setSavedData");
      const sampleMessage = "「よくきた　ゆうしゃよ。　わしが　おうのなかの　おう　りゅうおうだ。」「わしは　まっておった。　そなたのような　わかものが　あらわれることを…「もし　わしの　みかたになれば　せかいの　はんぶんを　おまえに　やろう。「どうじゃ？　わしの　みかたに　なるか？"
      init(document.querySelector("#ityped"), {
        strings: [sampleMessage],
        typeSpeed: 100, //タイピングのスピード
        backSpeed: 50, //文字が消えていくときのスピード
        startDelay: 500, //タイピングが始まるまでの時間
        backDelay: 500, //タイピングが終わって消え始めるまでの時間
        loop: false, //繰り返しの有無（trueかfalseで指定）
        showCursor: false, //カーソル表示の有無（trueかfalseで指定）
        placeholder: false, //プレースホルダーでのアニメーション（trueかfalseで指定）
        disableBackTyping: false, //文字を消していく動作の有無（trueかfalseで指定）
        cursorChar: "|", //カーソルとして表示させる文字を" "内に指定
      })
    }
  };
</script>
<style>
  body {
    height: 100%;
    margin: 0;
  }

  #app {
    height: 100%;
    background-color: black;
  }

  .wrapper {
    background-color: black;
    margin: 0 10%;
    width: 80%;
    padding: 20px 20px 0 20px;
    margin-bottom: 100px;
    background-image: url('https://i.gyazo.com/885cc2c4ae29f74b1390a750087a0967.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    font-family: sans-serif;
  }

  .bottom-space {
    background-color: black;
    text-align: center;
    color: black;
    padding-top: 75px;
    height: 190px;
    width: 100%;
    opacity: 0;
  }

  .character {
    opacity: 1;
  }

  .character img {
    opacity: 1;
  }

  .dialog {
    position: fixed;
    bottom: 84px;
    left: 10%;
    height: 20%;
    width: 80%;
    box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border: solid white;
    background-color: black;
  }

  .speaker {
    border-bottom: solid white;
    color: white;
  }

  .chat-input-bar {
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .status-wrapper {
    float: right;
    padding: 10px;
    width: 300px;
    margin-bottom: 10px;
    opacity: 1;
  }

  .table {
    background-color: black;
    right: 25px;
    color: white;
    border: solid 3px white;
    border-radius: 5px;
  }

  .table td,
  .table th {
    margin: 10px;
    height: 32px;
    width: 20%;
    padding: 5px;
  }
</style>