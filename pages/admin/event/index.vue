<script setup>
import { Icon } from "@iconify/vue";

const event = useEvent();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Events",
});

const loading = ref(true);
// Search
const search = ref("");
// Table item select / delete
const selected = ref([]);
const loadEvents = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  await event.getAllEvents(page, itemsPerPage);
  loading.value = false;
};
const deleteBulk = async () => {
  await event.removeBulk(selected.value);
  selected.value = [];
};
</script>
<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <LazyAdminSharedPageTitle title="All Events" />
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
            to="/admin/event/create"
          >
            <v-icon start> <Icon icon="mdi:plus" /> </v-icon>Add new Event
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
            v-model:items-per-page="event.pagination.itemsPerPage"
            :headers="event.headers"
            :items="event.events"
            :loading="loading"
            :items-length="event.pagination.totalItems"
            item-value="id"
            @update:options="loadEvents"
          >
            <template v-slot:item.image="{ item }">
              <div class="py-3" style="width: 150px; height: 100px">
                <v-img
                  cover
                  class="w-100 h-100 rounded-lg"
                  :src="item.eventImage.url"
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
                rounded="lg"
                height="48"
                color="info"
                variant="tonal"
                class="mr-2"
                target="_blank"
                :href="item.link"
              >
                <v-icon>
                  <Icon icon="mdi:open-in-new" />
                </v-icon>
              </v-btn>
              <v-btn
                icon
                rounded="lg"
                height="48"
                color="success"
                variant="tonal"
                class="mr-2"
                :to="`/admin/event/${item.id}`"
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
                  <v-card title="Delete Event">
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
                        @click="event.remove(item.id)"
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
