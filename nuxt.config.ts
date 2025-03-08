// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // empecher Nuxt de préfixer les composants
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      challongeApiUrl: "",
    },
  },


  css: ["@/scss/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/scss/foundations/_variables.scss";
                          @import "@/scss/foundations/_mixins.scss";
          `,
        },
      },
    },
  },
})
