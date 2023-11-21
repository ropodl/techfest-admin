<script setup>
import { emit } from "process";

defineProps({
  name: {
    type: String,
    default: "Name",
  },
  data: {
    type: Object,
  },
  num: {
    type: Number,
    default: 4,
  },
});

const show = ref(true);
const showing = ref(4);
defineEmits(["showMoreSpeakers", "showLessSpeakers"]);

const showMore = () => {
  if (showing.value === 4) {
    showing.value = data.length;
    $emit("showMoreSpeakers");
  } else {
    $emit("showLessSpeakers");
    showing.value = 4;
  }
};
</script>
<template>
  {{ showing }}--data{{ data.length }}
  <div class="d-flex justify-center align-center">
    <v-divider></v-divider>
    <v-btn
      variant="outlined"
      class="text-capitalize"
      color="rgba(255,255,255,0.3)"
      @click="showMore"
    >
      View {{ data.length ? "All" : "Less" }} {{ name }}
    </v-btn>
    <v-divider></v-divider>
  </div>
</template>
