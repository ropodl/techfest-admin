<script setup>
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "with-page-title",
});

const { data, loading, error } = useFetch(
  runtimeConfig.public.api_url + "/terms/"
);
if (error.value) console.log(error.value);
console.log(data.value);
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card>
          <v-card-text>
            <v-skeleton-loader :loading="loading" type="article">
              <client-only v-if="data.content">
                <LazySharedDynamicContent :content="data.content" />
              </client-only>
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
