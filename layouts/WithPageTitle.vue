<script setup>
const route = useRoute();
</script>
<template>
  <NuxtLayout name="default">
    <v-card
      flat
      rounded="0"
      height="300"
      class="d-flex align-end justify-center"
    >
      <v-card-title
        class="d-flex pb-16 text-h3 font-weight-black text-capitalize text-center z-index-11"
      >
        {{ route.name.replace(/-/g, " ") }}
      </v-card-title>
      <v-img
        class="position-absolute w-100"
        src="/image/divider.png"
        style="bottom: 0; z-index: 10; pointer-events: none"
      ></v-img>
    </v-card>
    <div v-auto-animate>
      <slot />
    </div>
  </NuxtLayout>
</template>
