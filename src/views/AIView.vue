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
          <v-container> {{ currentLine ? currentLine.speaker : '' }} </v-container>
        </div>
        <v-container style="color:white" @click="nextLine">
          <div id="ityped"></div>

        </v-container>
      </div>

      <div class="character">
        <img :src="currentImage" />
      </div>

      <div v-for="(m, i) in messages" :key="i" class="mb-2 mt-2 d-flex" :class="{'justify-end': m.role==='user', 'justify-start': m.role==='bot'}">
        <v-sheet :class="[message.role === 'user' ? 'indigo lighten-5' : 'grey lighten-3', 'pa-3', 'rounded-lg']" elevation="1" max-width="60%">
          <div class="text-pre-line">{{ m.text }}</div>
        </v-sheet>
      </div>
    </v-container>

    <div class="bottom-space">余白</div>

    <div class="chat-input-bar">
      <v-container class="pa-3">
        <v-row no-gutters>
          <v-col cols="10">
            <v-textarea v-model="message" placeholder="メッセージを入力..." auto-grow rows="1" outlined hide-details rounded></v-textarea>
          </v-col>
          <v-col cols="2" class="pl-2">
            <v-btn color="" block class="mt-2" @click="sendMessage">送信</v-btn>
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
        imageURL: 0,
        imageList: [
          "https://i.gyazo.com/98ada2c0b6aebb3e448b68c0fe85116c.png",
          "https://i.gyazo.com/9e8ddea5620600ece10d9e02c27ba4ba.png",
          "https://i.gyazo.com/4cc6325713e327f87be71e61dfe9e2e5.png",
          "https://i.gyazo.com/f060e5b78f97c2d511eeda761170f5d6.png",
          "https://i.gyazo.com/2928c506f7c613c70d32eb1d8469fd1a.png",
          "https://i.gyazo.com/020bdd6f54b4ffd3c24804ae3535f901.png"
        ]
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
      }
    },
    methods: {
      startTyping() {
        const textBox = document.querySelector("#ityped");
        if (!textBox || this.typing == true) return;
        const text = this.currentLine ? this.currentLine.text : "";
        textBox.innerHTML = "";
        console.log("default:" + this.typing);
        this.typing = true;
        console.log("after:" + this.typing);
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
        if (this.lastLine) {
          console.log("nextline:" + this.typing);
          this.$store.commit("player/nextLine");
          this.$nextTick(this.startTyping);
          console.log("nextline2:" + this.typing);
        } else {
          const ev = this.player.currentEventId + 1;
          this.$store.commit("player/setProgress", {
            eventId: ev,
            seq: 0
          });
          await this.$store.dispatch("player/loadEvent");
          this.$nextTick(this.startTyping);
          console.log(this.typing);
        }
      },
      async sendMessage() {
        const trimmed = (this.message || "").trim();
        const eventTitle = "1+1=?";
        if (!trimmed) return;
        const send = eventTitle + "\n" + trimmed;
        this.messages.push({
          role: "user",
          text: send
        });
        this.message = "";
        try {
          const resp = await axios.post(
            "https://m3h-rintarootsuka-0730.azurewebsites.net/api/OpenAI?", {
              message: send
            }
          );
          const contentText = resp.data.Content[0].Text;
          const parsed = JSON.parse(contentText);
          this.$store.commit("player/addParams", {
            p1: Number(parsed.Intelligence) || 0,
            p2: Number(parsed.Vitality) || 0,
            p3: Number(parsed.Empathy) || 0
          });
          this.messages.push({
            role: "bot",
            text: "Parameter1: " + (parsed.Intelligence || 0)
          });
          this.messages.push({
            role: "bot",
            text: "Parameter2: " + (parsed.Vitality || 0)
          });
          this.messages.push({
            role: "bot",
            text: "Parameter3: " + (parsed.Empathy || 0)
          });
        } catch (e) {
          console.error(e);
          this.messages.push({
            role: "bot",
            text: "評価に失敗しました。"
          });
        }
      }
    },
    mounted: async function() {
      await this.$store.dispatch("player/loadPlayer");
      await this.$store.dispatch("player/loadEvent");
      this.startTyping();
      const self = this;
      setInterval(function() {
        self.imageURL = (self.imageURL + 1) % self.imageList.length;
      }, 80);
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

  .game-wrapper {
    position: relative;
    background-color: black;
    margin: 0 10%;
    width: 80%;
    height: 50%;
    padding: 20px 20px 0 20px;
    margin-bottom: 100px;
    background-image: url('https://i.gyazo.com/885cc2c4ae29f74b1390a750087a0967.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: top;
    font-family: sans-serif;
  }

  .bottom-space {
    background-color: white;
    text-align: center;
    position: absolute;
    bottom: 0px;
    color: black;
    padding-top: 75px;
    height: 190px;
    width: 100%;
    opacity: 0
  }

  .character {
    opacity: 1;
    position: absolute;
    bottom: 25%;
  }

  .character img {
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
    margin-left: 35%;
    width: 50%;
    height: auto;
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