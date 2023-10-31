<script setup>
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "with-page-title",
});

const content = ref("");
const loading = ref(true);

onMounted(() => {
  nextTick(async () => {
    const { data, error } = await useFetch(
      runtimeConfig.public.api_url + "/privacy/"
    );
    if (error.value) return console.log(error.value);
    content.value = data.value.content;
    console.log(data.value.content);
    loading.value = false;
  });
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card>
          <v-card-text>
            <v-skeleton-loader :loading="loading" type="article">
              <ClientO  nly v-if="content.length">
                <LazySharedDynamicContent :content="content" />
              </ClientO>
              <template v-else>Not Content Available at the moment.</template>
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
