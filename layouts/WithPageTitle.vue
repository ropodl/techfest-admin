<script setup>
const route = useRoute();
</script>
<template>
  <NuxtLayout name="default">
    <v-card rounded="0" height="300" class="d-flex align-end justify-center">
      <v-card-title
        class="pb-16 text-h3 font-weight-black text-capitalize text-center"
        v-auto-animate
      >
        {{ route.name.replace("-", " ") }}
      </v-card-title>
    </v-card>
    <div v-auto-animate>
      <slot />
    </div>
  </NuxtLayout>
</template>
