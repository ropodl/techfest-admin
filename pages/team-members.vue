<script setup>
const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Team Members",
});

const current = ref("All");

onMounted(() => {
  nextTick(() => {
    getAllMembers();
  });
});

const members = ref([]);
const roles = ref([]);

const getAllMembers = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/team"
  );
  if (error.value) return console.log(error.value);
  members.value = data.value.members;
  roles.value = data.value.roles;
};
</script>

<template>
  <v-container>
    <template v-if="members.length">
      <v-row style="position: sticky; top: 54px; z-index: 99">
        <v-col cols="12">
          <v-card border height="64" class="rounded-lg sticky-card">
            <v-tabs
              grow
              bg-color="transparent"
              show-arrows
              hide-slider
              height="64"
              color="white"
              class="d-flex align-center px-3"
              density="compact"
            >
              <v-tab
                rounded="lg"
                class="text-capitalize"
                height="48"
                :active="current === 'All'"
                @click="current = 'All'"
              >
                All
              </v-tab>
              <template v-for="role in roles">
                <template v-if="role.count">
                  <v-tab
                    rounded="lg"
                    class="text-capitalize"
                    height="48"
                    :active="current === role.title"
                    @click="current = role.title"
                  >
                    {{ role.title }}
                  </v-tab>
                </template>
              </template>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-auto-animate>
        <v-col cols="12">
          <v-row v-auto-animate>
            <template v-for="role in roles">
              <template v-if="role.title === current || current == 'All'">
                <template v-if="role.count">
                  <v-col cols="12">
                    <div class="text-h5 font-weight-bold text-capitalize">
                      {{ role.title }}
                    </div>
                  </v-col>
                </template>
                <template v-for="(team, i) in members">
                  <template v-if="team.role.title === role.title">
                    <v-col cols="12" sm="6" md="4" lg="3">
                      <v-hover v-slot="{ isHovering, props }">
                        <v-card border rounded="lg" elevation="0" v-bind="props">
                          <v-img
                            cover
                            height="400"
                            class="align-end pa-2"
                            :class="isHovering ? 'zoom-image' : ''"
                            :src="team.memberImage.url"
                          >
                            <v-card
                              style="
                                background-color: rgba(33, 33, 33, 0.8);
                                backdrop-filter: blur(8px);
                              "
                            >
                              <v-card-text>
                                <ul class="list-style-none">
                                  <li class="text-h6 font-weight-bold mb-2">
                                    {{ team.name }}
                                  </li>
                                  <li>
                                    {{ team.leader ? "Team Leader - " : ""
                                    }}{{ team.role.title }}
                                  </li>
                                </ul>
                              </v-card-text>
                            </v-card>
                          </v-img>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </template>
                </template>
              </template>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row>
        <v-col cols="12">
          <LazySharedEmpty />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
<style lang="scss">
.sticky-card {
  background-color: rgba(var(--v-theme-surface), 0.9) !important;
  backdrop-filter: blur(8px) !important;
}
</style>
