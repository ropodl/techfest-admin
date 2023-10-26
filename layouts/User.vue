<script setup>
const userLoggedIn = ref(false);

onMounted(() => {
  nextTick(() => {
    let auth_token = localStorage.getItem("user_token");
    setTimeout(() => {
      if (!auth_token) return navigateTo("/");
      userLoggedIn.value = true;
    }, 10000);
  });
});
</script>

<template>
  <template v-if="userLoggedIn">
    <NuxtLayout name="with-page-title">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-card>
              <v-tabs direction="vertical">
                <v-tab rounded="0" class="text-capitalize" to="/user/">
                  Dashboard
                </v-tab>
                <v-tab rounded="0" class="text-capitalize" to="/user/profile">
                  Profile
                </v-tab>
              </v-tabs>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </NuxtLayout>
  </template>
  <template v-else>
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
</template>
