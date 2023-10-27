<script setup>
const { signIn, signOut, session, status, cookies, getProviders } = useAuth();
import { Icon } from "@iconify/vue";

definePageMeta({
  middleware: "guest-only",
  auth: { authenticatedRedirectTo: "/user" },
});

const handleGithub = () => {
  signIn("github");
};
const handleGoogle = () => {
  signIn("google");
};
</script>
<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <div class="text-h3 font-weight-bold">
          Why register to <br />Sagarmatha Tech Fest 2023?
        </div>
        <v-card-text>
          <ul>
            <li>Get notified on latest development/program schedule.</li>
            <li>
              Register to multiple pre-events and main events from one place.
            </li>
          </ul>
        </v-card-text>
      </v-col>
      <v-col cols="12" md="4">
        <v-card-title class="mb-3">
          No need to register, just sign in with
        </v-card-title>
        <div class="d-flex justify-center">
          <v-btn
            size="large"
            class="text-capitalize px-10 mr-3"
            @click="handleGithub"
          >
            <v-icon start>
              <Icon icon="fa6-brands:github" />
            </v-icon>
            GitHub
          </v-btn>
          <v-btn
            size="large"
            class="text-capitalize px-10"
            @click="handleGoogle"
          >
            <v-icon start>
              <Icon icon="fa6-brands:google" />
            </v-icon>
            Google
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.v-container {
  padding-top: 130px;
  padding-bottom: 100px;
}
</style>
