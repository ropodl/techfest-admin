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
            <v-dialog persistent scrim="black" width="1000">
              <template v-slot:activator="{ props: dialog }">
                <v-hover v-slot="{ isHovering, props: hover }">
                  <v-card
                    variant="text"
                    v-bind="{ ...dialog, ...hover }"
                    color="transparent"
                    class="h-100"
                  >
                    <v-img
                      cover
                      height="250"
                      class="px-2 pb-2 align-end rounded-lg"
                      :class="isHovering ? 'zoom-image' : ''"
                      :src="event.eventImage.url"
                      :alt="event.eventImage.name"
                      gradient="180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(var(--v-theme-primary),1) 100%"
                    >
                      <v-tooltip
                        text="Click to learn more"
                        content-class="primary"
                        location="bottom"
                      >
                        <template v-slot:activator="{ props }">
                          <v-btn
                            icon
                            size="small"
                            v-bind="props"
                            variant="tonal"
                            class="position-absolute rounded-t-0 rounded-e-0"
                            style="top: 0; right: 0"
                          >
                            <v-icon>
                              <Icon icon="mdi:arrow-top-right" />
                            </v-icon>
                          </v-btn>
                        </template>
                      </v-tooltip>
                    </v-img>
                    <v-card-title
                      class="text-h5 font-weight-regular line-clamp-3 text-white px-0"
                      v-text="event.title"
                    ></v-card-title>
                    <!-- <v-card flat color="transparent">
                    </v-card> -->
                  </v-card>
                </v-hover>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card border>
                  <v-row no-gutters>
                    <v-col cols="12" md="5">
                      <v-img
                        cover
                        height="500"
                        :src="event.eventImage.url"
                        :alt="event.eventImage.name"
                        style="position: sticky; top: 0"
                      ></v-img>
                    </v-col>
                    <v-col cols="12" md="7" class="position-relative">
                      <v-btn
                        icon
                        variant="tonal"
                        color="white"
                        class="position-absolute right-0 rounded-t-0 rounded-e-0"
                        @click="isActive.value = false"
                      >
                        <v-icon icon>
                          <Icon icon="mdi:close" />
                        </v-icon>
                      </v-btn>
                      <v-card-title
                        v-text="event.title"
                        class="pt-10 text-h3"
                        style="line-height: normal; white-space: unset"
                      ></v-card-title>
                      <v-divider></v-divider>
                      <div
                        class="position-sticky"
                        style="top: 0; background-color: rgb(33, 33, 33)"
                      >
                        <v-card-text>
                          <v-row no-gutters align="center">
                            <v-col cols="12" sm="6" md="8">
                              <div class="mb-3 mb-sm-0">
                                <v-avatar color="error">
                                  <v-icon>
                                    <Icon color="white" icon="mdi:lock" />
                                  </v-icon>
                                </v-avatar>
                                <span class="ml-3">Not registered, yet?</span>
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-btn
                                block
                                variant="tonal"
                                class="text-capitalize"
                                target="_blank"
                                :href="event.link"
                                >Register Now</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                      </div>
                      <v-card-text>
                        <LazySharedDynamicContent
                          :content="event.description"
                        />
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </template>
            </v-dialog>
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
