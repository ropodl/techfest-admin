<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";

const blog = useBlog();
const category = useCategory();
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
  categories: [],
  image: null,
  visibility: "Public",
  status: "Draft",
});

const postId = ref("")
onMounted(() => {
  nextTick(async () => {
    // Call blog with slug
    const res = await blog.getBlog(route.params.slug);
    // Format categories to array and store in form
    const categories = res.categories.map((category) => {
      const { _id } = category;
      return _id;
    });
    postId.value = res._id
    form.title = res.title;
    form.excerpt = res.excerpt;
    form.content = res.content;
    form.categories = categories;
    form.visibility = res.visibility;
    form.status = res.status;
    form.image = res.featuredImage.url;
    category.getAllCategories(1, 10);
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
    navigateTo("/admin/blog");
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
          <v-card class="mb-3">
            <v-card-title>Categories</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <template v-for="(item, i) in category.categories">
                <v-checkbox
                  v-model="form.categories"
                  hide-details
                  :label="item['title']"
                  :value="item['id']"
                  density="compact"
                  class="text-capitalize"
                ></v-checkbox>
              </template>
            </v-card-text>
          </v-card>
          <LazyAdminSharedImageUpload :form="form" title="Featured Image" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
