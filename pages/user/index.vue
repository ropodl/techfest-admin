<script setup>
const { data } = useUser();

definePageMeta({
  layout: "user",
  middleware: [
    "auth",
    function (to, from) {
      if (process.client) {
        const { data } = useUser();
        // const { signOut } = useAuth();
        const token = localStorage.getItem("user_token");
        if ((token === null) | !data.id?.length) return signOut();

        console.log(token);
        console.log(data);
      }
    },
  ],
});
useHead({
  title: "User Dashboard",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      {{ JSON.stringify(data) }}
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
