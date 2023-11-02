<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";

definePageMeta({
  layout: "admin",
});

const form = reactive({
  title: "",
  perk: "",
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
        <v-text-field
          v-model="form.title"
          label="Sponsor Level Name"
        ></v-text-field>
        <ClientOnly placeholder="Loading TinyMCE Cloud">
          <Editor
            v-model="form.content"
            placeholder="Sponsor Level's Perks"
            :api-key="tinyApiKey"
            :init="tinymceConfig"
          />
        </ClientOnly>
      </v-col>
      <v-col cols="12" md="4">
        <LazyAdminSharedActions :form="form" />
      </v-col>
    </v-row>
  </v-container>
</template>
