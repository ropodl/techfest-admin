<script setup>
import MarqueeText from "vue-marquee-text-component/src/components/MarqueeText.vue";
</script>
<template>
  <section>
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" class="pa-0">
          <v-hover v-slot="{ isHovering, props }">
            <client-only>
              <MarqueeText v-bind="props" :paused="isHovering" :duration="120">
                <template v-for="i in 10">
                  <img
                    loading="lazy"
                    width="400"
                    height="250"
                    :src="'/image/slider/' + i + '.jpg'"
                    style="object-fit: cover; cursor: zoom-in !important"
                    @click="
                      navigateTo('/image/slider/' + i + '.jpg', {
                        external: true,
                        open: {
                          target: '_blank',
                        },
                      })
                    "
                  />
                </template>
              </MarqueeText>
            </client-only>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
