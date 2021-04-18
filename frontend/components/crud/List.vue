<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          {{ title }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <div class="text-right">
            <v-btn :to="`/${folder}/adicionar`" color="success">Adicionar</v-btn>
          </div>
          <v-data-table
            :headers="headersWithActions"
            :loading="loading"
            :items="pagination.data"
            :items-per-page="pagination.perPage"
            :server-items-length="pagination.total"
            :page="pagination.page"
            @update:items-per-page="updatePerPage"
            @update:page="updatePage"
            disable-sort
            loading-text="Carregando... Por favor aguarde"
            no-data-text="Nenhum dado encontrado"
            :footer-props="{
              'items-per-page-text':'Itens por página',
              'items-per-page-options':[10,20,30],
              'page-text':'{0}-{1} de {2}'
            }"
          >
            <slot></slot>
            <template v-slot:item.actions="{ item }">
              <v-btn color="primary" :to="`/${folder}/${item.id}`">
                <v-icon small>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn color="error" @click="deleteItem(item)">
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>Tem certeza de que deseja remover este item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">
            Prosseguir
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: [
    'folder',
    'title',
    'endpointBase',
    'headers',
  ],

  data () {
    return {
      pagination: {
        page: 1,
        perPage: 10,
      },
      search: '',
      searchTimer: null,
      loading: false,
      dialogDelete: false,
    }
  },

  head () {
    return {
      title: this.title
    }
  },

  mounted () {
    this.loadData()
  },

  computed: {
    headersWithActions () {
      const headers = this.headers
      headers.push({ text: 'Ações', value: 'actions' })
      return headers
    }
  },

  methods: {
    async loadData () {
      this.loading = true

      const queryString = new URLSearchParams({
        page: this.pagination.page,
        perPage: this.pagination.perPage,
        filter: this.search
      }).toString()

      await this.$axios.$get(`${this.endpointBase}/?${queryString}`)
        .then((res) => {
          this.pagination = res
        }).finally(() => {
          this.loading = false
        })
    },

    async updatePerPage (perPage) {
      this.pagination.perPage = perPage 
      await this.loadData()
    },

    async updatePage (page) {
      this.pagination.page = page
      await this.loadData()
    },

    deleteItem (item) {
      this.editedItem = item
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$axios.delete(`${this.endpointBase}/${this.editedItem.id}`)
        .then((res) => {
          this.$root.$notifier.showMessage({
            content: `${this.title} removido(a)`,
            color: 'success'
          })

          this.pagination.page = 1
          this.loadData()
        }).finally(() => {
          this.dialogDelete = false
        })
    },
  },

  watch: {
    search: {
      handler () {
        clearTimeout(this.searchTimer)

        this.searchTimer = setTimeout(async () => {
          await this.loadData()
        }, 800)
      }
    }
  }
};
</script>
