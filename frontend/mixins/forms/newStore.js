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
          rules: ['required'],
        },
        {
          name: 'email',
          label: 'E-mail',
          rules: ['required', 'email'],
        },
        {
          name: 'phone',
          label: 'Telefone',
          rules: ['required', 'phone'],
          mask: '(##) #####-###?#'
        },
        {
          name: 'document',
          label: 'CPF',
          rules: ['required', 'cpf'],
          mask: '###.###.###-##'
        },
        {
          name: 'password',
          label: 'Senha',
          type: 'password',
          rules: ['required', 'password'],
        },
        {
          name: 'confirm_password',
          label: 'Confirmação da senha',
          type: 'password',
          rules: ['confirm:password'],
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
          rules: ['required'],
        },
      ]
    }
  },

  methods: {
    beforeSubmit (formData) {
      formData.phones = [formData.phone.replace(/\D/g, '')]
      delete formData.phone
      formData.document = formData.document.replace(/\D/g, '')
      formData.store_phone = formData.store_phone.replace(/\D/g, '')
      formData.zipcode = formData.zipcode.replace(/\D/g, '')
      formData.colors = `${formData.color_primary.hex},${formData.color_secondary.hex}`
      delete formData.color_primary
      delete formData.color_secondary
      return formData
    },
  }
}