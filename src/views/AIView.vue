<template>
  <div class="game-wrapper">

    <div class="status-wrapper">
      <table class="table">
        <tr>
          <td>なまえ:</td>
          <td>{{ player.userId }}</td>
        </tr>
        <tr>
          <td>けいけんち:</td>
          <td>{{ player.exp }}</td>
        </tr>
        <tr>
          <td>ちから:</td>
          <td>{{ player.parameter1 }}</td>
        </tr>
        <tr>
          <td>まもり:</td>
          <td>{{ player.parameter2 }}</td>
        </tr>
        <tr>
          <td>すばやさ:</td>
          <td>{{ player.parameter3 }}</td>
        </tr>
      </table>
    </div>

    <v-container class="pb-16 px-4 pt-4">
      <div class="dialog">
        <div class="speaker">
          <v-container>{{ currentLine ? currentLine.speaker : '' }}</v-container>
        </div>
        <v-container style="color:white" @click="nextLine">
          <div id="ityped"></div>
          <div v-if="statMessage" class="stat-message">
            {{ statMessage }}
          </div>
        </v-container>
      </div>

      <div class="character" style="opacity:1">
        <img :src="currentCharImage" />
      </div>

      <div v-for="(m, i) in messages" :key="i" class="mb-2 mt-2 d-flex" :class="{'justify-end': m.role==='user', 'justify-start': m.role!=='user'}">
        <v-sheet v-if="m.role==='user' || m.role==='bot'" :class="[m.role === 'user' ? 'indigo lighten-5' : 'grey lighten-3', 'pa-3', 'rounded-lg']" elevation="1" max-width="60%">
          <div class="text-pre-line">{{ m.text }}</div>
        </v-sheet>
      </div>
    </v-container>


    <div class="chat-input-bar">
      <v-container class="pa-3">
        <v-row no-gutters>
          <v-col cols="10">
            <v-textarea v-model="message" placeholder="メッセージを入力..." auto-grow rows="1" outlined hide-details rounded></v-textarea>
          </v-col>
          <v-col cols="2" class="pl-2">
            <v-btn block class="mt-2" @click="sendMessage" :disabled="lastLine || typing">
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
    data() {
      return {
        message: "",
        messages: [],
        typing: false,
        statMessage: "",
        pendingStatMessages: [],
        imageURL: 0,
        imageList: [
          "https://i.gyazo.com/98ada2c0b6aebb3e448b68c0fe85116c.png",
          "https://i.gyazo.com/9e8ddea5620600ece10d9e02c27ba4ba.png",
          "https://i.gyazo.com/4cc6325713e327f87be71e61dfe9e2e5.png",
          "https://i.gyazo.com/f060e5b78f97c2d511eeda761170f5d6.png",
          "https://i.gyazo.com/2928c506f7c613c70d32eb1d8469fd1a.png",
          "https://i.gyazo.com/020bdd6f54b4ffd3c24804ae3535f901.png"
        ],
        charImages_0: [
          "https://i.gyazo.com/98ada2c0b6aebb3e448b68c0fe85116c.png",
          "https://i.gyazo.com/9e8ddea5620600ece10d9e02c27ba4ba.png",
          "https://i.gyazo.com/4cc6325713e327f87be71e61dfe9e2e5.png",
          "https://i.gyazo.com/f060e5b78f97c2d511eeda761170f5d6.png",
          "https://i.gyazo.com/2928c506f7c613c70d32eb1d8469fd1a.png",
          "https://i.gyazo.com/020bdd6f54b4ffd3c24804ae3535f901.png"
        ],
        charImages_10: [
          "https://i.gyazo.com/7e40daa9eea607ace654fa499c9a5581.png",
        ],
        charImages_20: [
          "https://i.gyazo.com/3ff238758fb7cabf237a3640ae367669.png",
        ],
        charImages_30: [
          "https://i.gyazo.com/98ada2c0b6aebb3e448b68c0fe85116c.png",
          "https://i.gyazo.com/9e8ddea5620600ece10d9e02c27ba4ba.png",
          "https://i.gyazo.com/4cc6325713e327f87be71e61dfe9e2e5.png",
          "https://i.gyazo.com/f060e5b78f97c2d511eeda761170f5d6.png",
          "https://i.gyazo.com/2928c506f7c613c70d32eb1d8469fd1a.png",
          "https://i.gyazo.com/020bdd6f54b4ffd3c24804ae3535f901.png"

        ],
      };
    },
    computed: {
      player() {
        return this.$store.state.player;
      },
      currentLine() {
        return this.$store.getters["player/currentLine"];
      },
      lastLine() {
        return this.$store.getters["player/lastLine"];
      },
      currentImage() {
        return this.imageList[this.imageURL];
      },
      charImageList() {
        switch (this.player.charId) {
          case 10:
            return this.charImages_10;
          case 20:
            return this.charImages_20;
          case 30:
            return this.charImages_30;
          case 0:
          default:
            return this.charImages_0;
        }
      },
        currentCharImage() {
    return this.charImageList[this.imageURL % 6];
  }
    },
      methods: {
        startTyping() {
          const textBox = document.querySelector("#ityped");
          if (!textBox || this.typing) return;
          const text = this.currentLine ? this.currentLine.text : "";
          textBox.innerHTML = "";
          this.typing = true;
          init(textBox, {
            strings: [text],
            typeSpeed: 25,
            backSpeed: 50,
            startDelay: 100,
            backDelay: 500,
            loop: false,
            showCursor: false,
            placeholder: false,
            disableBackTyping: true,
            cursorChar: "|",
            onFinished: () => {
              this.typing = false;
            }
          });
        },
        async nextLine() {
          if (this.pendingStatMessages && this.pendingStatMessages.length > 0) {
            this.statMessage = this.pendingStatMessages.shift();
            return;
          }
          if (this.lastLine) {
            this.$store.commit("player/nextLine");
            this.$nextTick(this.startTyping);
          } else {
            const event = this.player.currentEventId + 1;
            this.$store.commit("player/setProgress", {
              eventId: event,
              seq: 0
            });
            await this.$store.dispatch("player/loadEvent");
            this.$nextTick(this.startTyping);
            this.statMessage = "";
          }
        },
        async sendMessage() {
          const trimmed = (this.message || "").trim();
          if (!trimmed) return;
          const textBox = document.querySelector("#ityped");
          if (textBox) {
            textBox.innerHTML = "";
            this.typing = true;
            init(textBox, {
              strings: [trimmed],
              typeSpeed: 25,
              backSpeed: 50,
              loop: false,
              showCursor: false,
              onFinished: () => {
                this.typing = false;
              }
            });
          }
          try {
            const resp = await axios.post(
              "https://m3h-rintarootsuka-0730.azurewebsites.net/api/OpenAI?", {
                message: trimmed
              }
            );
            const parsed = JSON.parse(resp.data.Content[0].Text);
            const before = {
              p1: this.player.parameter1,
              p2: this.player.parameter2,
              p3: this.player.parameter3,
              exp: this.player.exp
            };
            this.$store.commit("player/addParams", {
              p1: Number(parsed.Intelligence) || 0,
              p2: Number(parsed.Vitality) || 0,
              p3: Number(parsed.Empathy) || 0
            });
            let statLines = [];
            if (this.player.parameter1 - before.p1) statLines.push(`ちからが ${this.player.parameter1 - before.p1} 上がった！`);
            if (this.player.parameter2 - before.p2) statLines.push(`まもりが ${this.player.parameter2 - before.p2} 上がった！`);
            if (this.player.parameter3 - before.p3) statLines.push(`すばやさが ${this.player.parameter3 - before.p3} 上がった！`);
            if (this.player.exp - before.exp) statLines.push(`けいけんちが ${this.player.exp - before.exp} 増えた！`);
            this.pendingStatMessages = statLines;
          } catch (e) {
            console.error(e);
            this.pendingStatMessages = ["評価に失敗しました。"];
          }
          this.message = "";
        }
      },
      mounted: async function() {
        await this.$store.dispatch("player/loadPlayer");
        await this.$store.dispatch("player/loadEvent");
        this.startTyping();
        const that = this;
        setInterval(function() {
          that.imageURL = (that.imageURL + 1) % 6;
        }, 80);
      }
    };

</script>


<style>
  .stat-message {
    font-family: 'MisakiGothic', monospace;
    margin-top: 10px;
    color: yellow;
    font-weight: bold;
    white-space: pre-line;
  }

  @font-face {
    font-family: 'MisakiGothic';
    src: url('@/assets/fonts/misaki_gothic_2nd.ttf') format('truetype');
  }

  #ityped {
    font-family: 'MisakiGothic', monospace;
    font-size: 16px;
    line-height: 1.6;
    color: white;
  }

  body {
    height: 100%;
    margin: 0;
  }

  #app {
    font-family: 'MisakiGothic', monospace;
    height: 100%;
    background-color: black;
  }

.game-wrapper {
  position: relative;
  background-color: black;
  margin: 0 auto;
  width: 80%;
  height: 60vh;
  padding: 20px;
  background-image: url('https://i.gyazo.com/885cc2c4ae29f74b1390a750087a0967.jpg');
  background-repeat: repeat-x;
  background-size: auto 100%; 
  background-position: center top;
  font-family: sans-serif;
}

.character {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%); 
  z-index: 10;
}

.character img {
  width: 300px;
  height: auto;
}

  .dialog {
    position: fixed;
    bottom: 84px;
    left: 10%;
    height: 20%;
    width: 80%;
    box-shadow: 0 -1px 4px black;
    z-index: 1000;
    border: solid white;
    border-radius: 6px;
    background-color: black;
  }

  .speaker {
    font-family: 'MisakiGothic', monospace;
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
    font-family: 'MisakiGothic', monospace;
    font-size: 12px;
    float: right;
    width: 200px;
    margin-bottom: 10px;
    opacity: 1;
  }

  .table {
    background-color: black;
    color: white;
    border: solid 3px white;
    border-radius: 5px;
  }

  .table td,
  .table th {
    margin: 10px;
    width: 20%;
    padding: 5px;
  }
</style>