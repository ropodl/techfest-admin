<script setup>
import { Icon } from "@iconify/vue";

const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Events",
});

onMounted(() => {
  nextTick(() => {
    getAllEvents();
  });
});

const events = ref([]);
const loading = ref(true);
const getAllEvents = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/event"
  );
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  events.value = data.value;
  loading.value = false;
};
</script>

<template>
  <v-container>
    <v-row>
      <template v-if="loading">
        <v-col cols="12" md="3" v-for="i in 12">
          <v-skeleton-loader type="image" height="400"></v-skeleton-loader>
        </v-col>
      </template>
      <template v-else>
        <template v-if="events.length">
          <v-col cols="12" sm="6" md="4" v-for="(event, i) in events">
            <v-hover v-slot="{ isHovering, props: hover }">
              <v-card
                variant="text"
                v-bind="{ ...dialog, ...hover }"
                color="transparent"
                class="h-100"
                :to="'/pre-events/' + event.id"
              >
                <v-img
                  border
                  cover
                  height="250"
                  class="px-2 pb-2 align-end rounded-lg"
                  :class="isHovering ? 'zoom-image' : ''"
                  :src="event.eventImage.url"
                  :alt="event.eventImage.name"
                  gradient="180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(var(--v-theme-primary),1) 100%"
                ></v-img>
                <v-card-title
                  class="text-h5 font-weight-regular line-clamp-3 text-white px-0"
                  v-text="event.title"
                ></v-card-title>
              </v-card>
            </v-hover>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="12">
            <LazySharedEmpty />
          </v-col>
        </template>
      </template>
    </v-row>
  </v-container>
</template>
