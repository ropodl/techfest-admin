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
            show-arrows hide-slider
            height="64"
            color="white"
            class="d-flex align-center px-3"
            v-model="current"
            density="compact"
          >
            <v-tab rounded="lg" class="text-capitalize" height="48">
              All
            </v-tab>
            <template v-for="role in roles">
              <v-tab rounded="lg" class="text-capitalize" height="48">
                {{ role.title }}
              </v-tab>
            </template>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-auto-animate>
      <v-col cols="12">
        <v-row>
          <template v-for="team in members">
            {{ team }}
            <v-col cols="12">
              <div class="text-h5 font-weight-bold">Designer</div>
            </v-col>
            <v-col cols="12" md="3" v-for="i in 4">
              <v-card>
                <v-img
                  cover
                  height="400"
                  class="align-end pa-2"
                  src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                >
                  <v-card>
                    <v-card-text>
                      <ul class="list-style-none">
                        <li class="text-h6 font-weight-bold mb-2">
                          Saroj Poudel
                        </li>
                        <li>Team Leader - Web Site Designer</li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </v-img>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
