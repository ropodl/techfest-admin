<script setup>
import { Icon } from "@iconify/vue";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const event = ref({});
const loading = ref(true);

useHead({
  script: {
    src: "https://platform-api.sharethis.com/js/sharethis.js#property=6556884c645def0013d4a968&product=sop",
    async: true,
  },
});

onMounted(() => {
  nextTick(async () => {
    getPreEvent();
  });
});

const getPreEvent = async () => {
  loading.value = true;
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/event/" + route.params.id
  );
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  event.value = data.value;
  useHead({
    title: event.value.title,
  });
  loading.value = false;
};
</script>

<template>
  <div style="height: 60px"></div>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <v-card border class="position-sticky" style="top: 70px">
          <v-skeleton-loader
            color="transparent"
            :loading="loading"
            width="100%"
            height="500"
            type="image"
          >
            <v-img
              max-height="600"
              :src="event.eventImage?.url"
              :alt="event.eventImage?.name"
            ></v-img>
          </v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="7">
        <template v-if="loading">
          <v-skeleton-loader
            color="transparent"
            :loading="loading"
            width="100%"
            height="500"
            type="article@3"
          ></v-skeleton-loader>
        </template>
        <template v-else>
          <v-card-title
            v-text="event.title"
            class="text-h3"
            style="line-height: normal; white-space: unset"
          ></v-card-title>
          <div class="sharethis-inline-share-buttons mb-3"></div>
          <v-card
            border
            flat
            class="position-sticky"
            style="
              background-color: rgba(33, 33, 33, 0.8);
              backdrop-filter: blur(8px);
              top: 70px;
            "
          >
            <v-card-text>
              <v-row align="center">
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
                    text="Register Now"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card-text>
            <LazySharedDynamicContent :content="event.description" />
          </v-card-text>
        </template>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-container class="pb-0">
    <v-row>
      <v-col cols="12">
        <v-card border elevation="0" rounded="xl">
          <v-skeleton-loader
            color="transparent"
            :loading="loading"
            width="100%"
            height="600"
            type="image"
          >
            <v-img
              cover
              :aspect-ratio="16 / 9"
              max-height="550"
              class="align-end"
              :src="post.featuredImage?.url"
              gradient="180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 100%"
            >
              <v-container>
                <v-row>
                  <v-col cols="12" md="12">
                    <div
                      class="text-h2 font-weight-bold"
                      style="
                        white-space: unset !important;
                        text-shadow: 2px 2px rgba(0, 0, 0, 0.6);
                      "
                      v-text="post.title"
                    ></div>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-skeleton-loader
      :loading="loading"
      :color="loading ? '' : 'transparent'"
      width="100%"
      height="100"
      type="image"
    >
      <v-col cols="12" md="12" class="pl-0">
        <div class="text-h4 font-weight-light" v-text="post.excerpt"></div>
      </v-col>
    </v-skeleton-loader>
    <v-row>
      <v-col cols="12" md="3">
        <v-card flat color="transparent" style="position: sticky; top: 70px">
          <v-card-text class="px-0 text-overline">
            Published at: {{ formatTimeAgo(new Date(post.createdAt)) }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="px-0">Share on Social Media</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card flat color="transparent">
          <v-card-text class="pb-0">
            <v-skeleton-loader
              :loading="loading"
              :color="loading ? '' : 'transparent'"
              type="article"
            >
              <ClientOnly>
                <LazySharedDynamicContent :content="post['content']" />
              </ClientOnly>
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container> -->
</template>
