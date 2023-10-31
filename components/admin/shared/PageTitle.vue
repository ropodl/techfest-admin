<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  back: {
    type: String,
  },
});
</script>

<template>
  <div
    class="text-h4 font-weight-bold"
    :class="[back ? 'd-flex align-center' : '']"
  >
    <template v-if="back">
      <v-btn variant="text" :color="white" rounded="sm" :to="back">
        <v-icon>
          <Icon icon="mdi:arrow-left" />
        </v-icon>
      </v-btn>
      <v-divider vertical class="mr-4"></v-divider>
    </template>
    {{ title }}
  </div>
</template>
