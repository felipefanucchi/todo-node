<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          {{ titleFormatted }}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          {{ formData }}
          <form-generator
            :fields="fields"
            :form="formData"
            :loading="loading"
            @submit="submit"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import FormGenerator from '~/components/FormGenerator'

export default {
  components: { FormGenerator },

  props: [
    'title',
    'type',
    'folder',
    'fields',
    'endpoint',
    'beforeSubmit',
    'beforeLoadData'
  ],

  data () {
    return {
      loading: false,
      method: 'post',
      formData: {},
      requestHeaders: {}
    }
  },

  head () {
    return {
      title: this.titleFormatted,
    }
  },

  mounted () {
    if (this.type !== 'create') {
      this.getFormData()
    }
  },

  computed: {
    titleFormatted () {
      return (this.type === 'create' ? 'Adicionar' : 'Editar') + ' ' + this.title
    }
  },

  methods: {
    async submit (form) {
      this.loading = true

      try {
        let formData = Object.assign({}, form)
        
        if (this.beforeSubmit) {
          formData = this.beforeSubmit(formData)
        }

        let formDataInstance = new FormData()

        for (const key in formData) {
          formDataInstance.append(key, formData[key])
        }

        const uploadFields = this.fields.filter((field) => {
          ['image'].includes(field.type)
        })
        
        if (uploadFields) {
          this.requestHeaders = {
            header: {
              'Content-Type': 'multipart/form-data',
            }
          }
        }

        if (this.type !== 'create') {
          await this.$axios.put(
            `/${this.endpoint}/${formData.id}`,
            formDataInstance,
            this.requestHeaders
          )
        } else {
          await this.$axios.post(
            `/${this.endpoint}`,
            formData,
            this.requestHeaders
          )
        }

        this.$root.$notifier.showMessage({
          content: this.title.charAt(0).toUpperCase() + this.title.slice(1) + ' salvo(a)',
          color: 'success'
        })

        this.$router.push(`/${this.folder}`)
      } catch (e) {
        console.log(e)
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
    },
    async getFormData () {
      const form = await this.$axios.$get(`${this.endpoint}/${this.$route.params.id}`)
        .then((res) => res)

      let formData = Object.assign({}, form)

      if (this.beforeLoadData) {
        formData = this.beforeLoadData(formData)
      }

      this.formData = formData
    },
  }
};
</script>
