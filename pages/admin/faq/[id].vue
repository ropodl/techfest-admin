<script setup>
const faq = useFaq();
const route = useRoute();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Edit FAQ",
});

onMounted(() => {
  nextTick(async () => {
    const res = await faq.getFaq(route.params.id);
    form.title = res.title;
    form.content = res.content;
    form.status = res.status;
  });
});

const form = reactive({
  title: "",
  content: "",
  status: "Draft",
});

const loading = ref(false);
const updateFaq = async () => {
  loading.value = true;
  await faq.updateFaq(form, route.params.id);
  loading.value = false;
};
</script>

<template>
  <v-form @submit.prevent="updateFaq">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Edit FAQ" back="/admin/faq" />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field v-model="form.title" label="FAQ Title"></v-text-field>
          <v-textarea v-model="form.content" label="FAQ Content"></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
