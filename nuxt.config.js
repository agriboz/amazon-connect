import pkg from './package'

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Comstice Large Wallboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  toast: {
    duration: 2000
  },
  env: {},

  /*
   ** Global CSS
   */
  css: ['@/assets/scss/app.scss', '@/assets/scss/icons.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/veeValidate.js' },
    { src: '~/plugins/gridLayout.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/momentDuration.js' },
    { src: '~/plugins/momentRange.js' },
    { src: '~/plugins/excelExport.js' },
    { src: '~/plugins/datepicker.js' },
    { src: '~/plugins/apexCharts.js' },
    { src: '~/plugins/slimScroll.js' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/moment',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: '//aws.notime.org:3000/'
    // baseURL: 'https://entplcwsx002.amwater.net:2778'
  },
  
  generate: {
    fallback: true
  },

  /*
   ** Build configuration
   */
  build: {
    // analyze: true,

    /*
     ** You can extend webpack config here
     */

    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
