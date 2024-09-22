// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxt/ui"],

  css: ["~/assets/style.css"],

  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
    },
  },

  appConfig: {
    title: "Quiz",
    description: "App Quiz make with AI",
  },
});
