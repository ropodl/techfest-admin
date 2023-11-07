<script setup>
import socials from "../../utils/social";
import { Icon } from "@iconify/vue";

const navLinks = [
  {
    title: "Terms and Conditions",
    to: "/terms-conditions",
  },
  {
    title: "Privacy Policy",
    to: "/privacy-policy",
  },
  {
    title: "Site Admin",
    to: "/sign-in",
  },
];
</script>

<template>
  <v-card flat rounded="0">
    <v-container>
      <v-row class="pt-10 pb-10">
        <v-col cols="12" md="4">
          <v-img width="160" height="100" src="/image/logo.png"></v-img>
          <v-card-title class="pl-0 mb-3">Sagarmath Tech Fest</v-card-title>
        </v-col>
        <v-col cols="12" md="2">
          <v-card-title class="mb-3">Quick Links</v-card-title>
          <v-card-text>
            <ul>
              <template v-for="link in navLinks">
                <v-hover v-slot="{ isHovering, props }">
                  <li style="margin-bottom: 10px" v-bind="props">
                    <nuxt-link
                      :to="link.to"
                      :class="[isHovering ? 'text-primary' : '']"
                      style="color: white; text-decoration: none"
                    >
                      {{ link.title }}
                    </nuxt-link>
                  </li>
                </v-hover>
              </template>
            </ul>
          </v-card-text>
        </v-col>
        <v-col cols="12" md="3">
          <v-card-title>Sagarmath Tech Fest</v-card-title>
        </v-col>
        <v-col cols="12" md="3">
          <v-card-title>Sagarmath Tech Fest</v-card-title>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <ul
            v-auto-animate
            class="w-100 list-style-none d-flex flex-wrap justify-center"
          >
            <li class="mr-3" v-for="social in socials()">
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  v-bind="props"
                  icon
                  rounded="lg"
                  :variant="isHovering ? 'tonal' : 'text'"
                  color="white"
                  target="_blank"
                  :href="social.link"
                >
                  <v-icon>
                    <Icon :icon="social.icon" />
                  </v-icon>
                </v-btn>
              </v-hover>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col cols="12">
          <div class="text-overline text-center">
            Sagarmatha Tech-fest © {{ new Date().getFullYear() }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
