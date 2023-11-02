<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinymceConfig } from "../../../utils/tinymce";

const terms = useTerms();
const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem("admin_auth_token");

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Terms and Conditions",
});

const id = ref("");
const form = reactive({
  content: "",
  status: "Draft",
});

onMounted(() => {
  nextTick(() => {
    getTerms();
  });
});

const getTerms = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/terms",
    {
      method: "GET",
    }
  );
  if (error.value) return console.log(error.value);
  id.value = data.value.id;
  form.content = data.value.content;
  form.status = data.value.status;
};

const submitTerms = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + `/terms/${id.value ? "update" : "create"}`,
    {
      method: id.value ? "PATCH" : "POST",
      body: form,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (error.value) return console.log(error.value);
  id.value = data.value.terms.id;
  form.content = data.value.terms.content;
  form.status = data.value.terms.status;
};
</script>

<template>
  <v-form @submit.prevent="submitTerms">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Terms and Conditions" />
        </v-col>
        <v-col cols="12" md="8">
          <v-card flat rounded="0">
            <ClientOnly placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.content"
                placeholder="Terms and Conditions"
                :api-key="tinyApiKey"
                :init="tinymceConfig"
              />
            </ClientOnly>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
