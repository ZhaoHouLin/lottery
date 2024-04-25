// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "node:path"

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  vite: {
    // define: {
    //   "process.env": process.env,
    // },
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: `@import "${path.resolve(
            __dirname,
            "./assets/style.styl"
          )}"`,
        },
      },
    },
  },
  app: {
    head: {
      viewport: "width=500, initial-scale=1",
      title: "資訊室的命運抽牌",
      meta: [
        {
          name: "description",
          content: "資訊室的命運抽牌",
        },
        { property: "og:title", content: "資訊室的命運抽牌" },
        { property: "og:url", content: "" },
        {
          property: "og:description",
          content: "資訊室的命運抽牌",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "cdclogo.ico" }],
    },
    // layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
  },
})
