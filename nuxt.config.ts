export default {
  ssr: false,
  target: "static",

  app: {
    head: {
      title: "Black Country",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/driver.js/dist/driver.min.css' }
      ],
      script: [
        // { src: "https://newwebpay.qa.interswitchng.com/inline-checkout.js", defer: true }
        {
          src: "https://newwebpay.qa.interswitchng.com/inline-checkout.js",
          defer: true,
        },
      ]
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  css: ["/assets/css/main.css"],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },

  axios: {
    // Axios options here
    timeout: 10000, // Example: set timeout to 10 seconds
  },

  plugins: [],

  vite: {
    optimizeDeps: {
      include: ['fast-deep-equal']
    }
  },

  compatibilityDate: "2024-09-30"
};
