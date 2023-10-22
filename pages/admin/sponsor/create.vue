<script setup>
definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add Sponsor",
});

const form = reactive({
  image: null,
  name: "",
  level: null,
  status: "Draft",
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
            {{ form.level }}
            <v-select
              v-model="form.level"
              :items="[
                { id: '_v11', title: 'Platinum' },
                { id: '_v12', title: 'Gold' },
              ]"
              item-title="title"
              item-value="id"
              label="Sponsor Level"
              return-object
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Sponsor's Website link"></v-text-field>
          </v-col>
        </v-row>
        <v-textarea label="More Info about Sponsor"></v-textarea>
      </v-col>
      <v-col cols="12" md="4">
        <LazyAdminSharedActions :form="form" />
        <LazyAdminSharedImageUpload title="Sponsor's Image" :form="form" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss"></style>
