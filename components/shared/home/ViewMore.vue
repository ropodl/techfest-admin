<script setup>
defineProps({
  name: {
    type: String,
    default: "Name",
  },
  data: {
    type: Object,
  },
  show: {
    type: Number,
    default: 4,
  },
});
</script>
<template>
  {{ JSON.stringify(data) }}
  <div class="d-flex justify-center align-center">
    <v-divider></v-divider>
    <template v-if="speakerShowing < 5">
      <v-btn
        variant="outlined"
        class="text-capitalize"
        color="rgba(255,255,255,0.3)"
        @click="
          {
            speakerShowing = speakers.length + 1;
          }
        "
      >
        View All Speakers
      </v-btn>
    </template>
    <template v-else>
      <v-btn
        variant="outlined"
        class="text-capitalize"
        color="rgba(255,255,255,0.3)"
        @click="
          {
            speakerShowing = 4;
          }
        "
      >
        View Less Speakers
      </v-btn>
    </template>
    <v-divider></v-divider>
  </div>
</template>

<style></style>
