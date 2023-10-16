<script setup>
definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add Sponsor",
});

const form = reactive({
  name: "",
  level: "",
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <LazyAdminSharedPageTitle
          title="Add New Sponsor"
          back="/admin/sponsor"
        />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="form.name"
          label="Sponsor's Company Name"
        ></v-text-field>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="form.level" label="Sponsor Level"></v-select>
          </v-col>
        </v-row>
        <v-text-field></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss"></style>
