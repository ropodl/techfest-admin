import colors from "vuetify/lib/util/colors";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      titleTemplate: '%s - Sagarmatha Techfest 2023',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
  },
  devtools: {
    enabled: false,
    timeline: {
      enabled: true
    }
  },
  googleFonts: {
    download: false,
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
      },
      Ubuntu: {
        wght: [300,400,500,700]
      }
    },
    display: "swap",
  },
  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: "mdi",
      },
      theme: {
        defaultTheme: "dark",
        variations: {
          colors: ["primary", "secondary", "error", "info", "success", "warning"],
          lighten: 5,
          darken: 5,
        },
        themes: {
          light: {
            dark: false,
            colors: {
              primary: "#5256c4",
              accent: colors.grey.darken3,
              secondary: colors.amber.darken3,
              info: colors.teal.lighten1,
              warning: colors.amber.base,
              error: colors.deepOrange.accent4,
              success: colors.green.accent3,
              // background: "#252734",
            },
          },
          dark: {
            dark: true,
            colors: {
              primary: "#5256c4",
              accent: colors.grey.darken3,
              secondary: colors.amber.darken3,
              info: colors.teal.lighten1,
              warning: colors.amber.base,
              error: colors.deepOrange.accent4,
              success: colors.green.accent3,
              // background: "#252734",
            },
          },
        },
      },
    },
    // moduleOptions: {
      /* nuxt-vuetify module options */
      // treeshaking: true,
      // autoImport: true,
      // useVuetifyLabs: true,
      // useIconCDN: true | false,
      // styles: { configFile: new URL('assets/vuetify/style.scss', import.meta.url).pathname }
    // },
  },
  // pinia: {
  //   autoImports: ["getActivePinia", "defineStore", "acceptHMRUpdate"]
  // },
  imports: {
    dirs: ['stores']
  },
  modules: [
    "@vueuse/nuxt", 
  "@invictus.codes/nuxt-vuetify",
  "@pinia/nuxt",
  "@nuxtjs/google-fonts",
  "@vite-pwa/nuxt",
  // Only in production
  "nuxt-capo",
  // "nuxt-security",
  "@formkit/auto-animate/nuxt",
  "@pinia-plugin-persistedstate/nuxt",
  "nuxt-simple-sitemap",
  "nuxt-og-image",
],
  ogImage: {
    runtimeBrowser: true
  },
  site: {
    url: 'https://techfest.sagarmathacollege.edu.np/',
  },
  runtimeConfig: {
    public: {
      api_url: process.env.api_url,
    }
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  }
});