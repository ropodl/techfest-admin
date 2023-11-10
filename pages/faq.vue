<script setup>
definePageMeta({
  layout: "with-page-title",
});
</script>
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="i in 3"
            :key="i"
            title="Item"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          ></v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>
