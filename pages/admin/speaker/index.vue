<script setup>
import { Icon } from "@iconify/vue";
import { VDataTableServer } from "vuetify/lib/labs/components.mjs";

const speaker = useSpeaker();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Speakers",
});

const headers = [
  {
    title: "Image",
    key: "image",
    align: "start",
    sortable: false,
  },
  {
    title: "Name",
    key: "name",
    align: "start",
    sortable: false,
  },
  {
    title: "Position",
    key: "position",
    align: "start",
    sortable: false,
  },
  {
    title: "Description",
    key: "description",
    align: "start",
    sortable: false,
  },
  {
    title: "Actions",
    key: "actions",
    align: "center",
    sortable: false,
  },
];

const loading = ref(true);
const itemsPerPage = ref(10);
const selected = ref([]);
const pagination = ref({
  totalPage: 0,
  totalItems: 0,
  itemsPerPage: itemsPerPage.value,
  currentPage: 1,
});

const loadSpeakers = async ({ page, itemsPerPage }) => {
  loading.value = true;
  await speaker.getAllSpeakers(page, itemsPerPage);
  pagination.value = speaker.speakers.pagination;
  loading.value = false;
};

// Bulk Delete
const deleteBulk = () => {
  console.log(selected);
};
</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">Speakers</div>
      </v-col>
      <v-col cols="12" md="4">
        <!-- {{ searchBlog }}{{ searchItem }} -->
        <!-- <v-autocomplete hide-details hide-no-data v-model="searchItem" @update:modelValue="search" rounded="pill" variant="solo-filled" placeholder="Search Blog" menu-icon="" prepend-inner-icon="mdi-magnify"></v-autocomplete> -->
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn
              icon
              variant="tonal"
              height="40"
              class="mr-3"
              :loading="refresh"
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
            class="text-capitalize px-10"
            to="/admin/speaker/create"
          >
            Add new Speaker
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table-server
          show-select
          v-model="selected"
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="speaker.speakers.speakers"
          :loading="loading"
          :items-length="pagination.totalItems"
          item-value="id"
          @update:options="loadSpeakers"
        >
          <template v-slot:item.image="{ item }">
            <div class="py-3" style="width: 150px; height: 100px">
              <v-img class="w-100 h-100" :src="item.speakerImage.url"></v-img>
            </div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              color="success"
              variant="tonal"
              class="mr-2"
              :to="`/admin/speaker/${item.id}`"
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
                <v-card title="Delete Speaker">
                  <v-card-text class="mb-3">
                    Are you sure you want to delete "{{ item.name }}"? This
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
                          @click="speaker.remove(item.id)"
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