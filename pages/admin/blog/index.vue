<script setup>
import { Icon } from "@iconify/vue";
import { VDataTableServer } from "vuetify/labs/VDataTable";

const blog = useBlog();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Blogs",
});

const headers = [
  {
    title: "Featured Image",
    key: "image",
    align: "start",
    sortable: false,
  },
  {
    title: "Title",
    align: "start",
    sortable: false,
    key: "title",
  },
  { title: "Categories", align: "center", sortable: false, key: "categories" },
  {
    title: "Actions",
    align: "center",
    sortable: false,
    width: 200,
    key: "actions",
  },
];

const loading = ref(true);
const itemsPerPage = ref(10);
// Search
const search = ref("");
// Table item select / delete
const selected = ref([]);
const deleteBulk = async () => {
  await blog.removeBulk(selected.value);
  selected.value = [];
};
// server side table
const pagination = ref({
  totalPage: 0,
  totalItems: 0,
  itemsPerPage: itemsPerPage.value,
  currentPage: 1,
});

const loadBlogs = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  await blog.getAllBlogs(page, itemsPerPage);
  pagination.value = blog.blogs.pagination;
  loading.value = false;
};
</script>
<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <LazyAdminSharedPageTitle title="All Blogs" />
      </v-col>
      <v-col cols="12" md="4">
        <!-- {{ searchBlog }}{{ searchItem }} -->
        <!-- <v-autocomplete
          hide-details
          hide-no-data
          v-model="searchItem"
          @update:modelValue="search"
          density="compact"
          rounded="pill"
          variant="solo-filled"
          placeholder="Search Blog"
          menu-icon=""
          prepend-inner-icon="mdi-magnify"
        ></v-autocomplete> -->
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn
              icon
              height="40"
              variant="tonal"
              class="mr-3"
              :loading="refresh"
              @click="deleteBulk"
            >
              <v-icon> <Icon icon="mdi:bin-outline" /> </v-icon>
            </v-btn>
          </template>
          <v-btn
            variant="tonal"
            height="40"
            class="text-capitalize"
            to="/admin/blog/create"
          >
            <v-icon start> <Icon icon="mdi:plus" /> </v-icon>Add new Blog
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table-server
          show-select
          v-model="selected"
          v-model:items-per-page="pagination.itemsPerPage"
          :headers="headers"
          :items="blog.blogs.blogs"
          :loading="loading"
          :items-length="pagination.totalItems"
          :search="search"
          item-value="id"
          @update:options="loadBlogs"
        >
          <template v-slot:item.image="{ item }">
            <div class="py-3" style="width: 150px; height: 100px">
              <v-img
                contain
                class="w-100 h-100"
                :src="item.featuredImage.url"
              ></v-img>
            </div>
          </template>
          <template v-slot:item.title="{ item }">
            <v-list lines="three">
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  <template v-if="item.status === 'Draft'">
                    <span class="text-warning">{{ item.status }} -</span>
                  </template>
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ item.excerpt }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </template>
          <template v-slot:item.categories="{ item }">
            <template v-for="(cat, i) in item.categories">
              {{ cat.title
              }}<span v-if="i + 1 != item.categories.length">, </span>
            </template>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              color="success"
              variant="tonal"
              class="mr-2"
              :to="`/admin/blog/${item.slug}`"
            >
              <v-icon>
                <Icon icon="mdi:pencil" />
              </v-icon>
            </v-btn>
            <v-dialog persistent scrim="black" width="500">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon color="error" variant="tonal">
                  <v-icon>
                    <Icon icon="mdi:delete" />
                  </v-icon>
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card title="Delete Blog">
                  <v-card-text class="mb-3">
                    Are you sure you want to delete "{{ item.title }}"? This
                    action cannot be undone.
                  </v-card-text>
                  <v-card-text class="pa-0">
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-btn
                          block
                          rounded="0"
                          variant="tonal"
                          color="success"
                          height="50"
                          text="Cancel"
                          class="text-capitalize"
                          @click="isActive.value = false"
                        ></v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn
                          block
                          rounded="0"
                          variant="tonal"
                          color="error"
                          height="50"
                          text="Delete"
                          class="text-capitalize"
                          @click="blog.remove(item.id)"
                        ></v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>
