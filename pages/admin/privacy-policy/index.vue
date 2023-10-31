<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinymceConfig } from "../../../utils/tinymce";

// const privacy = useTerms();
const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem("admin_auth_token");

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Privacy Policy",
});

const id = ref("");
const form = reactive({
  content: "",
  status: "Draft",
});

onMounted(() => {
  nextTick(() => {
    getPrivacy();
  });
});

const getPrivacy = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/privacy/",
    {
      method: "GET",
    }
  );
  if (error.value) return console.log(error.value);
  console.log(data.value);
  id.value = data.value.id;
  form.content = data.value.content;
  form.status = data.value.status;
};

const submitPrivacy = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + `/privacy/${id.value ? "update" : "create"}`,
    {
      method: id.value ? "PATCH" : "POST",
      body: form,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (error.value) return console.log(error.value);
  console.log(data.value);
  id.value = data.value.privacy.id;
  form.content = data.value.privacy.content;
  form.status = data.value.privacy.status;
};
</script>

<template>
  <v-form @submit.prevent="submitPrivacy">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Privacy Policy" />
        </v-col>
        <v-col cols="12" md="8">
          <v-card flat rounded="0">
            <ClientOnly placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.content"
                placeholder="Privacy Policy"
                api-key="13zhwdufb9fbf9owvry9zsuazna4wwrt77wo2wje0tteg2b6"
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
