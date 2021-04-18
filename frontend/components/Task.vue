<template>
  <v-list-item
    @click="
      () =>
        editTask({
          description: data.description,
          finishDate: data.finishDate,
          completed: !data.completed,
          createdAt: data.createdAt
        })
    "
  >
    <template>
      <v-list-item-action>
        <v-checkbox :input-value="data.completed"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-title v-bind="attrs" v-on="on">
              {{ data.description }}
            </v-list-item-title>
          </template>
          Created date:
          {{
            new Date(data.createdAt)
              .toLocaleString()
              .split(" ")
              .splice(0, 1)
              .join("")
          }}
          <br />
          End date:
          {{
            new Date(data.finishDate)
              .toLocaleString()
              .split(" ")
              .splice(0, 1)
              .join("")
          }}
        </v-tooltip>
      </v-list-item-content>
      <v-dialog
        v-model="dialogEdit"
        persistent
        max-width="650"
        v-if="!data.completed"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" class="mr-4">
            mdi-pencil
          </v-icon>
        </template>
        <v-card>
          <v-card-title class="headline mb-4">
            Editing
          </v-card-title>
          <v-card-text>
            <task-form
              :data="data"
              @submit="data => editTask(data)"
            ></task-form>
            <v-btn color="primary white--text mt-4" @click="dialogEdit = false">
              Close
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogRemove"
        persistent
        max-width="290"
        v-if="!data.completed"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">
            mdi-trash-can-outline
          </v-icon>
        </template>
        <v-card>
          <v-card-title class="headline">
            Are you sure?
          </v-card-title>
          <v-card-text>You'll not able to recover this</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary white--text" @click="dialogRemove = false">
              No
            </v-btn>
            <v-btn text @click="() => removeTask(data.id)">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-list-item>
</template>
<script>
export default {
  props: {
    data: Object,
    projectId: Number
  },

  data() {
    return {
      dialogEdit: null,
      dialogRemove: null,
      active: false
    };
  },

  methods: {
    async removeTask(id) {
      try {
        await this.$axios.delete(`task/${id}`);

        this.$notifier.showMessage({
          content: "Task deleted",
          color: "primary"
        });

        this.dialogRemove = false;

        this.$emit("taskDeleted", { id });
      } catch (e) {
        this.$notifier.showMessage({
          content: e.response.data.message,
          color: "error"
        });
      }
    },

    async editTask({ description, finishDate, completed = false, createdAt }) {
      try {
        const task = {
          description,
          finishDate,
          completed,
          projectId: this.projectId,
          createdAt
        };

        await this.$axios.put(`task/${this.data.id}`, task);

        this.$notifier.showMessage({
          content: "Task updated",
          color: "primary"
        });

        this.dialogEdit = false;

        Object.assign(task, {
          id: this.data.id
        });

        this.$emit("taskEdited", { task });
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
