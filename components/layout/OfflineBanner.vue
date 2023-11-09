<script setup>
import { Icon } from "@iconify/vue";
</script>
<template>
  <v-snackbar
    dense
    rounded="pill"
    :model-value="true"
    theme="dark"
    color="surface"
    :timeout="-1"
    close-on-content-click
  >
    <v-icon class="mr-3">
      <Icon icon="mdi:wifi-strength-alert-outline" />
    </v-icon>
    Looks like you are currently offline.
  </v-snackbar>
</template>
<style>
.v-banner__content {
  align-content: center !important;
  display: grid !important;
}
</style>
