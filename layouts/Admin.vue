<script setup>
const isAuthorized = ref(false);
const loading = ref(true);

onMounted(() => {
  nextTick(() => {
    let auth_token = localStorage.getItem("admin_auth_token");
    if (!auth_token) return navigateTo("/");
    isAuthorized.value = true;
  });
});

const imageLoaded = () => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
<template>
  <v-main>
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
                @load="imageLoaded"
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
      <LazyAdminLayoutNavbar />
      <div v-auto-animate>
        <slot />
      </div>
    </template>
  </v-main>
</template>
