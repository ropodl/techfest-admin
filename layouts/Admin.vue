<script setup>
const auth = ref(false);

onMounted(() => {
  nextTick(() => {
    let auth_token = localStorage.getItem("user_auth_token");
    if (!auth_token) return navigateTo("/");
    auth.value = true;
  });
});
</script>
<template>
  <v-main>
    <template v-if="auth">
      <LazyAdminLayoutNavbar />
      <slot />
    </template>
    <template v-else>Loading...</template>
  </v-main>
</template>
