<script setup>
import { Icon } from "@iconify/vue";

const prize = usePrize();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Prizes",
});

const loading = ref(true);

const selected = ref([]);

const deleteBulk = async () => {
  loading.value = true;
  await prize.removeBulk(selected.value);
  selected.value = [];
  loading.value = false;
};

const loadPrize = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  prize.getAllPrizes(page, itemsPerPage);
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
              rounded="lg"
              height="48"
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
            rounded="lg"
            height="48"
            variant="tonal"
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
        <v-card border elevation="0" rounded="lg">
          <v-data-table-server
            show-select
            v-model="selected"
            v-model:items-per-page="prize.pagination.itemsPerPage"
            :headers="prize.headers"
            :items="prize.prizes"
            :loading="loading"
            :items-length="prize.pagination.totalItems"
            item-value="id"
            @update:options="loadPrize"
          >
            <template v-slot:item.image="{ item }">
              <div class="py-3" style="width: 150px; height: 100px">
                <v-img
                  cover
                  class="w-100 h-100 rounded-lg"
                  :src="item.prizeImage?.url"
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
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                color="success"
                variant="tonal"
                rounded="lg"
                height="48"
                class="mr-2"
                :to="`/admin/prize/${item.id}`"
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
                  <v-card border title="Delete Prize">
                    <v-card-text>
                      Are you sure you want to delete "{{ item.title }}"? This
                      action cannot be undone.
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        rounded="lg"
                        height="48"
                        variant="tonal"
                        color="success"
                        text="Cancel"
                        class="text-capitalize px-10"
                        @click="isActive.value = false"
                      ></v-btn>
                      <v-btn
                        rounded="lg"
                        height="48"
                        variant="tonal"
                        color="error"
                        text="Delete"
                        class="text-capitalize px-10"
                        @click="prize.remove(item.id)"
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
