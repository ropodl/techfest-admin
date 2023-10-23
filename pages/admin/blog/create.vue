<script setup>
import { Icon } from "@iconify/vue";
import Editor from "@tinymce/tinymce-vue";
import { tinymceConfig } from "../../../utils/tinymce";

const blog = useBlog();
const category = useCategory();
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
  categories: [],
  image: null,
  status: "Draft",
});
// Image Upload
const file = shallowRef();
const url = useObjectUrl(file);
// Image Upload
// After create
const loading = ref(false);

onMounted(() => {
  nextTick(() => {
    category.getAllCategories(1, -1);
  });
});

// temporary for thumbnail
const selectFeaturedImage = ({ target }) => {
  const { value, files, name } = target;
  if (name === "image") {
    file.value = files[0];
    form.image = files[0];
    console.log(form.image);
    return;
  }
};
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
  {{ form }}
  <v-container>
    <v-form @submit.prevent="addBlog">
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Add New Blog" back="/admin/blog" />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field label="Blog Title" v-model="form.title"></v-text-field>
          <v-card flat rounded="0" class="ext-editor mb-10">
            <client-only placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.content"
                placeholder="Blog Content"
                api-key="13zhwdufb9fbf9owvry9zsuazna4wwrt77wo2wje0tteg2b6"
                :init="tinymceConfig"
              />
            </client-only>
          </v-card>
          <v-textarea label="Blog Excerpt" v-model="form.excerpt"></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
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
          <v-card class="mb-3">
            <v-card-title>Featured Image</v-card-title>
            <v-divider></v-divider>
            <v-card-text
              class="d-flex align-center justify-center position-relative pa-0"
            >
              <template v-if="form.image !== null">
                <v-hover v-slot="{ isHovering, props }">
                  <v-img cover v-bind="props" :src="url" height="200">
                    <v-overlay
                      contained
                      :model-value="isHovering"
                      content-class="w-100 h-100 d-flex align-center justify-center"
                      scrim="black"
                    >
                      <v-btn icon color="error" @click="form.image = null">
                        <Icon icon="mdi:close" />
                      </v-btn>
                    </v-overlay>
                  </v-img>
                </v-hover>
              </template>
              <template v-else>
                <input
                  @change="selectFeaturedImage"
                  type="file"
                  name="image"
                  class="py-4"
                />
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
