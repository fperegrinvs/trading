export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  server: {
    port: 3094
  },
  env: {
    // apiUrl: "https://devcore.deepnlp.net",
    apiUrl: "https://devcore.chinhta123.com",
    apiUrlVersion2: "https://searchapi.chinhta123.com",
    fakeBackend: 'http://localhost:3098'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Quản lý văn bản',
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
      { rel: 'icon', type: 'image/x-icon', href: '/symbol.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/main.scss',
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
    '@nuxt/postcss8',
  ],

  generate: {
    routes: [
      '/'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    // postcss: {
    //   plugins: {
    //     'postcss-custom-properties': false,
    //     'postcss-preset-env': {
    //       features: {
    //         'custom-properties':false
    //       }
    //     }
    //   }
    // }
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  // devServer: {
  //   proxy: 'https://localhost:3094',
  // },
  proxy: {
    // Simple proxy
    "/api/": {
      target: "https://test.com/",
      pathRewrite: { "^/api/": "" }
    }
  },
}
