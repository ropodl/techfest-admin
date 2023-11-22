<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";

const workshop = useWorkshop();
const snackbar = useSnackbar();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Edit Main Event",
});

const form = reactive({
  image: null,
  title: "",
  link: "",
  description: "",
  status: "Draft",
});

const loading = ref(true);
const addWorkshop = async () => {
  loading.value = true;
  if (form.image == null)
    return snackbar.showSnackbar("Workshop Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  await workshop.create(formData);
  loading.value = false;
};
</script>
<template>
  <v-form @submit.prevent="addWorkshop">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle
            title="Create Main Event"
            back="/admin/workshop"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="form.title"
            label="Main Event Title"
          ></v-text-field>
          <v-text-field
            v-model="form.link"
            label="Main Event Google Form Link"
          ></v-text-field>
          <ClientOnly placeholder="Loading TinyMCE Cloud">
            <Editor
              v-model="form.description"
              placeholder="Main Event Description"
              :api-key="tinyApiKey"
              :init="tinymceConfig"
            />
          </ClientOnly>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
          <LazyAdminSharedImageUpload title="Main Event Image" :form="form" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
