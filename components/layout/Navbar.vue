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
  <v-layout
    class="w-100"
    style="
      position: fixed;
      left: 0;
      right: 0;
      height: 64px;
      background-color: rgba(var(--v-theme-surface), 0.9);
      backdrop-filter: blur(8px);
    "
  >
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
            <v-img class="w-100 h-100" src="/image/logo-min.webp" />
          </v-card>
          <v-spacer></v-spacer>
          <template v-for="(link, i) in navLinks">
            <v-btn
              height="48"
              rounded="lg"
              class="text-capitalize"
              :to="link.to"
            >
              {{ link.title }}
            </v-btn>
          </template>
          <v-spacer></v-spacer>

          <v-btn
            icon
            variant="flat"
            color="primary"
            size="60"
            class="text-capitalize hidden-sm-and-up"
            to="/login"
          >
            <v-icon>
              <Icon icon="mdi:user" />
            </v-icon>
          </v-btn>
          <template v-if="auth">
            <v-btn icon rounded="lg" variant="tonal">
              <v-icon>
                <Icon icon="mdi:bell-outline" />
              </v-icon>
            </v-btn>
            <!-- <div class="d-flex justify-space-between"> -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  color="transparent"
                  height="48"
                  rounded="lg"
                  v-bind="props"
                >
                  <v-avatar size="48" rounded="lg">
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
            <v-card height="60" rounded="pill"> </v-card>
            <!-- </div> -->
          </template>
          <template v-else>
            <v-btn
              height="48"
              variant="flat"
              color="primary"
              rounded="lg"
              to="/login"
              class="text-capitalize hidden-sm-and-down"
              >Register/Login</v-btn
            >
            <v-btn
              icon
              variant="flat"
              color="primary"
              size="60"
              class="text-capitalize hidden-sm-and-up"
              to="/login"
              style="pointer-events: all"
            >
              <v-icon>
                <Icon icon="mdi:user" />
              </v-icon>
            </v-btn>
          </template>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-layout>
</template>
