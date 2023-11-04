<script setup>
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Blogs",
});

onMounted(() => {
  nextTick(() => {
    getAllBlogs();
  });
});

const loading = ref(true);
const blogs = ref([]);
const pagination = ref({});
const getAllBlogs = async () => {
  loading.value = true;
  const { data, error } = await useFetch(runtimeConfig.public.api_url + "/frontend/blog")
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  console.log(data.value);
  blogs.value = data.value.blogs;
  pagination.value = data.value.pagination;
  loading.value = false;
}

const updatePage = async (page) => {
  loading.value = true;
  useScrollTo("__nuxt", 0);
  await blog.getAllBlogs(page, 12);
  loading.value = false;
};
</script>

<template>
  - further testing required
  <v-container>
    <v-row>
      <template v-if="loading">
        <v-col cols="12" md="3" v-for="i in 12">
          <v-skeleton-loader :loading="loading" width="100%" height="400" class="rounded-lg overflow-hidden"
            type="image"></v-skeleton-loader>
        </v-col>
      </template>
      <template v-else>
        <template v-if="blogs.length">
          <v-col cols="12" md="3" v-for="blog in blogs">
            <v-card :to="'/blog/' + blog.slug">
              <v-img cover height="400" class="px-2 pb-2 align-end" :src="blog.featuredImage?.url"
                :alt="blog.featuredImage?.name">
                <v-card>
                  <v-card-title class="line-clamp-3" v-text="blog.title"
                    style="white-space: unset !important"></v-card-title>
                </v-card>
              </v-img>
            </v-card>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="12">
            <v-card>
              <v-card-text>Sorry, content not available.</v-card-text>
            </v-card>
          </v-col>
        </template>
      </template>
    </v-row>
    <template v-if="!loading">
      <template v-if="blogs.length">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-pagination v-model="pagination.currentPage" rounded="circle" :length="pagination.totalPage"
              total-visible="10" @update:model-value="updatePage"></v-pagination>
          </v-col>
        </v-row>
      </template>
    </template>
  </v-container>
</template>
