<script setup>
import { socials } from "../../utils/social";
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
];

const quickLinks = [
  {
    title: "Blogs",
    to: "/blog",
  },
  {
    title: "Pre Events",
    to: "/pre-events",
  },
  {
    title: "Main Events",
    to: "/main-events",
  },
];
</script>

<template>
  <v-divider></v-divider>
  <v-card flat color="transparent" rounded="0">
    <v-container>
      <v-row class="pt-10">
        <v-col cols="12" md="2">
          <v-img width="160" height="100" src="/image/logo.png"></v-img>
        </v-col>
        <v-col cols="12" md="3">
          <v-card-title class="mb-3">Important Links </v-card-title>
          <v-card-text>
            <ul class="list-style-none">
              <template v-for="link in navLinks">
                <v-hover v-slot="{ isHovering, props }">
                  <li
                    class="text-body-2"
                    style="margin-bottom: 10px"
                    v-bind="props"
                  >
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
          <v-card-title class="mb-3">Quick Links</v-card-title>
          <v-card-text>
            <ul class="list-style-none">
              <template v-for="link in quickLinks">
                <v-hover v-slot="{ isHovering, props }">
                  <li
                    class="text-body-2"
                    style="margin-bottom: 10px"
                    v-bind="props"
                  >
                    <nuxt-link
                      :to="link.to"
                      class="w-100"
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
        <v-col cols="12" md="4">
          <v-card-title class="mb-3">Contact Info</v-card-title>
          <v-list-item class="mb-3">
            <template v-slot:prepend>
              <v-icon size="32" color="primary">
                <Icon icon="mdi:map-marker" />
              </v-icon>
            </template>
            <v-list-item-title class="text-h6 font-weight-bold mb-3">
              Visit Us
            </v-list-item-title>
            <v-list-item-subtitle class="mb-2" style="line-height: normal">
              Sagarmatha Engineering College
            </v-list-item-subtitle>
            <v-list-item-subtitle style="line-height: normal"
              >Sanepa, Lalitpur</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item class="mb-3">
            <template v-slot:prepend>
              <v-icon size="32" color="primary">
                <Icon icon="mdi:phone" />
              </v-icon>
            </template>
            <v-list-item-title class="text-h6 font-weight-bold mb-3">
              Talk to Us
            </v-list-item-title>
            <v-list-item-subtitle class="mb-2" style="line-height: normal">
              +977-9851140360,
            </v-list-item-subtitle>
            <v-list-item-subtitle style="line-height: normal">
              +977-9866121853
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon size="32" color="primary">
                <Icon icon="mdi:email" />
              </v-icon>
            </template>
            <v-list-item-title class="text-h6 font-weight-bold mb-3">
              Let's Share thoughts
            </v-list-item-title>
            <v-list-item-subtitle style="line-height: normal">
              techfest@sagarmatha.edu.np
            </v-list-item-subtitle>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <ul
            v-auto-animate
            class="w-100 list-style-none d-flex flex-wrap justify-center"
          >
            <li class="mr-3" v-for="social in socials">
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
                  <v-icon size="sm">
                    <Icon :icon="social.icon" />
                  </v-icon>
                </v-btn>
              </v-hover>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <v-row>
      <v-col cols="12">
        <div class="text-overline text-center">
          Sagarmatha Tech-fest © {{ new Date().getFullYear() }}
        </div>
      </v-col>
    </v-row>
    <v-container> </v-container>
  </v-card>
</template>
