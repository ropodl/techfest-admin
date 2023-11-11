<script setup>
definePageMeta({
  layout: "user",
  middleware: "auth",
});

useHead({
  title: "User Events",
});
</script>
<template>
  <v-row>
    <v-col cols="12">
      <LazyAdminSharedPageTitle title="Events you have registerd for" />
    </v-col>
    <v-col cols="12" md="3" v-for="i in 10"></v-col>
  </v-row>
</template>
