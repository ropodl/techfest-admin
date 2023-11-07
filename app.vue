<script setup>
const { isOnline } = useNetwork();

const route = useRoute();
const admin = useAdmin();
const user = useUser();
// for full screen
const app = ref();
useIsFullScreen(app);

onMounted(() => {
  const admin_token = localStorage.getItem("admin_auth_token");
  const user_token = localStorage.getItem("user_token");
  nextTick(() => {
    if (!admin_token) return;
    else admin.checkAuth(admin_token);
    if (!user_token) return;
    else user.checkAuth(user_token);
  });
});
</script>

<template>
  <div ref="app">
    <VitePwaManifest />
    <NuxtLoadingIndicator color="rgb(var(--v-theme-primary))" />
    <v-app>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <LazyLayoutOfflineBanner v-if="!isOnline" />
      <LazyLayoutGoTop v-if="!route.fullPath.includes('/admin/')" />
      <LazyLayoutSnackbar />
    </v-app>
  </div>
</template>
<style lang="scss">
.list-style-none {
  list-style: none;
}
.v-skeleton-loader__image {
  height: 100% !important;
}
.line-clamp-1 {
  display: -webkit-box !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}
.line-clamp-2 {
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}
.line-clamp-3 {
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}
</style>
