import { defineNuxtPlugin } from '#app'
import { configure } from 'vee-validate'

export default defineNuxtPlugin(() => {
  configure({
    validateOnInput: true,
    validateOnChange: true,
    validateOnBlur: true
  })
})
