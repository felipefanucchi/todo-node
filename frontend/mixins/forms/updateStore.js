export default {
  data () {
    return {
      fields: [
        {
          label: 'Dados do proprietário',
          type: 'title',
          cols: 12
        },
        {
          name: 'name',
          label: 'Nome',
          disabled: true,
        },
        {
          name: 'email',
          label: 'E-mail',
          disabled: true,
        },
        {
          name: 'phone',
          label: 'Telefone',
          disabled: true,
          mask: '(##) #####-###?#'
        },
        {
          name: 'document',
          label: 'CPF',
          disabled: true,
          mask: '###.###.###-##'
        },
        {
          label: 'Dados da loja',
          type: 'title',
          cols: 12
        },
        {
          name: 'store_name',
          label: 'Nome',
          rules: ['required'],
        },
        {
          name: 'store_phone',
          label: 'Telefone',
          rules: ['required', 'phone'],
          mask: '(##) #####-###?#'
        },
        {
          name: 'city_id',
          type: 'state_city',
          cols: '12',
          rules: ['required']
        },
        {
          name: 'address',
          label: 'Logradouro',
          rules: ['required'],
        },
        {
          name: 'zipcode',
          label: 'CEP',
          rules: ['required', 'zipcode'],
          mask: '#####-###'
        },
        {
          name: 'color_primary',
          label: 'Cor primária',
          type: 'color-picker',
          rules: ['required'],
        },
        {
          name: 'color_secondary',
          label: 'Cor secundária',
          type: 'color-picker',
          rules: ['required'],
        },
        {
          name: 'logo',
          label: 'Logo',
          type: 'image',
        },
      ]
    }
  },

  methods: {
    beforeSubmit (formData) {
      formData.store_phone = formData.store_phone.replace(/\D/g, '')
      formData.zipcode = formData.zipcode.replace(/\D/g, '')
      formData.colors = `${formData.color_primary},${formData.color_secondary}`
      formData.city_id = formData.city_id.city_id
      delete formData.color_primary
      delete formData.color_secondary
      return formData
    },

    beforeLoadData (formData) {
      // Store data
      const colors = formData.colors.split(',')
      formData.color_primary = colors[0]
      formData.color_secondary = colors[1]

      formData.store_name = formData.name
      delete formData.name

      formData.store_phone = formData.phones[0].number
      delete formData.phones

      // Owner data
      formData.name = formData.users[0].name
      formData.email = formData.users[0].email
      formData.document = formData.users[0].document
      formData.phone = formData.users[0].phones[0].number

      const address = Object.assign({}, formData.address)
      delete formData.address
      formData.address = address.address
      formData.zipcode = address.zipcode
      formData.city_id = { city_id: address.city_id, state_id: address.city ? address.city.state_id : '' }

      return formData
    }
  }
}