<script setup>
import { Icon } from "@iconify/vue";
import { VDataTableServer } from "vuetify/labs/VDataTable";

const category = useCategory();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Categories",
});

const loading = ref(true);
const selected = ref([]);

const form = reactive({
  title: "",
  description: "",
});

const loadCategories = async ({ page, itemsPerPage }) => {
  loading.value = true;
  await category.getAllCategories(page, itemsPerPage);
  loading.value = false;
};

const addCategory = async () => {
  loading.value = true;
  await category.create(form);
  await category.getAllCategories(1, 10);
  loading.value = false;
};

const deleteCategory = async (id) => {
  loading.value = true;
  await category.remove(id);
  await category.getAllCategories(1, 10);
  loading.value = false;
};

const deleteBulk = async () => {
  await category.removeBulk(selected.value);
  selected.value = [];
};
</script>
<template>
  -Add validation -Not working properly -Remove categories from sponsor level
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <LazyAdminSharedPageTitle title="All Sponsor Levels" />
      </v-col>
      <v-col cols="12" md="4"></v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn
              icon
              height="40"
              variant="tonal"
              class="mr-3"
              @click="deleteBulk"
            >
              <v-icon><Icon icon="mdi:bin-outline" /></v-icon>
            </v-btn>
          </template>
          <v-btn
            v-bind="props"
            height="40"
            variant="tonal"
            class="text-capitalize"
            to="/admin/sponsor/level/create/"
          >
            <v-icon start>
              <Icon icon="mdi:plus" />
            </v-icon>
            Add New Sponsor Level
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-data-table-server
          show-select
          v-model="selected"
          v-model:items-per-page="category.pagination.itemsPerPage"
          :headers="category.headers"
          :items="category.categories"
          :loading="loading"
          :items-length="category.pagination.totalItems"
          item-value="id"
          @update:options="loadCategories"
        >
          <template v-slot:item.actions="{ item }">
            <v-dialog persistent scrim="black" width="500">
              <template v-slot:activator="{ props }">
                <v-btn
                  size="small"
                  v-bind="props"
                  icon
                  color="error"
                  variant="tonal"
                >
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
                          @click="deleteCategory(item.id)"
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
