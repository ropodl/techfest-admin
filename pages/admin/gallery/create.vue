<script setup>
definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add Gallery",
});

const form = reactive({
  name: "",
  images: "",
  status: "Draft",
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <LazyAdminSharedPageTitle
          title="Add New Gallery"
          back="/admin/gallery"
        />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="Gallery Name"></v-text-field>
        <v-card>
          <v-card-title>Add Image upload button</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <LazyAdminSharedActions :form="form" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss"></style>
