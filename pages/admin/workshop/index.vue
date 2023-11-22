<script setup>
import { Icon } from "@iconify/vue";
// import { VDataTableServer } from "vuetify/lib/labs/components.mjs";

const workshop = useWorkshop();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Main Events",
});

const loading = ref(true);

const selected = ref([]);

const loadWorkshop = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  await workshop.getAllWorkshops(page, itemsPerPage);
  loading.value = false;
};

const deleteBulk = async () => {
  loading.value = true;
  await workshop.removeBulk(selected);
  selected.value = [];
  loading.value = false;
};
</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <LazyAdminSharedPageTitle title="All Main Events" />
      </v-col>
      <v-col cols="12" md="4"></v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length">
            <v-btn
              icon
              height="48"
              rounded="lg"
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
            height="48"
            rounded="lg"
            variant="tonal"
            class="text-capitalize"
            to="/admin/workshop/create"
          >
            <v-icon start><Icon icon="mdi:plus" /></v-icon>
            Add new Main Event
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
            v-model:items-per-page="workshop.pagination.itemsPerPage"
            :headers="workshop.headers"
            :items="workshop.workshops"
            :loading="loading"
            :items-length="workshop.pagination.totalItems"
            item-value="id"
            @update:options="loadWorkshop"
          >
            <template v-slot:item.image="{ item }">
              <div class="py-3" style="width: 150px; height: 100px">
                <v-img
                  cover
                  class="w-100 h-100 rounded-lg"
                  :src="item.workshopImage.url"
                ></v-img>
              </div>
            </template>
            <template v-slot:item.title="{ item }">
              <v-list lines="three" width="300">
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    <template v-if="item.status === 'Draft'">
                      <span class="text-warning">{{ item.status }} -</span>
                    </template>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                height="48"
                rounded="lg"
                color="info"
                variant="tonal"
                class="mr-2"
                :href="item.link"
                target="_blank"
              >
                <v-icon>
                  <Icon icon="mdi:open-in-new" />
                </v-icon>
              </v-btn>
              <v-btn
                icon
                height="48"
                rounded="lg"
                color="success"
                variant="tonal"
                class="mr-2"
                :to="`/admin/workshop/${item.id}`"
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
                    height="48"
                    rounded="lg"
                    color="error"
                    variant="tonal"
                  >
                    <v-icon>
                      <Icon icon="mdi:delete" />
                    </v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card title="Delete Workshop">
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
                        @click="workshop.remove(item.id)"
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
