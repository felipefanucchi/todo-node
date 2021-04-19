<template>
  <v-form ref="form">
    <v-divider class="pb-3"></v-divider>
    <v-row align="center">
      <v-col cols="12" xl="6">
        <v-text-field
          v-model="data.description"
          prepend-icon="mdi-card-text-outline"
          placeholder="e.g 'Buy two orange juice'"
          label="Description"
          required
          :rules="[...validations.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" xl="5">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="data.finishDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="data.finishDate"
              label="Finish Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              required
              :rules="[...validations.required]"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="data.finishDate"
            no-title
            :min="toDate()"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(data.finishDate)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" xl="1">
        <v-icon
          color="green"
          @click="
            () => {
              if (!$refs.form.validate()) return;

              $emit('submit', data);

              $refs.form.reset();
            }
          "
        >
          mdi-check
        </v-icon>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import validations from "~/mixins/validations";
export default {
  props: {
    data: Object
  },

  data() {
    return {
      menu: null
    };
  },

  mixins: [validations],

  methods: {
    toDate() {
      const dateInArray = new Date().toLocaleDateString().split("/");
      const [day, month, year] = dateInArray;
      return `${year}-${month}-${day}`;
    }
  }
};
</script>
