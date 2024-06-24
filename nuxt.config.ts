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
      title: "卡片式抽籤",
      meta: [
        {
          "http-equiv": "Content-Security-Policy",
          content:
            "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src 'none';",
        },

        {
          "http-equiv": "Strict-Transport-Security",
          content: "max-age=31536000; includeSubDomains; preload",
        },
        {
          "http-equiv": "X-Content-Type-Options",
          content: "nosniff",
        },
        {
          "http-equiv": "Referrer-Policy",
          content: "no-referrer",
        },
        {
          name: "description",
          content: "卡片式抽籤",
        },
        { property: "og:title", content: "卡片式抽籤" },
        { property: "og:url", content: "" },
        {
          property: "og:description",
          content: "卡片式抽籤",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "cdclogo.ico" }],
    },
    // layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
  },
})
