<script setup>
const admin = useAdmin();

definePageMeta({
  layout: "blank",
});

const showPass = ref(false);
const loginForm = ref();
const loading = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const rules = {
  email: [
    (v) => !!v || "Email is required",
    (v) => (v && v.length >= 3) || "Name must be less than 3 characters",
    (v) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || "Email Address must be in a valid format",
  ],
  password: [
    (v) => !!v || "Password is required",
    (v) => (v && v.length >= 8) || "Password must be more than 8 characters",
  ],
};

useHead({
  title: "Sign In",
});

const formSubmit = async () => {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;

  loading.value = true;
  nextTick(async () => {
    await admin.login(form);
  });
  loading.value = false;
};
</script>
<template>
  <v-container class="h-100">
    <v-row align="center" justify="center" class="h-100">
      <v-col cols="12" md="4">
        <v-img height="100" class="mb-3" src="/image/logo.png"></v-img>
        <v-card-title class="mb-3 text-center">Admin Dashboard</v-card-title>
        <v-form ref="loginForm" fast-fail @submit.prevent="formSubmit">
          <v-card class="pb-0">
            <v-card-text class="pb-0">
              <v-text-field
                required
                v-model="form.email"
                :rules="rules.email"
                placeholder="Email Address"
                :loading="loading"
                :disabled="loading"
              ></v-text-field>
              <v-text-field
                required
                v-model="form.password"
                :rules="rules.password"
                placeholder="Password"
                :loading="loading"
                :disabled="loading"
                :type="showPass ? 'text' : 'password'"
                :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:appendInner="showPass = !showPass"
              ></v-text-field>
            </v-card-text>
            <v-btn
              block
              class="text-capitalize"
              rounded="0"
              variant="tonal"
              color="primary"
              height="50"
              type="submit"
            >
              Submit
            </v-btn>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
