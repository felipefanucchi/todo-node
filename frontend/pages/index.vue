<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <granito-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to our platform
        </v-card-title>
        <v-card-text>
          <p>Create your first project</p>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/project"
          >
            Let's go
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '../components/Logo.vue'

export default {
  components: {
    Logo
  },

  head: {
    title: 'Dashboard'
  },
}
</script>
