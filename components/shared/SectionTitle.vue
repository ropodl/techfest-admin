<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="position-relative">
    <template v-if="section">
      <div
        class="text-h1 font-weight-black text-uppercase position-absolute w-100 text-center text-primary hidden-xs"
        style="top: 0; opacity: 0.1; pointer-events: none"
      >
        {{ section }}
      </div>
    </template>
    <div
      class="text-center text-h6 text-capitalize text-grey"
      style="padding-top: 90px"
    >
      [ {{ subtitle }} ]
    </div>
    <div class="text-h3 font-weight-medium text-center text-capitalize mb-3">
      {{ title }}
    </div>
    <div class="d-flex justify-center mb-3">
      <span
        style="
          height: 5px;
          width: 200px;
          border-radius: 50px;
          background-color: rgb(var(--v-theme-primary));
        "
      ></span>
    </div>
    <div class="text-overline text-capitalize text-center">{{ text }}</div>
  </div>
</template>
