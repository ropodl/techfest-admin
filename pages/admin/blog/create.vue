<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";

const blog = useBlog();
const snackbar = useSnackbar();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Blog",
});

const form = reactive({
  title: "",
  excerpt: "",
  content: "",
  image: null,
  status: "Draft",
});

const loading = ref(false);
const addBlog = async () => {
  loading.value = true;
  if (form.image == null)
    return snackbar.showSnackbar("Featured Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  await blog.create(formData);
};
</script>
<template>
  <v-container>
    <v-form @submit.prevent="addBlog">
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Add New Blog" back="/admin/blog" />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field label="Blog Title" v-model="form.title"></v-text-field>
          <v-card flat rounded="0" class="ext-editor mb-10">
            <ClientOnly placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.content"
                placeholder="Blog Content"
                :api-key="tinyApiKey"
                :init="tinymceConfig"
              />
            </ClientOnly>
          </v-card>
          <v-textarea label="Blog Excerpt" v-model="form.excerpt"></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
          <LazyAdminSharedImageUpload :form="form" title="Featured Image" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
