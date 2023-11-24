<script setup>
import { Icon } from "@iconify/vue";

const runtimeConfig = useRuntimeConfig();
const { admin } = useAdmin();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Dashboard",
});

const loading = ref(true);
const counters = ref([]);
// Blog Widget
const blogs = ref([]);
const blogHeaders = [
  {
    title: "Image",
    key: "image",
    width: 0,
    sortable: false,
  },
  {
    title: "Title",
    key: "title",
    sortable: false,
  },
  {
    title: "Actions",
    key: "actions",
    width: 0,
    sortable: false,
  },
];
// Pre-event Widget
const events = ref([]);
const eventHeaders = [
  {
    title: "Image",
    key: "image",
    width: 0,
    sortable: false,
  },
  {
    title: "Title",
    key: "title",
    sortable: false,
  },
  {
    title: "Actions",
    key: "actions",
    width: 0,
    sortable: false,
  },
];
// Workshop Widget
const workshops = ref([]);
const workshopHeaders = [
  {
    title: "Image",
    key: "image",
    width: 0,
    sortable: false,
  },
  {
    title: "Title",
    key: "title",
    sortable: false,
  },
  {
    title: "Actions",
    key: "actions",
    width: 0,
    sortable: false,
  },
];

onMounted(async () => {
  loading.value = true;
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/dashboard"
  );
  if (error.value) return console.log(error.value);
  counters.value = data.value.counter;
  blogs.value = data.value.blogs;
  events.value = data.value.events;
  workshops.value = data.value.workshops;
  loading.value = false;
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">
          Welcome back, {{ admin.name || "User" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <template v-if="counters.length">
        <template v-for="(counter, i) in counters">
          <v-col cols="12" md="3">
            <v-card border>
              <v-card-text
                class="text-h5 font-weight-black pb-0"
                v-text="counter.number"
              />
              <v-card-title v-text="counter.title" />
              <v-icon
                :color="counter.color"
                class="position-absolute"
                style="top: 0; right: -20px; font-size: 100px; z-index: -1"
              >
                <Icon :icon="counter.icon" />
              </v-icon>
            </v-card>
          </v-col>
        </template>
      </template>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card border rounded="lg">
          <v-card-title class="d-flex align-center justify-space-between">
            Pre Events
            <v-btn
              rounded="lg"
              variant="tonal"
              class="text-capitalize"
              to="/admin/event/create"
            >
              <v-icon start>
                <Icon icon="mdi:plus" />
              </v-icon>
              Add New Pre Event
            </v-btn>
          </v-card-title>
          <v-divider border></v-divider>
          <v-data-table-server
            :items-length="3"
            :headers="eventHeaders"
            :items="events"
            :loading="loading"
          >
            <template v-slot:item.image="{ item }">
              <div class="py-3" style="width: 100px; height: 100px">
                <v-img
                  cover
                  class="w-100 h-100 rounded-lg"
                  :src="item.eventImage?.url"
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
                color="success"
                variant="tonal"
                class="mr-2"
                :to="`/admin/event/${item.id}`"
              >
                <v-icon>
                  <Icon icon="mdi:pencil" />
                </v-icon>
              </v-btn>
            </template>
            <template v-slot:bottom />
          </v-data-table-server>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card border rounded="lg">
          <v-card-title class="d-flex align-center justify-space-between">
            Main Events
            <v-btn
              rounded="lg"
              variant="tonal"
              class="text-capitalize"
              to="/admin/workshop/create"
            >
              <v-icon start>
                <Icon icon="mdi:plus" />
              </v-icon>
              Add New Main Event
            </v-btn>
          </v-card-title>
          <v-divider border></v-divider>
          <v-data-table-server
            :items-length="3"
            :headers="workshopHeaders"
            :items="workshops"
            :loading="loading"
          >
            <template v-slot:item.image="{ item }">
              <div class="py-3" style="width: 100px; height: 100px">
                <v-img
                  cover
                  class="w-100 h-100 rounded-lg"
                  :src="item.workshopImage.url"
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
                color="success"
                variant="tonal"
                class="mr-2"
                :to="`/admin/workshop/${item.id}`"
              >
                <v-icon>
                  <Icon icon="mdi:pencil" />
                </v-icon>
              </v-btn>
            </template>
            <template v-slot:bottom />
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card border rounded="lg">
          <v-card-title class="d-flex align-center justify-space-between">
            Blogs
            <v-btn
              rounded="lg"
              variant="tonal"
              class="text-capitalize"
              to="/admin/blog/create"
            >
              <v-icon start>
                <Icon icon="mdi:plus" />
              </v-icon>
              Add New Blog
            </v-btn>
          </v-card-title>
          <v-divider border></v-divider>
          <v-data-table-server
            :items-length="3"
            :headers="blogHeaders"
            :items="blogs"
            :loading="loading"
          >
            <template v-slot:item.image="{ item }">
              <div class="py-3" style="width: 100px; height: 100px">
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
            </template>
            <template v-slot:bottom />
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
