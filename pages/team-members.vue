<script setup>
const runtimeConfig = useRuntimeConfig();
const snackbar = useSnackbar();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Team Members",
});

const current = ref("All");

onMounted(() => {
  nextTick(() => {
    // Call api for members
    getAllMembers();
  });
});
// Call Members
const members = ref([]);
const roles = ref([]);
const getAllMembers = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/team"
  );
  if (error.value) return console.log(error.value);
  members.value = data.value.members;
  roles.value = data.value.roles;
  console.log(data.value);
};
</script>

<template>
  <v-container>
    <v-row style="position: sticky; top: 54px; z-index: 99">
      <v-col cols="12">
        <v-card
          height="64"
          class="rounded-lg"
          style="
            background-color: rgba(var(--v-theme-surface), 0.9);
            backdrop-filter: blur(8px);
          "
        >
          <v-tabs
            show-arrows
            height="64"
            color="white"
            class="d-flex align-center px-3"
            density="compact"
          >
            <v-tab
              rounded="lg"
              class="text-capitalize"
              height="48"
              @click="current = 'All'"
            >
              All
            </v-tab>
            <template v-for="role in roles">
              <v-tab
                rounded="lg"
                class="text-capitalize"
                height="48"
                @click="current = role.title"
              >
                {{ role.title }}
              </v-tab>
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
              <v-col cols="12">
                <div class="text-h5 font-weight-bold text-capitalize">
                  {{ role.title }}
                </div>
              </v-col>
              <template v-for="(team, i) in members">
                <template v-if="team.role.title === role.title">
                  <v-col cols="12" md="3">
                    <v-card>
                      <v-img
                        cover
                        height="400"
                        class="align-end pa-2"
                        :src="team.memberImage.url"
                      >
                        <v-card>
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
                  </v-col>
                </template>
              </template>
            </template>
          </template>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
