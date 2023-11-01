<script setup>
const team = useTeams();

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
  role: null,
  leader: false,
  description: "",
  status: "Draft",
});
const loading = ref(true);
const addTeam = async () => {
  loading.value = true;
  if (form.image == null)
    return snackbar.showSnackbar("Featured Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  await team.create(formData);
  loading.value = false;
};

const role = [
  {
    title: "OC Chair",
    priority: 1,
  },
  {
    title: "Coordinator",
    priority: 2,
  },
  {
    title: "Logistic Coordinator",
    priority: 3,
  },
  {
    title: "Event Coordinator",
    priority: 4,
  },
  {
    title: "OC Secretary",
    priority: 5,
  },
];
</script>

<template>
  <v-form @submit.prevent="addTeam">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle
            title="Add Team Member"
            back="/admin/team"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="form.name"
            label="Member's Name"
          ></v-text-field>
          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="form.email"
                label="Email Address"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="form.phone"
                label="Phone Number (optional)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-select
                v-model="form.role"
                label="Member's Role"
                :items="role"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-checkbox
                v-model="form.leader"
                label="Team Leader"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-textarea
            v-model="form.description"
            label="Description"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
          <LazyAdminSharedImageUpload title="Member's Image" :form="form" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
