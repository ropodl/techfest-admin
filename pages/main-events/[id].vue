<script setup>
import { Icon } from "@iconify/vue";
// import { formatTimeAgo } from "@vueuse/core";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
// const { href } = useBrowserLocation();

const workshop = ref({});
const loading = ref(true);

useHead({
  script: {
    src: "https://platform-api.sharethis.com/js/sharethis.js#property=6556884c645def0013d4a968&product=sop",
    async: true,
  },
});

onMounted(() => {
  nextTick(async () => {
    getMainEvent();
  });
});

// const ogOptions = {
//   title: "ko",
//   description: "ko",
// };
const getMainEvent = async () => {
  loading.value = true;
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/workshop/" + route.params.id
  );
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  workshop.value = data.value;
  useHead({
    title: workshop.value.title,
  });
  loading.value = false;
};
</script>

<template>
  <div style="height: 60px"></div>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <v-card border class="position-sticky mb-3" style="top: 70px">
          <!-- <v-skeleton-loader
            color="transparent"
            :loading="loading"
            width="100%"
            height="500"
            type="image"
          > -->
          <v-img
            max-height="600"
            :src="workshop.workshopImage?.url"
            :alt="workshop.workshopImage?.name"
            class="workshop-image"
          ></v-img>
          <!-- </v-skeleton-loader> -->
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
            v-text="workshop.title"
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
                    :href="workshop.link"
                    text="Register Now"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card-text>
            <LazySharedDynamicContent :content="workshop.description" />
          </v-card-text>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.workshop-image img {
  view-transition-name: selected-workshop;
}
::view-transition-old(header),
::view-transition-new(header) {
  width: auto;
}
</style>
