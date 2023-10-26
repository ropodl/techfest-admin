<script setup>
import { Icon } from "@iconify/vue";

const handleGithub = () => {
  navigateTo("http://localhost:3001/auth/github", { external: true });
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
        <!-- <v-card border>
          <v-card-title>Register</v-card-title>
          <v-card-text class="pb-0">
            <v-text-field
              flat
              density="comfortable"
              variant="solo-filled"
              placeholder="Full Name"
            ></v-text-field>
            <v-text-field
              flat
              density="comfortable"
              variant="solo-filled"
              placeholder="Email Address"
            ></v-text-field>
            <v-text-field
              flat
              density="comfortable"
              variant="solo-filled"
              placeholder="Password"
            ></v-text-field>
            <v-text-field
              flat
              density="comfortable"
              variant="solo-filled"
              placeholder="Confirm Password"
            ></v-text-field>
          </v-card-text>
          <v-btn block rounded="0" height="50" class="text-capitalize">
            Submit
          </v-btn>
        </v-card> -->
        <v-btn block class="text-capitalize" @click="handleGithub">
          <v-icon start>
            <Icon icon="fa6-brands:github" />
          </v-icon>
          GitHub
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.v-container {
  padding-top: 130px;
  padding-bottom: 130px;
  // padding-bottom: 160px;
}
</style>
