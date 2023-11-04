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
  - Resource upload not working
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
        <LazyAdminSharedImageUpload :form="form" title="File Upload"
        accept="application/pdf,
                application/vnd.ms-excel,
                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                application/vnd.openxmlformats-officedocument.presentationml.presentation,
                application/vnd.ms-powerpoint"
                
                />
                <!-- <LazyAdminSharedFileUpload
                :form="form"
                title="Upload Resource"
                /> -->
      </v-col>
    </v-row>
  </v-container>
</template>
