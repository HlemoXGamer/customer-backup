// https://suble-be-staging.mohamedradwan.me
// https://sablebe.sabletest.com/api
// https://sable.sablesweets.com/api
// sablebe.sablesweets.com
// https://dev.sable-be.mohamedradwan.me/api
const url = "https://beta-be.sablesweets.com/api";
  // process.env.NODE_ENV === "production"
  //   ? "https://sablebe.sablesweets.com/api"
  //   : "";

export default {
  host: 'localhost',
  ssr: false,
  env: {
    gmapKey: "AIzaSyDKZjWQdLmfubzBc_Dv0hf6xIINJiO1fY0",
  },
  head: {
    titleTemplate: "Sablè",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    // cordova
    script: [{ src: "cordova.js" }],
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: url,
      browserBaseURL: url,
    },
  },

  router: {
    // cordova
    mode: "hash",
    extendRoutes(routes, resolve) {
      routes.push({
        name: "product-show",
        path: "/:vendor_name/:vendor_id/:slug",
        component: resolve(__dirname, "pages/products/show.vue"),
        chunkName: "pages/products/show",
        params: true,
      });
    },
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/app.css", "vue-slick-carousel/dist/vue-slick-carousel.css", "@mdi/font/css/materialdesignicons.min.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/axios.js",
    "~plugins/rtl.js",
    "~plugins/location.js",
    "~plugins/google-map.js",
    "~/plugins/scrollPicker.js",
    "~plugins/deep-link.js",
    { src: "~/plugins/custom.js", mode: "client" },
    { src: "~/plugins/validation.js" },

    // cordova
    "~/plugins/cordova.client",
    // { src: '~/plugins/google.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    ["@nuxtjs/vuetify", { iconfont: "mdi" }],
    "@nuxtjs/google-fonts",
    "@nuxtjs/svg",
    "@nuxtjs/moment",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
    "@nuxtjs/i18n",
    ['@nuxtjs/pwa',{icon:false}]
  ],
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.js", dir: "ltr" },
      { code: "ar", iso: "ar-EG", file: "ar.js", dir: "rtl" },
    ],
    defaultLocale: "en",
    langDir: 'locales/'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   credentials: true
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    preset: "vue-cli-plugin-vuetify-preset-reply/preset",
    treeShake: false,
    defaultAssets: false,
  },
  googleFonts: {
    display: "swap",
    families: {
      Montserrat: true,
    },
  },
  toast: {
    position: "bottom-center",
    duration: 3000,
    theme: "bubble",
    register: [],
  },
  auth: {
    plugins: ["~/plugins/auth.js"],

    strategies: {
      laravelJWT: {
        provider: "laravel/jwt",
        url,
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          logout: { url: "/auth/logout", method: "delete" },
          user: false,
        },
        user: {
          property: "user",
          autoFetch: false,
        },
        token: {
          property: "token",
          maxAge: 60 * 60 * 24 * 14
        },
        refreshToken: {
          property: "refresh_token",
        },
        redirect: {
          login: "/pick-service",
          logout: "/login",
          callback: "/login",
          home: "/login",
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: "/nuxtfiles/",
    transpile: ["vue-cli-plugin-vuetify-preset-reply", /^vue2-google-maps($|\/)/],
  },

  // cordova
  serverMiddleware: [
    { path: "/nuxtfiles", handler: "~/servermiddleware/assets.js" },
  ],
};
