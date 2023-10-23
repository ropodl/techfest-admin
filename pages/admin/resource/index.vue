<script setup>
import { Icon } from "@iconify/vue";
import { VDataTableServer } from "vuetify/lib/labs/components.mjs";

const resource = useResource();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Resources",
});

const headers = [
  {
    title: "Image",
    key: "image",
    align: "start",
    sortable: false,
  },
  {
    title: "Title",
    key: "title",
    align: "start",
    sortable: false,
  },
];

const loading = ref(true);
const itemsPerPage = ref(10);
// Table select and delete
const selected = ref([]);
// Table select and delete
const pagination = ref({
  totalPage: 0,
  totalItems: 0,
  itemsPerPage: itemsPerPage.value,
  currentPage: 1,
});
const loadResources = async ({ page, itemsPerPage }) => {
  loading.value = true;
  await resource.getAllResources(page, itemsPerPage);
  pagination.value = resource.resources.pagination;
  loading.value = false;
};
</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">Resources</div>
      </v-col>
      <v-col cols="12" md="4">
        <!-- {{ searchBlog }}{{ searchItem }} -->
        <!-- <v-autocomplete hide-details hide-no-data v-model="searchItem" @update:modelValue="search" rounded="pill" variant="solo-filled" placeholder="Search Blog" menu-icon="" prepend-inner-icon="mdi-magnify"></v-autocomplete> -->
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <!-- <template v-if="selected.length > 0">
            <v-btn
              icon
              variant="tonal"
              class="mr-3"
              :loading="refresh"
              @click="deleteBulk"
            >
              <v-icon>
                <Icon icon="mdi:bin-outline" />
              </v-icon>
            </v-btn>
          </template> -->
          <!-- <v-btn
            icon
            variant="tonal"
            class="mr-3"
            :loading="refresh"
            @click="reload"
          >
            <v-icon>
              <Icon icon="mdi:reload" />
            </v-icon>
          </v-btn> -->
          <v-btn
            variant="tonal"
            height="40"
            class="text-capitalize"
            to="/admin/resource/create"
          >
            <v-icon start><Icon icon="mdi:plus" /></v-icon>
            Add new Resource
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- v-model="selected" -->
        <!-- :search="search" -->
        <v-data-table-server
          show-select
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="resource.resources.resources"
          :loading="false"
          :items-length="10"
          item-value="id"
          @update:options="loadResources"
        >
          <template v-slot:item.title="{ item }">
            <v-list lines="three" width="300">
              <v-list-item>
                <v-list-item-title class="font-weight-bold">{{
                  item.title
                }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.excerpt }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </template>
          <!-- <template v-slot:item.categories="{ item }">
              <template v-for="(cat, i) in item.categories">
                {{ cat.title }}
                <span v-if="i + 1 != item.categories.length">, </span>
              </template>
            </template> -->
          <!-- <template v-slot:item.tags="{ item }">
            <template v-for="(tag, i) in item.tags">
              <v-chip
                rounded="sm"
                size="large"
                :class="[i + 1 != item.tags.length ? 'mr-2' : '']"
              >
                {{ tag.title }}
              </v-chip>
            </template>
          </template> -->
          <!-- <template v-slot:item.actions="{ item }">
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
          </template> -->
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>
