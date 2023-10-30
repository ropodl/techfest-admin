<script setup>
const { user, status } = useAuth();
const loading = ref(true);

onMounted(() => {
  nextTick(() => {
    loading.value = true;
    let user_token = localStorage.getItem("user_token");
    if (!user_token && status.value === "unauthenticated") {
      return navigateTo("/");
    }
    getUser();
    loading.value = false;
  });
});
// get user then create or login
const getUser = async () => {
  const { data, error } = await useFetch(
    "http://localhost:3001/api/v1/user/find-or-create",
    {
      method: "post",
      body: user,
    }
  );
  if (error.value) {
    return console.log(error.value);
  }
  localStorage.setItem("user_token", data.value.token);
};
</script>

<template>
  <template v-if="loading">
    <v-container class="h-100">
      <v-row justify="center" align="center" class="h-100">
        <v-col
          cols="12"
          md="4"
          class="h-100 d-flex align-center justify-center"
        >
          <div class="w-100">
            <v-img
              height="100"
              class="mb-10"
              src="/image/logo-min.webp"
            ></v-img>
            <v-progress-linear
              class="mb-3"
              rounded
              indeterminate
              color="primary"
              style="max-width: 200px"
            />
            <v-card-title class="text-center">
              We are verifying who you are
            </v-card-title>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <template v-else>
    <NuxtLayout name="with-page-title">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-card style="position: sticky; top: 80px">
              <v-tabs direction="vertical">
                <v-tab rounded="0" class="text-capitalize" to="/user/">
                  Dashboard
                </v-tab>
                <v-tab rounded="0" class="text-capitalize" to="/user/events">
                  Events
                </v-tab>
              </v-tabs>
            </v-card>
          </v-col>
          <v-col cols="12" md="9">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </NuxtLayout>
  </template>
</template>
