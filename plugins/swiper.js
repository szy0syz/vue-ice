import Vue from 'vue'

// you can see more in https://github.com/surmon-china/vue-awesome-swiper

// If used in nuxt.js/ssr, you should keep it only in browser build environment
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}
