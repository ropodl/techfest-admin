<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinymceConfig } from "../../../utils/tinymce";

const terms = useTerms();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Privacy Policy",
});

const form = reactive({
  content: "",
  status: "Draft",
});

const create = ref(true);
</script>

<template>
  Method is not working properly
  <v-form @submit.prevent="">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Privacy Policy" />
        </v-col>
        <v-col cols="12" md="8">
          <v-card flat rounded="0">
            <client-only placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.content"
                placeholder="Privacy Policy"
                api-key="13zhwdufb9fbf9owvry9zsuazna4wwrt77wo2wje0tteg2b6"
                :init="tinymceConfig"
              />
            </client-only>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
