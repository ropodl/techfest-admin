<script setup>
const faq = useFaq();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New FAQ",
});

const form = reactive({
  title: "",
  content: "",
  status: "Draft",
});

const loading = ref(false);
const addFaq = async () => {
  loading.value = true;
  await faq.create(form);
  loading.value = false;
};
</script>

<template>
  <v-form @submit.prevent="addFaq">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Add New FAQ" back="/admin/faq" />
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
