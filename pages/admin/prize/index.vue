<script setup>
import { Icon } from "@iconify/vue";
import { VDataTableServer } from "vuetify/lib/labs/components.mjs";

const blog = useBlog();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Prizes",
});

const loading = ref(true);

const selected = ref([]);

const deleteBulk = async () => {
  console.log("delete bulk");
};

const loadPrize = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  console.log({ page, itemsPerPage, sortBy });
  loading.value = false;
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <LazyAdminSharedPageTitle title="All Prizes" />
      </v-col>
      <v-col cols="12" md="4"></v-col>
      <v-col cols="12" md="4">
        <div class="d-flex justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn
              icon
              height="40"
              variant="tonal"
              class="mr-3"
              @click="deleteBulk"
            >
              <v-icon>
                <Icon icon="mdi:bin-outline" />
              </v-icon>
            </v-btn>
          </template>
          <v-btn
            variant="tonal"
            height="40"
            class="text-capitalize"
            to="/admin/prize/create"
          >
            <v-icon start>
              <Icon icon="mdi:plus" />
            </v-icon>
            Add New Prize
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
          @update:options="loadPrize"
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
