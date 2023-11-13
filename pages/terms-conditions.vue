<script setup>
const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Terms and Conditions",
});

const content = ref("");
const loading = ref(true);

onMounted(() => {
  nextTick(async () => {
    const { data, error } = await useFetch(
      runtimeConfig.public.api_url + "/terms/"
    );
    if (error.value) console.log(error.value);
    content.value = data.value.content;
    console.log(data.value);
    loading.value = false;
  });
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-skeleton-loader :loading="loading" type="article">
          <ClientOnly v-if="content.length">
            <v-card>
              <v-card-text>
                <LazySharedDynamicContent :content="content" />
              </v-card-text>
            </v-card>
          </ClientOnly>
          <template v-else>
            <LazySharedEmpty />
          </template>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>
