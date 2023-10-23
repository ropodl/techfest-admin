<script setup>
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

const blog = useBlog();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Blogs",
});

const loading = ref(true);

onMounted(() => {
  loading.value = true;
  nextTick(async () => {
    await blog.getAllBlogs(blog.pagination.currentPage, 12);
    loading.value = false;
  });
});

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
        <v-col cols="12" md="3" v-for="i in 12">
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
        <v-col cols="12" md="3" v-for="blog in blog.blogs">
          <v-card :to="'/blog/' + blog.slug">
            <v-img
              cover
              height="400"
              class="px-2 pb-2 align-end"
              :src="blog.featuredImage.url"
              :alt="blog.featuredImage.name"
            >
              <v-card>
                <v-card-title
                  class="line-clamp-3"
                  v-text="blog.title"
                  style="white-space: unset !important"
                ></v-card-title>
              </v-card>
            </v-img>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <template v-if="!loading">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-pagination
            v-model="blog.pagination.currentPage"
            rounded="circle"
            :length="blog.pagination.totalPage"
            total-visible="10"
            @update:model-value="updatePage"
          ></v-pagination>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
