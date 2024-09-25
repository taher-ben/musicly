import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage } from 'vee-validate'
import {
  required,
  min,
  max,
  email,
  alpha_spaces as alpha_spaces,
  max_value as maxVal,
  min_value as minVal,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'
export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)
    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_Value', maxVal)
    defineRule('confirmed', confirmed)
    defineRule('excluded', excluded)
  }
}
