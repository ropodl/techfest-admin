<script setup>
const snackbar = useSnackbar();
</script>
<template>
  <v-snackbar
    dense close-on-content-click
    rounded="pill"
    v-model="snackbar.snackbar.show"
    :color="snackbar.snackbar.color"
    class="global-snackbar"
    content-class="text-center"
    >
    {{snackbar.snackbar.text}}
</v-snackbar>
</template>
<style>
.global-snackbar .v-snackbar__actions {
  margin: 0 !important;
}
</style>
