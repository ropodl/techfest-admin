<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";

const route = useRoute();
const workshop = useWorkshop();
const snackbar = useSnackbar();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Edit Workshop",
});

const form = reactive({
  image: null,
  title: "",
  description: "",
  status: "Draft",
});

const loading = ref(true);
onMounted(() => {
  nextTick(() => {
    getWorkshop();
  });
});

const getWorkshop = async () => {
  const res = await workshop.getWorkshop(route.params.id);
  if (res._id) {
    form.image = res.workshopImage.url;
    form.title = res.title;
    form.description = res.description;
    form.status = res.status;
  }
};

const updateWorkshop = () => {
  if (form.image == null)
    return snackbar.showSnackbar("Workshop Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  workshop.updateWorkshop(formData, route.params.id);
};
</script>
<template>
  <v-form @submit.prevent="updateWorkshop">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle
            title="Edit Workshop"
            back="/admin/workshop"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="form.title"
            label="Workshop Title"
          ></v-text-field>
          <ClientOnly placeholder="Loading TinyMCE Cloud">
            <Editor
              v-model="form.description"
              placeholder="Workshop Description"
              :api-key="tinyApiKey"
              :init="tinymceConfig"
            />
          </ClientOnly>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
          <LazyAdminSharedImageUpload title="Workshop Image" :form="form" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
