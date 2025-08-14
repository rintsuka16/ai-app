
<template>
  <v-app>
    <v-app-bar
      app
      color= #cc2988
      light
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://i.gyazo.com/12213166757a7551808fbd6fd409c97c.png"
          transition="scale-transition"
          width="108"
        />


      </div>

      <v-spacer></v-spacer>

      <v-btn text to="/" tag="router-link">一覧を表示する</v-btn>
      <v-btn text to="/%E5%8F%8E%E5%85%A5%E5%85%A5%E5%8A%9B" tag="router-link">家計簿に追加する</v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

};
</script>
