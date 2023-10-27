<script setup>
import { Icon } from "@iconify/vue";

const { signOut, user, status } = useAuth();

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
  { title: "Team Members", to: "/team-members" },
  {
    title: "Contact",
    to: "/contact",
  },
];

const userDropdown = [
  {
    title: "Dashboard",
    href: "/user",
  },
  {
    title: "Events",
    href: "/user/events",
  },
];

const auth = computed(() => status.value === "authenticated");

const handleSignOut = () => {
  signOut();
  localStorage.removeItem("user_token");
  navigateTo("/", { replace: true });
};
</script>

<template>
  <v-container
    id="navbar"
    class="position-fixed"
    style="top: 10px; left: 0; right: 0; z-index: 99999; pointer-events: none"
  >
    <v-row align="center">
      <v-card
        height="50"
        width="70"
        class="hidden-md-and-up"
        style="pointer-events: all"
      >
        <v-btn block height="70" rounded="0">X</v-btn>
      </v-card>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-card
        height="60"
        width="150"
        class="d-flex align-center rounded-pill"
        to="/"
        style="pointer-events: all"
      >
        <v-img contain height="50" src="/image/logo.png"></v-img>
      </v-card>
      <v-spacer></v-spacer>
      <v-card
        height="60"
        class="hidden-md-and-down rounded-pill"
        style="pointer-events: all"
      >
        <v-tabs
          grow
          exact
          :mandatory="false"
          hide-slider
          color="white"
          variant="tonal"
          height="60"
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
            height="60"
            rounded="lg"
            class="rounded-pill d-flex align-center justify-center mr-3"
            style="pointer-events: all"
          >
            <v-btn icon rounded="0" size="60" variant="text">
              <v-icon>
                <Icon icon="mdi:bell-outline" />
              </v-icon>
            </v-btn>
          </v-card>
          <v-card height="60" rounded="pill" style="pointer-events: all">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  color="transparent"
                  height="60"
                  rounded="0"
                  class="text-capitalize pa-0"
                  v-bind="props"
                >
                  <v-avatar rounded="circle" size="60">
                    <v-img :src="user.image"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <v-list density="compact">
                <template v-for="drop in userDropdown">
                  <v-list-item :to="drop.href" :title="drop.title">
                  </v-list-item>
                </template>
                <v-divider></v-divider>
                <v-list-item
                  @click="handleSignOut"
                  class="text-error"
                  title="Sign Out"
                ></v-list-item>
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
              height="60"
              class="text-capitalize"
              to="/login"
            >
              Register/Login
            </v-btn>
          </v-card>
        </div>
      </template>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.test {
  background-color: rgba(var(--v-theme-primary));
}
</style>
