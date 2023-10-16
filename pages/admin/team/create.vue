<script setup>
definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add Team Member",
});

const form = reactive({
  image: null,
  name: "",
  email: "",
  phone: "",
  role: "",
  leader: false,
  status: "Draft",
});
</script>

<template>
  {{ form }}
  <v-container>
    <v-row>
      <v-col cols="12">
        <LazyAdminSharedPageTitle title="Add Team Member" back="/admin/team" />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="form.name"
          placeholder="Member's Name"
        ></v-text-field>
        <v-row>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model="form.email"
              placeholder="Email Address"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model="form.phone"
              placeholder="Phone Number (optional)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-select
              v-model="form.role"
              placeholder="Member's Role"
              :items="[
                'Designers',
                'Event Coordinators',
                'Finance',
                'Logistic Coordinator',
                'Marketing',
                'Marketing and Public Relations',
                'Secretary',
                'Sub Event Coordinator',
                'Technical Coordinator',
              ]"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-checkbox v-model="form.leader" label="Team Leader"></v-checkbox>
          </v-col>
        </v-row>
        <v-textarea placeholder="Description"></v-textarea>
      </v-col>
      <v-col cols="12" md="4">
        <LazyAdminSharedActions :form="form" />
        <LazyAdminSharedImageUpload title="Member's Image" :form="form" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss"></style>
