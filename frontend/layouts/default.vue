<template>
  <v-app dark>
    <v-app-bar color="primary" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div class="mr-3 white--text">Hello, {{ $auth.user.firstName }}!</div>
      <v-btn @click="logout">
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <Snackbar></Snackbar>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "~/components/Snackbar.vue";

export default {
  components: { Snackbar },

  data() {
    return {
      title: ""
    };
  },

  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>
