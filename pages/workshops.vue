<script setup>
definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Workshops",
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" v-for="i in 20">
        <v-card height="400">
          <v-img
            cover
            height="400"
            class="d-flex align-end pa-2"
            src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=1437&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <v-card>
              <v-card-title>Event Name</v-card-title>
              <v-card-text>Register Now</v-card-text>
            </v-card>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
