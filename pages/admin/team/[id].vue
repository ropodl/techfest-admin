<script setup>
const route = useRoute();
const team = useTeam();
const role = useRole();

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
  // phone: "",
  role: null,
  leader: false,
  status: "Draft",
});
onMounted(() => {
  nextTick(async () => {
    getAllRoles();
    const res = await team.getTeam(route.params.id);
    Object.assign(form, {
      image: res.memberImage.url,
      name: res.name,
      email: res.email,
      phone: res.phone,
      role: res.role,
      leader: res.leader,
      status: res.status,
      description: res.description,
    });
  });
});

const loading = ref(true);

const updateTeam = async () => {
  loading.value = true;
  if (form.image == null)
    return snackbar.showSnackbar("Member Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  await team.update(formData, route.params.id);
  loading.value = false;
};

const removeTeam = async () => {
  loading.value = true;
  await team.remove(route.params.id);
  nextTick(() => {
    navigateTo("/admin/team");
  });
  loading.value = false;
};

// Get All Roles
const roles = ref([]);
const getAllRoles = async () => {
  const res = await role.getAllRoles(1, -1);
  console.log(res);
  roles.value = res.roles;
};
</script>

<template>
  <v-form @submit.prevent="updateTeam">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle
            title="Edit Team Member"
            back="/admin/team"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="form.name"
            label="Member's Name"
          ></v-text-field>
          <v-row>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="form.email"
                label="Email Address"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="form.role"
                label="Member's Role"
                item-title="title"
                item-value="id"
                :items="roles"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              {{ form.leader }}
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
          <LazyAdminSharedActions :form="form" @remove="removeTeam" />
          <LazyAdminSharedImageUpload :form="form" title="Member's Image" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style lang="scss"></style>
