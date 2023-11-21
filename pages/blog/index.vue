<script setup>
import { formatTimeAgo } from "@vueuse/core";

const runtimeConfig = useRuntimeConfig();

useHead({
  title: "Blogs",
});

definePageMeta({
  layout: "with-page-title",
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
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/blog"
  );
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  // console.log(data.value);
  blogs.value = data.value.blogs;
  pagination.value = data.value.pagination;
  loading.value = false;
};

const updatePage = async (page) => {
  loading.value = true;
  useScrollTo("__nuxt", 0);
  await blog.getAllBlogs(page, 12);
  loading.value = false;
};
</script>

<template>
  <v-container>
    <v-row>
      <template v-if="loading">
        <v-col cols="12" md="4" v-for="i in 12">
          <v-skeleton-loader
            :loading="loading"
            width="100%"
            height="400"
            class="rounded-lg overflow-hidden"
            type="image"
          ></v-skeleton-loader>
        </v-col>
      </template>
      <template v-else>
        <template v-if="blogs.length">
          <v-col cols="12" sm="6" md="6" lg="4" v-for="blog in blogs">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                variant="text"
                v-bind="props"
                color="transparent"
                class="h-100"
                :to="'/blog/' + blog.slug"
              >
                <v-img
                  height="250"
                  cover
                  class="border px-2 pb-2 align-end rounded-lg"
                  :class="isHovering ? 'zoom-image' : ''"
                  :src="blog.featuredImage?.url"
                  :alt="blog.featuredImage?.name"
                ></v-img>
                <v-card-text
                  class="text-primary text-button font-weight-regular pb-0 px-0"
                >
                  [ {{ formatTimeAgo(new Date(blog.createdAt)) }} ]
                </v-card-text>
                <v-card-title
                  class="text-h5 font-weight-regular line-clamp-3 text-white px-0"
                  v-text="blog.title"
                  style="white-space: unset !important"
                ></v-card-title>
              </v-card>
            </v-hover>
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
            <v-pagination
              v-model="pagination.currentPage"
              rounded="circle"
              :length="pagination.totalPage"
              total-visible="10"
              @update:model-value="updatePage"
            ></v-pagination>
          </v-col>
        </v-row>
      </template>
    </template>
  </v-container>
</template>
