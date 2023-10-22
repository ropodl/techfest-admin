<script setup>
definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Blogs",
});

const blog = useBlog();

const pagination = ref({
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  totalPage: 0,
});

onMounted(() => {
  nextTick(async () => {
    await blog.getAllBlogs(
      pagination.value.currentPage,
      pagination.value.itemsPerPage
    );
    pagination.value = blog.blogs.pagination;
  });
});

const updatePage = (page) => {
  blog.getAllBlogs(page, pagination.value.itemsPerPage);
  pagination.value.currentPage = page;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" v-for="blog in blog.blogs.blogs">
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
    </v-row>
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
  </v-container>
</template>
