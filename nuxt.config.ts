import { resolve } from "node:path";
import { md3 } from "vuetify/blueprints";
import colors from "vuetify/lib/util/colors";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      titleTemplate: '%s - Sagarmatha Techfest 2023',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }]
    },
  },
  devtools: { enabled: true },
  googleFonts: {
    download: false,
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
      },
    },
    display: "swap",
  },
  vuetify: {
    vuetifyOptions: {
      blueprint: md3,
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
    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      // useIconCDN: true | false,
      /* vite-plugin-vuetify options */
      // styles: true | 'none' | 'expose' | 'sass' | { configFile: string },
      autoImport: true,
      // useVuetifyLabs: true,
    },
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
    // "nuxt-capo",
    // "nuxt-security",
    "@formkit/auto-animate/nuxt",
    "@hebilicious/authjs-nuxt"
  ],
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET // You can generate one with `openssl rand -base64 32`
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET
    },
    google:{
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET
    },
    public: {
      api_url: process.env.api_url,
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
        guestRedirectTo: '/',
        authenticatedRedirectTo: '/user',
      }
    }
  },
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie")
  }
});
