<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";

const blog = useBlog();
const snackbar = useSnackbar();
const route = useRoute();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Edit Blog",
});

const form = reactive({
  title: "",
  excerpt: "",
  content: "",
  image: null,
  visibility: "Public",
  status: "Draft",
});

const postId = ref("");
onMounted(() => {
  nextTick(async () => {
    // Call blog with slug
    const res = await blog.getBlog(route.params.slug);
    postId.value = res._id;
    form.title = res.title;
    form.excerpt = res.excerpt;
    form.content = res.content;
    form.visibility = res.visibility;
    form.status = res.status;
    form.image = res.featuredImage.url;
  });
});

const updateBlog = () => {
  if (form.image == null)
    return snackbar.showSnackbar("Featured Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  blog.updateBlog(formData, postId.value);
};

const removeBlog = async () => {
  await blog.remove(postId.value);
  nextTick(() => {
    navigateTo("/admin/blog", { replace: true });
  });
};
</script>
<template>
  <v-container>
    <v-form @submit.prevent="updateBlog">
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Edit Blog" back="/admin/blog" />
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
          <LazyAdminSharedActions :form="form" @remove="removeBlog" />
          <LazyAdminSharedImageUpload :form="form" title="Featured Image" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
