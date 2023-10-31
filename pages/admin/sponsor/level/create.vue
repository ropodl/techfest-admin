<script setup>
definePageMeta({
  layout: "admin",
});

const form = reactive({
  status: "Draft",
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <LazyAdminSharedPageTitle
          title="Create Sponsor Level"
          back="/admin/sponsor/level"
        />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="Sponsor Level Name"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <LazyAdminSharedActions :form="form" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss"></style>
