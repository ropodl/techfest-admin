<script setup>
const runtimeConfig = useRuntimeConfig();
definePageMeta({
  layout: "default",
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
  console.log(data.value);
  faqs.value = data.value;
  loading.value = false;
};
</script>
<template>
  <v-card flat rounded="0" height="300" class="d-flex align-end justify-center">
    <v-card-title
      class="pb-16 text-h3 font-weight-black text-capitalize text-center z-index-11"
    >
      Frequently Asked Questions
    </v-card-title>
    <v-img
      class="position-absolute w-100"
      src="/image/divider.png"
      style="bottom: 0; z-index: 10; pointer-events: none"
    ></v-img>
  </v-card>
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
