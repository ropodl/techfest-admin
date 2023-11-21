<script setup>
import { Icon } from "@iconify/vue";
import { formatTimeAgo } from "@vueuse/core";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { href } = useBrowserLocation();

const post = ref({});
const loading = ref(true);

useHead({
  script: {
    src: "https://platform-api.sharethis.com/js/sharethis.js#property=6556884c645def0013d4a968&product=sop",
    async: true,
  },
});

onMounted(() => {
  nextTick(async () => {
    getBlog();
  });
});

const ogOptions = {
  title: "ko",
  description: "ko",
};
const getBlog = async () => {
  loading.value = true;
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/blog/" + route.params.slug
  );
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  post.value = data.value;
  useHead({
    title: post.value.title,
  });
  await defineOgImage({
    title: post.value.title,
    description: post.value.description,
  });
  loading.value = false;
};
</script>

<template>
  <div style="height: 60px"></div>
  <v-skeleton-loader
    v-if="loading"
    color="transparent"
    :loading="loading"
    width="100%"
    height="600"
    type="image"
  >
  </v-skeleton-loader>
  <template v-else>
    <v-container class="pb-0">
      <v-row>
        <v-col cols="12">
          <v-card border elevation="0" rounded="lg">
            <v-img
              cover
              height="600"
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
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
        <v-card flat color="transparent" style="position: sticky; top: 100px">
          <v-card-text class="px-0 text-overline">
            Published at: {{ formatTimeAgo(new Date(post.createdAt)) }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="px-0">Share on Social Media</v-card-title>
          <div class="sharethis-inline-share-buttons"></div>
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
                <div class="sharethis-inline-reaction-buttons"></div>
                <LazySharedDynamicContent :content="post['content']" />
              </ClientOnly>
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
