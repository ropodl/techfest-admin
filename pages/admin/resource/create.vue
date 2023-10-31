<script setup>
definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Resource",
});

const form = reactive({
  title: "",
  excerpt: "",
  file: null,
  status: "Draft",
});
</script>

<template>
  {{ form }}
  <v-container>
    <v-row>
      <v-col cols="12">
        <LazyAdminSharedPageTitle
          title="Add New Resource"
          back="/admin/resource"
        />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="Resource Name"></v-text-field>
        <v-textarea label="Resource Excerpt"></v-textarea>
      </v-col>
      <v-col cols="12" md="4">
        <LazyAdminSharedActions :form="form" />

        <LazyAdminSharedFileUpload
          single
          :model="form.file"
          title="File Upload"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
