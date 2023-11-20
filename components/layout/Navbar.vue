<script setup>
import { Icon } from "@iconify/vue";
import { socials } from "../../utils/social";

// const user = useUser();
// const { signOut } = useAuth();
const route = useRoute();

const navLinks = [
  {
    icon: "mdi:newspaper-variant-outline",
    title: "Blog",
    to: "/blog",
  },
  {
    icon: "mdi:calendar-multiple-check",
    title: "Pre Events",
    to: "/pre-events",
  },
  {
    icon: "mdi:folder-wrench-outline",
    title: "Main Events",
    to: "/workshops",
  },
  {
    icon: "mdi:comment-account-outline",
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
    href: "/frequently-asked-questions",
  },
];
// About Dropdown active condition
const aboutIsActive = computed(() => {
  return aboutDropdown.some((item) => route.fullPath.includes(item.href));
});

const drawer = ref(false);
const windowSize = reactive({
  x: 0,
  y: 0,
});
const openBottomSheet = () => {
  drawer.value = !drawer.value;
};
const onResize = () => {
  if (process.client) {
    windowSize.x = window.innerWidth;
    windowSize.y = window.innerHeight;

    if (windowSize.x >= 960) {
      drawer.value = false;
    }
  }
};

onMounted(() => {
  nextTick(() => {
    onResize();
  });
});
</script>

<template>
  <v-layout v-resize="onResize" class="w-100 position-fixed navbar border">
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
                class="text-capitalize hidden-sm-and-down"
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
          <v-spacer class="hidden-sm-and-down"></v-spacer>
          <template v-for="social in socials">
            <v-tooltip theme="light" location="bottom" :text="social.title">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  v-bind="props"
                  variant="plain"
                  rounded="lg"
                  size="48"
                  target="_blank"
                  class="hidden-xs"
                  :href="social.link"
                >
                  <v-icon size="sm">
                    <Icon :icon="social.icon" />
                  </v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </template>
          <!-- <v-spacer class="hidden-md-and-up"></v-spacer> -->
          <v-btn
            icon
            variant="tonal"
            size="48"
            rounded="lg"
            class="hidden-md-and-up"
            @click="openBottomSheet"
          >
            <v-icon>
              <Icon :icon="drawer ? 'mdi:close' : 'mdi:menu'" />
            </v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-layout>
  <v-navigation-drawer v-model="drawer" location="bottom" temporary touchless>
    <v-card flat>
      <v-card-text class="d-flex justify-center">
        <template v-for="social in socials">
          <v-btn
            icon
            rounded="lg"
            height="48"
            class="mr-3 text-capitalize"
            variant="tonal"
            target="_blank"
            :href="social.link"
            :aria-label="`${social.name} Icon`"
          >
            <v-icon>
              <Icon :icon="social.icon" />
            </v-icon>
          </v-btn>
        </template>
      </v-card-text>
    </v-card>
    <v-list dense>
      <template v-for="link in navLinks">
        <v-list-item :to="link['to']" color="primary">
          <template #prepend>
            <v-icon>
              <Icon :icon="link['icon']" />
            </v-icon>
          </template>
          <v-list-item-title>{{ link["title"] }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
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
