<script setup></script>
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="text-h3 font-weight-bold">
          Why register to <br />Sagarmath Tech Fest 2023?
        </div>
        <v-card-text>
          <ul>
            <li>Get notified on latest development/program schedule.</li>
          </ul>
        </v-card-text>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <!-- <v-card-title>Register</v-card-title> -->
          <v-card-text class="pb-0">
            <v-text-field placeholder="Full Name"></v-text-field>
            <v-text-field placeholder="Email Address"></v-text-field>
            <v-text-field placeholder="Password"></v-text-field>
            <v-text-field placeholder="Confirm Password"></v-text-field>
          </v-card-text>
          <v-btn block rounded="0" height="50" class="text-capitalize">
            Submit
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.v-container {
  padding-top: 160px;
  padding-bottom: 160px;
}
</style>
