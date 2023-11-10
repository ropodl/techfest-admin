<script setup>
const blog = useBlog();
const category = useCategory();
const snackbar = useSnackbar();
const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Admin",
});

const form = reactive({
  name: "",
  email: "",
  password: "",
});
// After create
const loading = ref(false);
const token = localStorage.getItem("admin_auth_token");

const addAdmin = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/login/create",
    {
      key: String(Math.random()),
      method: "POST",
      body: form,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (error.value) return console.log(error.value);
  snackbar.showSnackbar("Admin created", "success");
  console.log(data.value.user);
};
</script>
<template>
  <!-- {{ form }} -->
  <v-container>
    <v-form @submit.prevent="addAdmin">
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle title="Add New Admin" back="/admin/list" />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field label="User Name" v-model="form.name"></v-text-field>
          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                label="Email Address"
                v-model="form.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                label="Password"
                v-model="form.password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-card title="Actions">
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                block
                type="submit"
                variant="tonal"
                rounded="lg"
                height="48"
                class="text-capitalize"
                >Submit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
