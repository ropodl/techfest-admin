<script setup>
definePageMeta({
  layout: "user",
  middleware: "auth",
});
useHead({
  title: "User Dashboard",
});

const { user } = useAuth();
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <LazyAdminSharedPageTitle :title="`Hello ${user?.name}`" />
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
