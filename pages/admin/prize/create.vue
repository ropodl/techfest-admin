<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";

const prize = usePrize();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add Prize"
});

const form = reactive({
  title: "",
  description: "",
  image: null,
  status: "Draft"
});

const addPrize = async()=>{
  if (form.image == null)
    return snackbar.showSnackbar("Prize Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  await prize.create(formData);
};
</script>
<template>
  <v-form @submit.prevent="addPrize">
    <v-container>
      <v-row>
      <v-col cols="12">
        <LazyAdminSharedPageTitle title="Add Prize" back="/admin/prize" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field v-model="form.title" label="Prize Title"></v-text-field>
        <v-card flat rounded="0" class="ext-editor mb-10">
            <ClientOnly placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.description"
                placeholder="Prize Description"
                :api-key="tinyApiKey"
                :init="tinymceConfig"
              />
            </ClientOnly>
          </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <LazyAdminSharedActions :form="form"/>
        <LazyAdminSharedImageUpload :form="form" title="Prize Image" />
      </v-col>
    </v-row>
  </v-container>
</v-form>
</template>