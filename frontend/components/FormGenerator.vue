<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-row>
      <v-col cols="12" :md="field.cols ? field.cols : '6'"
        :key="fieldIndex" v-for="(field, fieldIndex) in fields">
        <!-- Color picker -->
        <div v-if="field.type === 'color-picker'">
          <label>
            {{ field.label }}
            <span v-if="field.rules && field.rules.includes('required')" class="red--text">*</span>
          </label>
          <v-color-picker
            v-model="form[field.name]"
            :disabled="field.disabled"
          ></v-color-picker>
        </div>
        <!-- Imagem -->
        <div v-else-if="field.type === 'image'">
          <label>
            {{ field.label }}
            <span v-if="field.rules && field.rules.includes('required')" class="red--text">*</span>
          </label>
          <v-file-input
            v-model="form[field.name]"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Selecione uma imagem"
            prepend-icon="mdi-camera"
            :rules="formatValidations(field.rules)"
            :disabled="field.disabled"
          ></v-file-input>
          <v-img v-if="form[field.name]"
            :src="getImageUrl(form[field.name])"
            max-width="100%"
            height="180"
            contain
            alt="Logo da loja"/>
        </div>
        <!-- Título -->
        <h2 v-else-if="field.type === 'title'">{{ field.label }}</h2>
        <!-- Select -->
        <v-select
          v-else-if="field.type === 'select'"
          v-model="form[field.name]"
          :items="field.options"
          :label="field.label"
          :disabled="field.disabled"
          :rules="formatValidations(field.rules)"
        ></v-select>
        <!-- State and City -->
        <div v-else-if="field.type === 'state_city'">
          {{ form[field.name] }}
          <state-city
            v-model="form[field.name]"
            :rules="formatValidations(field.rules)"
            />
        </div>
        <!-- Texto -->
        <v-text-field
          v-else
          v-model="form[field.name]"
          :type="field.type ? field.type : 'text'"
          :label="field.label"
          :disabled="field.disabled"
          :rules="formatValidations(field.rules)"
          v-mask="field.mask"
        >
          <template slot="label">
            {{field.label}}
            <span v-if="field.rules && field.rules.includes('required')" class="red--text">*</span>
          </template>
        </v-text-field>
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
</template>
<script>
import validations from '~/mixins/validations'

export default {
  props: [
    'fields',
    'form',
    'loading'
  ],

  data () {
    return {
      imagesUrl: process.env.imagesUrl,
    }
  },

  mixins: [validations],

  methods: {
    formatValidations (rules) {
      let validationRules = []

      if (!rules) {
        return validationRules
      }

      rules.forEach((rule) => {
        let ruleParam = ''

        if (rule.includes(':')) {
          const ruleFunction = rule.split(':')
          rule = ruleFunction[0]
          ruleParam = ruleFunction[1]
        }

        if (this.validations[rule]) {
          if (rule === 'confirm') {
            validationRules.push(this.validations[rule](this.form[ruleParam]))
          } else {
            validationRules.push(...this.validations[rule])
          }
        }
      })

      return validationRules
    },

    getImageUrl (image) {
      if (!image) return

      if (typeof image === 'object') {
        return URL.createObjectURL(image)
      }

      return this.imagesUrl + image
    },

    reset () {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },

    submit () {
      if (!this.$refs.form.validate()) {
        return
      }

      this.$emit('submit', this.form)
    }
  }
}
</script>
