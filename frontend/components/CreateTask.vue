<template>
  <div class="create-task">
    <v-btn
      class="mt-4 mb-2"
      type="submit"
      text
      @click="showCreateForm = !showCreateForm"
      >Create a task</v-btn
    >
    <task-form
      :data="form"
      @submit="data => submit(data)"
      v-if="showCreateForm"
    ></task-form>
  </div>
</template>
<script>
import validations from "~/mixins/validations";
export default {
  props: {
    projectId: Number
  },

  data() {
    return {
      isValid: false,
      form: {
        description: "",
        finishDate: ""
      },
      date: "",
      showCreateForm: false,
      menu: null,
      dialog: null
    };
  },

  mixins: [validations],

  methods: {
    async submit({ description, finishDate }) {
      try {
        const response = await this.$axios.post("task", {
          description,
          finishDate,
          projectId: this.projectId
        });

        this.$notifier.showMessage({
          content: "Task created",
          color: "primary"
        });

        this.$emit("taskCreated", { task: response.data });
      } catch (e) {
        this.$notifier.showMessage({
          content: e.response.data.message,
          color: "error"
        });
      }
    }
  }
};
</script>
