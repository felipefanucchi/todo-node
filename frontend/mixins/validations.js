export default {
  data () {
    return {
      validations: {
        required: [
          value => !!value || 'Field is required'
        ],
        email: [
          value => (!value || /.+@.+\..+/.test(value)) || 'Must be an valid email'
        ],
        password: [
          value => (!value || value.length >= 6) || 'Password must have at least 6 characters'
        ],
        confirm (verification) {
          return value => value === verification || 'Confirmação não confere'
        }
      }
    }
  }
}
