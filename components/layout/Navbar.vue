<script setup>
import { Icon } from "@iconify/vue";

const navLinks = [
  {
    title: "Home",
    to: "/",
  },
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
  { title: "Team Members", to: "/team-members" },
  {
    title: "Contact",
    to: "/contact",
  },
];

const auth = ref(false);
</script>

<template>
  <!-- <v-app-bar> -->
  <v-container
    id="navbar"
    class="position-fixed"
    style="top: 10px; left: 0; right: 0; z-index: 99999; pointer-events: none"
  >
    <v-row align="center">
      <v-card
        height="70"
        width="70"
        class="hidden-md-and-up"
        style="pointer-events: all"
      >
        <v-btn block height="70" rounded="0">X</v-btn>
      </v-card>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-card
        height="70"
        width="200"
        class="d-flex align-center rounded-pill"
        to="/"
        style="pointer-events: all"
      >
        <v-img contain height="50" src="/image/logo.png"></v-img>
      </v-card>
      <v-spacer></v-spacer>
      <v-card
        class="hidden-md-and-down rounded-pill px-6"
        style="pointer-events: all"
      >
        <v-tabs
          grow
          exact
          :mandatory="false"
          hide-slider
          color="white"
          variant="tonal"
          height="70"
          selected-class="test"
        >
          <template v-for="(link, i) in navLinks">
            <v-tab rounded="0" class="text-capitalize" :to="link.to">
              {{ link.title }}
            </v-tab>
          </template>
        </v-tabs>
      </v-card>
      <v-spacer></v-spacer>
      <template v-if="auth">
        <div class="d-flex justify-space-between">
          <v-card
            height="70"
            rounded="lg"
            class="rounded-pill d-flex align-center justify-center"
            style="pointer-events: all"
          >
            <v-btn icon rounded="0" size="70" variant="text">
              <v-icon>
                <Icon icon="mdi:bell-outline" />
              </v-icon>
            </v-btn>
          </v-card>
          <v-card height="70" rounded="pill" style="pointer-events: all">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  color="transparent"
                  height="70"
                  rounded="0"
                  class="text-capitalize pa-0"
                  v-bind="props"
                >
                  <v-avatar rounded="0" size="80">
                    <v-img
                      src="https://ropodl.vercel.app/image/portfolio/images/2.png"
                    ></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in 10"
                  :key="index"
                  :value="index"
                >
                  <v-list-item-title>{{ index }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
        </div>
      </template>
      <template v-else>
        <div class="d-flex justify-end">
          <v-card class="rounded-pill" style="pointer-events: all">
            <v-btn
              variant="flat"
              color="primary"
              rounded="0"
              width="90"
              height="70"
              class="text-capitalize"
              to="/register"
            >
              Register
            </v-btn>
            <v-divider vertical inset></v-divider>
            <v-btn
              variant="flat"
              color="primary"
              rounded="0"
              width="90"
              height="70"
              class="text-capitalize"
              to="/login"
            >
              Log In
            </v-btn>
          </v-card>
        </div>
      </template>
    </v-row>
  </v-container>
  <!-- </v-app-bar> -->
</template>
<style lang="scss" scoped>
.test {
  background-color: rgba(var(--v-theme-primary));
}
</style>
