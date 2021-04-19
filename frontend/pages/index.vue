<template>
  <v-container>
    <v-row justify="center" align="start">
      <v-col cols="12" sm="4" xl="3">
        <new-project @projectCreated="updateCreatedProjects"></new-project>
      </v-col>
      <v-col cols="12" sm="8" xl="9">
        <projects
          @projectDeleted="udpateDeletedProjects"
          :items="projects"
          :loading="loading"
        ></projects>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head: {
    title: "Dashboard"
  },

  data() {
    return {
      loading: true
    };
  },

  async asyncData({ $axios }) {
    const projects = await $axios.$get("dashboard");
    const loading = false;
    return { projects, loading };
  },

  methods: {
    updateCreatedProjects({ project }) {
      this.projects.push(project);
    },

    udpateDeletedProjects(id) {
      this.projects = this.projects.filter(project => project.id !== id);
    }
  }
};
</script>
