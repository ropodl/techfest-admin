<script setup>
import { useScrollTo } from "@/composables/scrollToId";
import { Icon } from "@iconify/vue";

const show = ref(false);

const onScroll = (e) => {
  if (typeof window === "undefined") return;
  const top = window.scrollY || 0;
  show.value = top > 500 ? true : false;
};
</script>
<template>
  <v-btn
    icon
    color="primary"
    size="x-large"
    variant="tonal"
    rounded="lg"
    class="position-fixed"
    v-scroll="onScroll"
    @click="useScrollTo('__nuxt', 0)"
    aria-label="Go to top button"
    :style="{
      bottom: show ? '10px' : '-70px',
      right: '10px',
      zIndex: '999',
      transition: 'all 250ms cubic-bezier(.17,.26,1,.32) 0s',
    }"
  >
    <v-icon>
      <Icon icon="mdi:arrow-up" />
    </v-icon>
  </v-btn>
</template>
