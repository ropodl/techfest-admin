<script setup>
const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Frequently Asked Questions",
});

onMounted(() => {
  nextTick(() => {
    getAllFaqs();
  });
});

const faqs = ref([]);
const loading = ref(true);

const getAllFaqs = async () => {
  loading.value = true;
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/faqs"
  );
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  faqs.value = data.value;
  loading.value = false;
};
</script>
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <template v-if="loading">
          <v-skeleton-loader type="article"> </v-skeleton-loader>
        </template>
        <template v-else>
          <template v-if="faqs.length">
            <v-expansion-panels multiple>
              <v-expansion-panel
                v-for="(faq, i) in faqs"
                :title="faq.title"
                :text="faq.content"
              ></v-expansion-panel>
            </v-expansion-panels>
          </template>
          <template v-else>
            <LazySharedEmpty />
          </template>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
