<script setup>
import { Icon } from "@iconify/vue";

const search = ref();
const drawer = ref(true);
// fullscreen
const fullscreen = useIsFullScreen();
const toggleFullScreen = () => {
  fullscreen.value.toggle();
};
// fullscreen
let searchItems = reactive([]);

const navitems = reactive([
  {
    icon: "mdi:home",
    title: "Home",
    route: "/admin/",
  },
  {
    subtitle: "Pages",
    icon: "mdi:pencil",
    title: "Blog",
    subitems: [
      { title: "All Blogs", route: "/admin/blog" },
      { title: "Add New", route: "/admin/blog/create" },
    ],
  },
  {
    icon: "mdi:calendar-clock-outline",
    title: "Pre Events",
    subitems: [
      {
        title: "All Pre Events",
        route: "/admin/event/",
      },
      {
        title: "Add New Event",
        route: "/admin/event/create",
      },
    ],
  },
  {
    icon: "mdi:sword-cross",
    title: "Main Events",
    subitems: [
      {
        title: "All Main Events",
        route: "/admin/workshop/",
      },
      {
        title: "Add Main Event",
        route: "/admin/workshop/create",
      },
    ],
  },
  // {
  //   icon: "mdi:download",
  //   title: "Resource",
  //   subitems: [
  //     {
  //       title: "All Resources",
  //       route: "/admin/resource/",
  //     },
  //     {
  //       title: "Add Resource",
  //       route: "/admin/resource/create",
  //     },
  //   ],
  // },
  {
    icon: "mdi:info",
    title: "FAQ",
    subitems: [
      {
        title: "All FAQs",
        route: "/admin/faq/",
      },
      {
        title: "Add FAQ",
        route: "/admin/faq/create",
      },
    ],
  },
  {
    icon: "mdi:trophy",
    title: "Prize",
    subitems: [
      {
        title: "All Prizes",
        route: "/admin/prize/",
      },
      {
        title: "Add Prize",
        route: "/admin/prize/create",
      },
    ],
  },
  {
    icon: "mdi:gavel",
    title: "Terms and Conditions",
    route: "/admin/terms-conditions",
  },
  {
    icon: "material-symbols:privacy-tip-outline",
    title: "Privacy Policy",
    route: "/admin/privacy-policy",
  },
  {
    subtitle: "Management",
    icon: "mdi:account-tie",
    title: "Speaker",
    subitems: [
      {
        title: "All Speakers",
        route: "/admin/speaker/",
      },
      {
        title: "Add Speaker",
        route: "/admin/speaker/create",
      },
    ],
  },
  {
    icon: "mdi:money",
    title: "Sponsors",
    subitems: [
      {
        title: "All Sponsors",
        route: "/admin/sponsor/",
      },
      {
        title: "Add Sponsors",
        route: "/admin/sponsor/create",
      },
    ],
  },
  {
    icon: "mdi:account-group",
    title: "Team",
    subitems: [
      {
        title: "All Members",
        route: "/admin/team/",
      },
      {
        title: "Add Member",
        route: "/admin/team/create",
      },
    ],
  },
  {
    icon: "mdi:account-plus",
    title: "Admins",
    subitems: [
      {
        title: "All Admins",
        route: "/admin/list/",
      },
      {
        title: "Add New Admin",
        route: "/admin/create",
      },
    ],
  },
  {
    icon: "mdi:phone",
    title: "Contact Form Requests",
    route: "/admin/contact-form-requests",
  },
]);
</script>
<template>
  <v-app-bar
    class="border"
    height="50"
    style="
      border-top: 0 !important;
      border-left: 0 !important;
      border-right: 0 !important;
    "
  >
    <v-container fluid class>
      <v-row align="center">
        <v-app-bar-nav-icon
          rounded="0"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-btn
          color="transparent"
          rounded="0"
          height="50"
          width="100"
          content-class="w-100"
          to="/admin/"
        >
          <v-img height="40" width="100" src="/image/logo.png"></v-img>
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              rounded="0"
              height="50"
              class="text-capitalize"
              color="white"
              v-bind="props"
            >
              <v-icon> <Icon icon="mdi:web" /></v-icon>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item to="/">
              <v-list-item-title>Go to website</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- <v-spacer></v-spacer>
        <v-autocomplete
          hide-details
          hide-no-data
          menu-icon
          clearable
          ref="search"
          :items="searchItems"
          item-title="title"
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
          style="max-width: 400px !important"
        >
          <template v-slot:item="{ item, props }">
            <v-list-item
              density="compact"
              v-bind="props"
              @click="searchItemGoTo(item)"
            />
          </template>
        </v-autocomplete> -->
        <v-spacer></v-spacer>
        <v-tooltip
          theme="light"
          location="bottom"
          :text="
            fullscreen.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'
          "
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              rounded="0"
              height="50"
              @click="toggleFullScreen"
            >
              <v-icon>
                <Icon
                  :icon="
                    fullscreen.isFullscreen
                      ? 'mdi:fullscreen-exit'
                      : 'mdi:fullscreen'
                  "
                />
              </v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <LazyAdminSharedAdminNavDrop />
      </v-row>
    </v-container>
  </v-app-bar>
  <!-- nav drawer -->
  <v-navigation-drawer v-model="drawer" absolute>
    <v-list class="nav overflow-visible" density="compact">
      <template v-for="navitem in navitems">
        <v-list-subheader v-if="navitem.subtitle">
          {{ navitem.subtitle }}
        </v-list-subheader>
        <template v-if="navitem.subitems">
          <v-list-group v-model="navitem.active">
            <template v-slot:activator="{ props }">
              <!-- main like dashboard -->
              <v-list-item v-bind="props">
                <template v-slot:prepend>
                  <v-icon>
                    <Icon :icon="navitem['icon']" />
                  </v-icon>
                </template>
                <v-list-item-title>
                  {{ navitem.title }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <span v-for="subitem in navitem.subitems">
              <span v-if="subitem.miniitems">
                <v-list-group>
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props">
                      <template v-slot:prepend>
                        <v-icon>
                          <Icon :icon="subitem['icon']" />
                        </v-icon>
                      </template>
                      <!-- child's option -->
                      <v-list-item-title>
                        {{ subitem.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-if="subitem.miniitems">
                    <v-list-item
                      v-for="mini in subitem.miniitems"
                      :to="mini.route"
                    >
                      <!-- grand child -->
                      <v-list-item-title>
                        {{ mini.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list-group>
              </span>
              <span v-else>
                <v-list-item exact :to="subitem.route">
                  <!-- child -->
                  <v-list-item-title>
                    {{ subitem.title }}
                  </v-list-item-title>
                </v-list-item>
              </span>
            </span>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item :to="navitem.route">
            <template v-slot:prepend>
              <v-icon>
                <Icon :icon="navitem['icon']" />
              </v-icon>
            </template>
            <v-list-item-title>
              {{ navitem.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
