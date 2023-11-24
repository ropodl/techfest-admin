<script setup>
import { Icon } from "@iconify/vue";

const blog = useBlog();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Blogs",
});

const loading = ref(true);
// Search
const search = ref("");
// Table item select / delete
const selected = ref([]);
const deleteBulk = async () => {
  await blog.removeBulk(selected.value);
  selected.value = [];
};
const loadBlogs = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  await blog.getAllBlogs(page, itemsPerPage);
  loading.value = false;
};
</script>
<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <LazyAdminSharedPageTitle title="All Blogs" />
      </v-col>
      <v-col cols="12" md="4"> </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn
              icon
              rounded="lg"
              height="48"
              variant="tonal"
              class="mr-3"
              @click="deleteBulk"
            >
              <v-icon> <Icon icon="mdi:bin-outline" /> </v-icon>
            </v-btn>
          </template>
          <v-btn
            rounded="lg"
            variant="tonal"
            height="48"
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
        <v-card border elevation="0" rounded="lg">
          <v-data-table-server
            show-select
            v-model="selected"
            v-model:items-per-page="blog.pagination.itemsPerPage"
            :headers="blog.headers"
            :items="blog.blogs"
            :loading="loading"
            :items-length="blog.pagination.totalItems"
            :search="search"
            item-value="id"
            @update:options="loadBlogs"
          >
            <template v-slot:item.image="{ item }">
              <div class="py-3" style="width: 150px; height: 100px">
                <v-img
                  cover
                  class="w-100 h-100 rounded-lg"
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
                  <v-list-item-subtitle>{{
                    item.excerpt
                  }}</v-list-item-subtitle>
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
                rounded="lg"
                height="48"
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
                  <v-btn
                    v-bind="props"
                    icon
                    rounded="lg"
                    height="48"
                    color="error"
                    variant="tonal"
                  >
                    <v-icon>
                      <Icon icon="mdi:delete" />
                    </v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card border title="Delete Blog">
                    <v-card-text>
                      Are you sure you want to delete "{{ item.title }}"? This
                      action cannot be undone.
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        rounded="lg"
                        variant="tonal"
                        color="success"
                        height="50"
                        text="Cancel"
                        class="text-capitalize px-10"
                        @click="isActive.value = false"
                      ></v-btn>
                      <v-btn
                        rounded="lg"
                        variant="tonal"
                        color="error"
                        height="50"
                        text="Delete"
                        class="text-capitalize px-10"
                        @click="blog.remove(item.id)"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
