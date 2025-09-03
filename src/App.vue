<template>
  <v-app class="app-background">

    <v-app-bar app color=black dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="" transition="scale-transition" width="108" />

      </div>

      <v-spacer></v-spacer>

      <v-btn text to="/" tag="router-link">チャット</v-btn>
      <v-btn text to="/inout" tag="router-link">ステータス</v-btn>
      <v-btn text to="/index" tag="router-link">ログイン</v-btn>
      <v-btn color="black" @click="saveData">セーブ</v-btn>
      <v-btn @click="playBGM">Play</v-btn>
      <audio ref="bgm" :src="bgmUrl" loop autoplay></audio>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      bgmUrl: "https://www.woodus.com/den/gallery/graphics/dq3snes/mp3/34%20Dragon%20Quest%203%20-%20Unknown%20World.mp3",
    }),
    methods: {
      async saveData() {
        await this.$store.dispatch("status/saveData", {});
      },
      async playBGM() {
        const bgm = this.$refs.bgm;
        bgm.volume = 1;
        bgm.play();
      }
    },
  };
</script>
<style>
  .app-background {
    background-color: #000000;
    color: white;
    min-height: 100vh;
  }
</style>