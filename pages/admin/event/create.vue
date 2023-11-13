<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";

const event = useEvent();
const snackbar = useSnackbar();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Event",
});

const form = reactive({
  image: null,
  title: "",
  link: "",
  description: "",
  status: "Draft",
});

const loading = ref(false);

onMounted(() => {
  nextTick(() => {
    event.getAllEvents(1, -1);
  });
});

const addEvent = async () => {
  loading.value = true;
  if (form.image == null)
    return snackbar.showSnackbar("Event Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  await event.create(formData);
};
</script>
<template>
  <v-container>
    <v-form @submit.prevent="addEvent">
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Add New Event" back="/admin/event" />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field label="Event Title" v-model="form.title"></v-text-field>
          <v-text-field
            label="Event's Google Form Link'"
            v-model="form.link"
            persistent-hint
            hint="Insert linkw with https://"
          ></v-text-field>
          <v-card flat rounded="0" class="ext-editor mb-10">
            <ClientOnly placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.description"
                placeholder="Event Description"
                :api-key="tinyApiKey"
                :init="tinymceConfig"
              />
            </ClientOnly>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
          <LazyAdminSharedImageUpload :form="form" title="Event Image" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
