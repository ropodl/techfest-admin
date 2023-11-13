<script setup>
import { Icon } from "@iconify/vue";
// import { VDataTableServer } from "vuetify/lib/labs/components.mjs";

const speaker = useSpeaker();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Speakers",
});

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
      <v-col cols="12" md="4"> </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn
              icon
              rounded="lg"
              variant="tonal"
              height="48"
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
            rounded="lg"
            variant="tonal"
            height="48"
            class="text-capitalize"
            to="/admin/speaker/create"
          >
            <v-icon start><Icon icon="mdi:plus" /></v-icon>
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
          v-model:items-per-page="speaker.pagination.itemsPerPage"
          :headers="speaker.headers"
          :items="speaker.speakers"
          :loading="loading"
          :items-length="speaker.pagination.totalItems"
          item-value="id"
          @update:options="loadSpeakers"
        >
          <template v-slot:item.image="{ item }">
            <div class="py-3" style="width: 150px; height: 100px">
              <v-img cover class="w-100 h-100 rounded-lg" :src="item.speakerImage.url"></v-img>
            </div>
          </template>
          <template v-slot:item.info="{ item }">
            <v-card flat color="transparent" width="300">
              <v-card-title class="px-0">
                <template v-if="item.status === 'Draft'">
                  <span class="text-warning">{{ item.status }} -</span>
                </template>
                {{ item.name }}
              </v-card-title>
              <v-card-subtitle class="px-0">{{
                item.position
              }}</v-card-subtitle>
            </v-card>
          </template>
          <template v-slot:item.social="{ item }">
            <v-chip variant="text">
              <v-icon
                class="mx-2"
                :color="item.facebook?.length ? 'success' : 'error'"
                size="x-large"
              >
                <Icon icon="fa6-brands:facebook" />
              </v-icon>
              <v-icon
                class="mx-2"
                :color="item.twitter?.length ? 'success' : 'error'"
                size="x-large"
              >
                <Icon icon="fa6-brands:twitter" />
              </v-icon>
              <v-icon
                class="mx-2"
                :color="item.linkedin?.length ? 'success' : 'error'"
                size="x-large"
              >
                <Icon icon="fa6-brands:linkedin" />
              </v-icon>
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              height="48"
              rounded="lg"
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
                <v-card title="Delete Speaker">
                  <v-card-text>
                    Are you sure you want to delete "{{ item.name }}"? This
                    action cannot be undone.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      rounded="48"
                      variant="tonal"
                      color="success"
                      height="50"
                      text="Cancel"
                      class="text-capitalize px-10"
                      @click="isActive.value = false"
                    ></v-btn>
                    <v-btn
                      rounded="48"
                      variant="tonal"
                      color="error"
                      height="50"
                      text="Delete"
                      class="text-capitalize px-10"
                      @click="speaker.remove(item.id)"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>
