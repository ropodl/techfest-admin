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
const roles = [
  "All",
  "Designers",
  "Event Coordinators",
  "Finance",
  "Logistic Coordinator",
  "Marketing",
  "Marketing and Public Relations",
  "Secretary",
  "Sub Event Coordinator",
  "Technical Coordinator",
];

onMounted(() => {
  nextTick(() => {
    // Call api for members
    callMembers();
  });
});
// Call Members
const teams = ref([]);
const callMembers = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/team",
    {
      params: {
        page: 1,
        per_page: -1,
      },
    }
  );
  if (error.value) return console.log(error.value);
  teams.value = data.value.teams;
  console.log(data.value);
};
</script>

<template>
  <v-container>
    <v-row style="position: sticky; top: 65px; z-index: 99">
      <v-col cols="12" class="px-0">
        <v-card border rounded="pill">
          <v-tabs v-model="current" density="compact" height="50">
            <template v-for="role in roles">
              <v-tab class="text-capitalize" rounded="0">{{ role }}</v-tab>
            </template>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-auto-animate>
      <v-col cols="12">
        <v-row>
          <template v-for="team in teams">
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
