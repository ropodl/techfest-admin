<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  prize: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <v-dialog persistent scrim="black" width="1000">
    <template v-slot:activator="{ props }">
      <v-card border rounded="lg" v-bind="props">
        <v-hover v-slot="{ isHovering, props: hover }">
          <v-img
            v-bind="hover"
            cover
            height="300"
            class="align-end pa-3"
            :class="isHovering ? 'zoom-image' : ''"
            :src="prize.prizeImage?.url"
            gradient="180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 25%,rgba(0,0,0,0.5) 70%, rgba(0,0,0,1) 100%"
          >
            <v-card
              border
              style="
                background-color: rgba(33, 33, 33, 0.8);
                backdrop-filter: blur(8px);
              "
            >
              <v-card-title class="line-clamp-2">
                {{ prize.title }}
              </v-card-title>
            </v-card>
          </v-img>
        </v-hover>
      </v-card>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card border height="502">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-img
              cover
              height="500"
              :src="prize.prizeImage?.url"
              style="position: sticky; top: 0"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-title class="">
              <v-btn
                icon
                variant="tonal"
                color="white"
                class="position-absolute rounded-t-0 rounded-e-0"
                @click="isActive.value = false"
                style="top: 0; right: 0"
              >
                <v-icon icon>
                  <Icon icon="mdi:close" />
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-card-title class="pt-10" style="white-space: normal !important">
              <div class="text-h2" v-text="prize.title"></div>
            </v-card-title>
            <v-card-text class="pt-10" v-html="prize.description"></v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>
