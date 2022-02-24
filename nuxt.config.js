export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/eco-pm-quiz/'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'eco-pm-quiz',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: "stylesheet", type: "text/css", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" },
      { rel: "stylesheet", type: "text/css", href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" },
      { rel: "stylesheet", type: "text/css", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
      { rel: "stylesheet", type: "text/css", href: "https://unpkg.com/aos@2.3.1/dist/aos.css" }
    ]
  },
  script: [
    // { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js' },
    { src: '@/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js' },
    // { src: 'https://unpkg.com/aos@2.3.1/dist/aos.js' },
  ],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~plugins/aos.js',
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxyHeaders: false,
    credentials: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
