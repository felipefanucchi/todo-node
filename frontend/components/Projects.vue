<template>
  <div class="projects">
    <v-row>
      <template v-if="loading">
        <v-col
          v-for="(item, index) in skeleton.quantity"
          :key="index"
          cols="12"
          md="6"
        >
          <v-card elevation="2">
            <v-skeleton-loader
              type="table-heading, list-item-two-line"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </template>

      <template v-if="!loading && items.length">
        <v-col v-for="(project, index) in items" :key="index" cols="12" md="6">
          <project @projectDeleted="updateProjects" :data="project"></project>
        </v-col>
      </template>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
    loading: Boolean
  },

  data() {
    return {
      skeleton: {
        quantity: new Array(4)
      }
    };
  },

  methods: {
    updateProjects({ id }) {
      this.items = this.items.filter(item => item.id !== id);

      this.$emit("projectDeleted", id);
    }
  }
};
</script>
