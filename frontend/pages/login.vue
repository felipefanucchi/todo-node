<template>
  <v-row justify="center" align="center" class="login-container">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card>
        <v-card-subtitle class="pb-0">
          Welcome to
        </v-card-subtitle>
        <v-card-title class="headline pt-0">
          <strong class="primary--text">TODONODE</strong>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submit">
            <v-text-field
              v-model="form.email"
              label="E-mail"
              type="email"
              :rules="[...validations.required, ...validations.email]"
              required
            />
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              :rules="validations.required"
              required
            />
            <div class="text-center">
              <v-btn type="submit" color="primary" large :disabled="loading">
                Login
              </v-btn>
              <v-btn text>
                <NuxtLink to="/register">Register</NuxtLink>
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import validations from "~/mixins/validations";
import Logo from "~/components/Logo";

export default {
  layout: "guest",

  components: {
    Logo
  },

  head: {
    title: "Login"
  },

  mixins: [validations],

  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      loading: false
    };
  },

  methods: {
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },

    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;

      try {
        const response = await this.$auth.loginWith("local", {
          data: this.form
        });

        console.log(response);
      } catch (e) {
        console.log(e);
        this.$notifier.showMessage({
          content: e.response.data.message,
          color: "error"
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped>
.login-container {
  min-height: 90vh;
}
</style>
