<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          Adicionar colaborador
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submit">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.name"
                  label="Nome"
                  :rules="validations.required"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.email"
                  label="E-mail"
                  type="email"
                  :rules="[...validations.required, ...validations.email]"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.document"
                  label="CPF"
                  v-mask="'###.###.###-##'"
                  :rules="[...validations.required, ...validations.cpf]"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.phone"
                  label="Telefone"
                  v-mask="'(##) #####-###?#'"
                  :rules="validations.phone"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :items="stores"
                  v-model="form.store_id"
                  :rules="validations.required"
                  label="Loja"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :items="roles"
                  v-model="form.role_id"
                  :rules="validations.required"
                  label="Função"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.password"
                  label="Senha"
                  type="password"
                  :rules="[...validations.required, ...validations.password]"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.confirmPassword"
                  label="Confirmar senha"
                  type="password"
                  :rules="[v => {
                    v = typeof v === undefined ? '' : v
                    return v == this.form.password || 'Confirmação não confere'
                  }]"
                  required
                />
              </v-col>
            </v-row>
            
            <div class="text-right">
              <v-btn
                class="mr-4"
                color="warning"
                @click="reset"
                large
                :disabled="loading"
              >
                Limpar
              </v-btn>
              <v-btn
                type="submit"
                color="success"
                large
                :disabled="loading"
              >
                Salvar
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import validations from '~/mixins/validations'

export default {
  mixins: [validations],

  head: {
    title: "Adicionar colaborador",
  },

  async asyncData ({ $axios }) {
    let roles = []
    await $axios.$get('roles/').then((res) => {
      roles = res.map((role) => {
        return { text: role.name, value: role.id }
      })
    })

    let stores = []
    await $axios.$get('stores/').then((res) => {
      stores = res.data.map((store) => {
        return { text: store.store_name, value: store.id }
      })
    })

    return { roles, stores }
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        document: '',
        role_id: '',
        password: '',
        confirmPassword: ''
      },
      roles: [],
      stores: [],
      loading: false,
    };
  },

  methods: {
    reset () {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    async submit () {
      if (!this.$refs.form.validate()) {
        return
      }

      this.loading = true

      try {
        const formData = Object.assign({}, this.form);
        formData.document = formData.document.replace(/\D/g, '')
        formData.phones = [{ number: formData.phone.replace(/\D/g, '') }]
        delete formData.phone
        await this.$axios.post(`/users`, formData)

        this.$root.$notifier.showMessage({
          content: 'Colaborador criado',
          color: 'success'
        })

        this.$router.push('/colaboradores')
      } catch (e) {
        console.log(e.response.data, e.response.constructor)
        if (e.response.data.constructor !== Array) {
          this.$notifier.showMessage({
            content: e.response.data.message,
            color: 'error'
          })

          return
        }

        e.response.data.forEach((response) => {
          this.$notifier.showMessage({
            content: response.message,
            color: 'error'
          })
        })
      } finally {
        this.loading = false
      }
    }
  }
};
</script>
