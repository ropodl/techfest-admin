<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";
import { useDate } from "vuetify/lib/framework.mjs";

const event = useEvent();
const snackbar = useSnackbar();
const route = useRoute();
const date = useDate();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Edit Event",
});

const form = reactive({
  image: null,
  title: "",
  link: "",
  date: "",
  time: "",
  description: "",
  status: "Draft",
});

onMounted(() => {
  nextTick(async () => {
    const res = await event.getEvent(route.params.id);
    form.title = res.title;
    form.link = res.link;
    form.date = new Date(res.date);
    form.description = res.description;
    form.status = res.status;
    form.image = res.eventImage.url;
  });
});

const updateEvent = () => {
  if (form.image == null)
    return snackbar.showSnackbar("Event Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  event.updateEvent(formData, route.params.id);
};

const removeEvent = async () => {
  await event.remove(route.params.id);
  nextTick(() => {
    navigateTo("/admin/event", { replace: true });
  });
};
</script>
<template>
  <v-container>
    <v-form @submit.prevent="updateEvent">
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Edit Event" back="/admin/event" />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field label="Event Title" v-model="form.title"></v-text-field>
          <v-text-field
            label="Event's Google Form Link'"
            v-model="form.link"
            persistent-hint
            hint="Insert link with https://"
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
          <LazyAdminSharedActions :form="form" @remove="removeEvent" />
          <LazyAdminSharedImageUpload :form="form" title="Event Image" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
