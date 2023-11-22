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
  nextTick(() => {
    if (admin_token) admin.checkAuth(admin_token);
    if (process.server) {
      // Code to execute on the server
      console.log("this is");
    }
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
.v-skeleton-loader__image {
  height: 100% !important;
}
.v-img:not(.v-parallax) {
  transition: all 0.2s;
}
.v-img:not(.v-parallax) .v-img__img {
  transform: scale(1);
  transition: all 0.2s;
}
.v-img:not(.v-parallax).zoom-image .v-img__img {
  transform: scale(1.2);
}
// Utility classes
.right-0 {
  right: 0;
}
.z-index-1 {
  z-index: 1;
}
.z-index-11 {
  z-index: 11;
}
.list-style-none {
  list-style: none;
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
