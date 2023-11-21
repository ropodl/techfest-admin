<script setup>
import MarqueeText from "vue-marquee-text-component/src/components/MarqueeText.vue";
</script>
<template>
  <section>
    <v-container fluid class="pa-0 mt-10">
      <v-row>
        <v-hover v-slot="{ isHovering, props }">
          <client-only>
            <MarqueeText v-bind="props" :paused="isHovering" :duration="120">
              <img
                v-for="i in 10"
                loading="lazy"
                width="400"
                height="250"
                :src="'/image/slider/' + i + '.jpg'"
                style="object-fit: cover"
              />
            </MarqueeText>
          </client-only>
        </v-hover>
      </v-row>
    </v-container>
  </section>
</template>
