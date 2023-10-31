<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="text-center text-overline">{{ subtitle }}</div>
  <div class="text-h2 font-weight-bold text-center text-capitalize mb-3">
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
</template>

<style lang="scss"></style>
