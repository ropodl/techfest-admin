<script setup>
import { Icon } from "@iconify/vue";
import { formatTimeAgo } from "@vueuse/core";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const location = useBrowserLocation();

const post = ref({});
const loading = ref(true);

onMounted(() => {
  nextTick(async () => {
    getBlog();
    // const res = await blog.getBlog(route.params.slug);
    // if (res.blog) {
    //   post.value = res.blog;
    // }
    // loading.value = false;
  });
});

const getBlog = async () => {
  loading.value = true;
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/blog/" + route.params.slug
  );
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  console.log(data.value);
  post.value = data.value;
  useHead({
    title: post.value.title,
  });
  loading.value = false;
};
</script>

<template>
  <v-skeleton-loader :loading="loading" width="100%" height="600" type="image">
    <v-parallax
      cover
      height="600"
      class="align-end"
      :src="post.featuredImage?.url"
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
    </v-parallax>
  </v-skeleton-loader>
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
          <SocialShare
            v-for="network in ['facebook', 'twitter', 'linkedin', 'email']"
            :key="network"
            :network="network"
            :styled="true"
            :label="false"
            class="p-4 rounded-none"
          />
          <v-card-actions class="px-0" v-if="!loading">
            <v-row>
              <v-col cols="12" md="6">
                <v-btn block variant="tonal" color="#0051d4" class="">
                  <v-icon start>
                    <Icon icon="fa6-brands:facebook-f" />
                  </v-icon>Facebook
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
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
  </v-container>
</template>
