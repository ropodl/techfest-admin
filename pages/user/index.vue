<script setup>
const { data } = useUser();
definePageMeta({
  layout: "user",
  middleware: "is-user",
});
useHead({
  title: "User Dashboard",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <LazyAdminSharedPageTitle :title="`Hello ${data?.name}`" />
    </v-col>
    <v-col cols="12" md="4" v-for="i in 3">
      <v-card>
        <v-card-title>
          {{ i }}
        </v-card-title>
        <v-card-text> Total Registered Events </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
