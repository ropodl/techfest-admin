<script setup>
import { Icon } from "@iconify/vue";
import { socials } from "../../utils/social";

// const user = useUser();
// const { signOut } = useAuth();
const route = useRoute();

const navLinks = [
  {
    title: "Blog",
    to: "/blog",
  },
  {
    title: "Pre Events",
    to: "/pre-events",
  },
  {
    title: "Workshops",
    to: "/workshops",
  },
  {
    title: "Contact",
    to: "/contact",
  },
];

const aboutDropdown = [
  {
    title: "Team Members",
    href: "/team-members",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
];
// About Dropdown active condition
const aboutIsActive = computed(() => {
  return aboutDropdown.some((item) => route.fullPath.includes(item.href));
});

const openBottomSheet = ()=>{
  
}
</script>

<template>
  <v-layout class="w-100 position-fixed navbar border">
    <v-app-bar color="transparent">
      <v-container class="py-0">
        <v-row justify="center" align="center">
          <v-card
            flat
            variant="text"
            height="50"
            width="140"
            to="/"
            color="transparent"
          >
            <v-img class="w-100 h-100" src="/image/logo-min.png" />
          </v-card>
          <v-spacer></v-spacer>
          <template v-for="(link, i) in navLinks">
            <v-btn
              :active="route.fullPath.includes(link.to)"
              height="48"
              rounded="lg"
              class="text-capitalize hidden-sm-and-down"
              :to="link.to"
            >
              {{ link.title }}
            </v-btn>
          </template>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                exact
                :active="aboutIsActive"
                height="48"
                rounded="lg"
                class="text-capitalize hidden-xs"
                v-bind="props"
              >
                About
                <v-icon end>
                  <Icon icon="mdi:chevron-down" />
                </v-icon>
              </v-btn>
            </template>
            <v-list density="compact">
              <v-list-item v-for="(about, i) in aboutDropdown" :to="about.href">
                <v-list-item-title>{{ about.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            icon
            variant="tonal"
            size="48"
            rounded="lg"
            class="hidden-md-and-up"
            @click="openBottomSheet"
          >
            <v-icon>
              <Icon icon="mdi:menu" />
            </v-icon>
          </v-btn>
          <v-spacer class="hidden-md-and-down"></v-spacer>
          <template v-for="social in socials">
            <v-tooltip theme="light" location="bottom" :text="social.title">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  v-bind="props"
                  variant="plain"
                  rounded="lg"
                  size="48"
                  class="hidden-md-and-down"
                  target="_blank"
                  :href="social.link"
                >
                  <v-icon size="sm">
                    <Icon :icon="social.icon" />
                  </v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </template>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-layout>
</template>
<style lang="scss">
.navbar {
  height: 64px;
  background-color: rgba(var(--v-theme-surface), 0.8);
  backdrop-filter: blur(8px);
  border-left: 0 !important ;
  border-right: 0 !important;
  border-top: 0 !important;
}
</style>
