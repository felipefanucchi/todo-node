<template>
  <div class="project">
    <v-card elevation="2">
      <v-card-title>
        <div class="flex-fill">
          <v-icon>
            mdi-pin-outline
          </v-icon>
          {{ data.name }}
        </div>
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="red darken-2">
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
              <v-btn color="primary white--text" @click="dialog = false">
                No
              </v-btn>
              <v-btn text @click="() => removeProject(data.id)">
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <template v-if="data.Tasks.length">
          <template v-if="data.Tasks.filter(task => !task.completed).length">
            TODO
            <v-list-item-group v-model="settings" multiple>
              <task
                v-for="(task, index) in data.Tasks.filter(
                  task => !task.completed
                )"
                :data="task"
                :projectId="data.id"
                :key="index"
                @taskDeleted="updateRemovedTasks"
                @taskEdited="updatedEditedTasks"
              ></task>
            </v-list-item-group>
          </template>
          <template v-if="data.Tasks.filter(task => task.completed).length">
            DONE
            <v-list-item-group
              v-model="settings"
              multiple
              v-if="data.Tasks.filter(task => task.completed).length"
            >
              <task
                v-for="(task, index) in data.Tasks.filter(
                  task => task.completed
                )"
                :data="task"
                :projectId="data.id"
                :key="index"
                @taskDeleted="updateRemovedTasks"
                @taskEdited="updatedEditedTasks"
              ></task>
            </v-list-item-group>
          </template>
        </template>
        <create-task
          @taskCreated="updatedCreatedTasks"
          :projectId="data.id"
        ></create-task>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  },

  data() {
    return {
      settings: [],
      dialog: null,
      console: window.console
    };
  },

  methods: {
    async removeProject(id) {
      try {
        await this.$axios.delete(`project/${id}`);

        this.$notifier.showMessage({
          content: "Project deleted",
          color: "primary"
        });

        this.dialog = false;

        this.$emit("projectDeleted", { id });
      } catch (e) {
        console.log(e);
        this.$notifier.showMessage({
          content: e.response.data.message,
          color: "error"
        });
      }
    },

    updateRemovedTasks({ id }) {
      this.data.Tasks = this.data.Tasks.filter(item => item.id !== id);
    },

    updatedCreatedTasks({ task }) {
      this.data.Tasks.push(task);
    },

    updatedEditedTasks({ task }) {
      console.log(task);
      this.data.Tasks = this.data.Tasks.filter(item => item.id !== task.id);

      this.data.Tasks.push(task);
    }
  }
};
</script>
