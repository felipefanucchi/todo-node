<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          Colaboradores
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
            <v-btn to="/colaboradores/adicionar" color="success">Adicionar</v-btn>
          </div>
          <v-data-table
            :headers="headers"
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
            <template v-slot:item.stores="{ item }">
              {{ !item.stores.length ? '-' : item.stores.map((store) => store.name).join() }}
            </template>
            <template v-slot:item.active="{ item }">
              {{ item.active === 1 ? 'Ativo' : 'Aguardando ativação' }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn color="primary" :to="'/colaboradores/' + item.id">
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
  head: {
    title: "Colaboradores",
  },

  data() {
    return {
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: 'Loja', value: 'stores' },
        { text: 'Função', value: 'role.name' },
        { text: 'Ativo', value: 'active' },
        { text: 'Ações', value: 'actions' }
      ],
      pagination: {
        page: 1,
        perPage: 10,
      },
      search: '',
      searchTimer: null,
      loading: false,
      dialogDelete: false,
    };
  },

  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      this.loading = true

      const queryString = new URLSearchParams({
        page: this.pagination.page,
        perPage: this.pagination.perPage,
        filter: this.search
      }).toString();

      await this.$axios.$get(`users/?${queryString}`)
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
      this.$axios.delete(`users/${this.editedItem.id}`)
        .then((res) => {
          this.$root.$notifier.showMessage({
            content: 'Colaborador removido',
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
