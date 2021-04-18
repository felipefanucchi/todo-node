<template>
  <v-row justify="center" align="center" class="login-container">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card>
        <v-card-subtitle class="pb-0">
          Register today to have access to our platform
        </v-card-subtitle>
        <v-card-title class="headline pt-0">
          <strong class="success--text">TODONODE</strong>
        </v-card-title>
        <v-card-text>
          <v-form
            v-if="!accountCreated"
            ref="form"
            @submit.prevent="submit"
          >
            <v-row>
              <v-col col="6">
                <v-text-field
                  v-model="form.firstName"
                  label="First Name"
                  type="text"
                  :rules="[...validations.required]"
                  required
                />
              </v-col>

              <v-col col="6">
                <v-text-field
                  v-model="form.lastName"
                  label="Last Name"
                  type="text"
                  :rules="[...validations.required]"
                  required
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="form.email"
              label="email"
              type="email"
              :rules="[...validations.required]"
              required
            />
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              :rules="[...validations.required, ...validations.password]"
              required
            />
            <v-text-field
              v-model="form.confirmPassword"
              label="Confirm your password"
              type="password"
              :rules="[
                (v) => {
                  v = !v ? '' : v;
                  return v == this.form.password || 'Password doesn\'t match';
                },
              ]"
              required
            />
            <div class="text-center">
              <v-btn
                class="mr-4"
                type="submit"
                color="success"
                large
                :disabled="loading"
              >
                Register
              </v-btn>
                <v-btn text>
                <NuxtLink to="/login">Login</NuxtLink>
              </v-btn>
            </div>
          </v-form>
          <div v-else-if="accountCreated">
            <v-alert type="success">
              Your account was created with success
              <NuxtLink to="/login" class="white--text"
                >Back to login</NuxtLink
              >
            </v-alert>
          </div>
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
  auth: false,

  components: {
    Logo,
  },

  head: {
    title: "Register Account",
  },

  mixins: [validations],

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      loading: false,
      hasParams: false,
      accountCreated: false,
    };
  },

  methods: { 
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;

      try {
        const password = this.form.password;
        const firstName = this.form.firstName
        const lastName = this.form.lastName
        const email = this.form.email

        await this.$axios.post("user", {
          firstName,
          lastName,
          email,
          password,
        });

        this.accountCreated = true;
      } catch (e) {
        console.log(e)
        this.$notifier.showMessage({
          content: e.response.data.message,
          color: "error",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
.login-container {
  min-height: 90vh;
}
</style>
