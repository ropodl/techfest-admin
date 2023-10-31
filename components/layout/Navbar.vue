<script setup>
import { Icon } from "@iconify/vue";

const { signOut, user, status } = useAuth();
const { x, y } = useWindowScroll();

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
    class="position-fixed pt-2"
    style="top: 0px; left: 0; right: 0; z-index: 99999; pointer-events: none"
  >
    <v-row align="center">
      <v-col class="d-flex" v-auto-animate>
        <v-card
          rounded="circle"
          width="60"
          height="60"
          class="hidden-sm-and-up"
          style="pointer-events: all"
        >
          <v-btn icon width="60" height="60">
            <v-icon>
              <Icon icon="mdi:menu" />
            </v-icon>
          </v-btn>
        </v-card>
        <v-spacer class="hidden-md-and-up"></v-spacer>
        <!-- {{ y }} -->
        <v-card
          flat
          :color="y > 50 ? '' : 'transparent'"
          :ripple="false"
          height="60"
          width="150"
          class="d-flex align-center rounded-pill py-1"
          to="/"
          style="pointer-events: all"
        >
          <v-img height="100" src="/image/logo.png" />
        </v-card>
        <v-spacer></v-spacer>
        <v-card
          flat
          height="60"
          class="hidden-md-and-down rounded-pill"
          style="pointer-events: all"
        >
          <v-tabs
            grow
            exact
            :mandatory="false"
            hide-slider
            variant="tonal"
            height="60"
            class="d-flex align-center"
            selected-class="test"
          >
            <div class="d-flex align-center">
              <template v-for="(link, i) in navLinks">
                <v-tab
                  rounded="0"
                  class="text-capitalize"
                  :class="[
                    i === 0 ? 'pl-6' : '',
                    i === navLinks.length - 1 ? 'pr-6' : '',
                  ]"
                  :to="link.to"
                >
                  {{ link.title }}
                </v-tab>
                <span v-if="i !== navLinks.length - 1">/</span>
              </template>
            </div>
          </v-tabs>
        </v-card>
        <v-spacer class="hidden-md-and-down"></v-spacer>
        <template v-if="auth">
          <div class="d-flex justify-space-between">
            <v-card
              height="60"
              rounded="lg"
              class="rounded-pill d-flex align-center justify-center mr-3"
              style="pointer-events: all"
            >
              <v-btn icon flat rounded="0" size="60" variant="text">
                <v-icon>
                  <Icon icon="mdi:bell-outline" />
                </v-icon>
              </v-btn>
            </v-card>
            <v-card height="60" rounded="pill" style="pointer-events: all">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    flat
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
            <v-card
              class="rounded-pill hidden-sm-and-down"
              style="pointer-events: all"
            >
              <v-btn
                variant="flat"
                color="primary"
                rounded="0"
                height="60"
                class="text-capitalize"
                to="/login"
                >Register/Login</v-btn
              >
            </v-card>
            <v-card
              width="60"
              height="60"
              rounded="circle"
              class="rounded-circle hidden-sm-and-up"
              style="pointer-events: all"
            >
              <v-btn
                icon
                variant="flat"
                color="primary"
                rounded="0"
                height="60"
                width="60"
                class="text-capitalize"
                to="/login"
              >
                <v-icon>
                  <Icon icon="mdi:user" />
                </v-icon>
              </v-btn>
            </v-card>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.test {
  // color: rgba(var(--v-theme-primary), 1) !important;
}
</style>
