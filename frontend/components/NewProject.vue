<template>
  <v-form @submit.prevent="submit" ref="form" v-if="form">
    <v-card elevation="2">
      <v-card-title>
        <v-icon>
          mdi-calendar-check
        </v-icon>
        New project
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="form.projectName"
          placeholder="e.g 'Company'"
          label="Project Name"
          required
          :rules="[...validations.required]"
        ></v-text-field>
        <v-btn type="submit" depressed color="primary">Create</v-btn>
      </v-card-text>
    </v-card>
  </v-form>
</template>
<script>
import validations from "~/mixins/validations";

export default {
  data() {
    return {
      isValid: false,
      form: {
        projectName: ""
      }
    };
  },

  mixins: [validations],

  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;

      try {
        const name = this.form.projectName;
        const response = await this.$axios.post("project", { name });

        this.$notifier.showMessage({
          content: "Project created",
          color: "primary"
        });

        this.$emit("projectCreated", { project: response.data });
        this.$refs.form.reset();
      } catch (e) {
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
