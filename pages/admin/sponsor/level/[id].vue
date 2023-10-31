<script setup>
const route = useRoute();

definePageMeta({
  layout: "admin",
});
</script>
<template>
  <div>
    {{ route.params.id }}
  </div>
</template>

<style lang="scss"></style>
