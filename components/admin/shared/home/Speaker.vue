<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  speaker: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <v-dialog persistent height="400" scrim="black" width="1000">
    <template v-slot:activator="{ props }">
      <v-card v-bind="props">
        <v-img
          cover
          height="400"
          class="align-end"
          :src="speaker.speakerImage.url"
          :alt="speaker.speakerImage.name"
          gradient="180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(var(--v-theme-primary),1) 100%"
        >
          <v-card flat color="transparent">
            <v-card-title v-text="speaker.name"></v-card-title>
            <v-card-text v-text="speaker.position"></v-card-text>
          </v-card>
        </v-img>
      </v-card>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-row no-gutters>
          <v-col cols="12" md="5">
            <v-img
              cover
              height="400"
              :src="speaker.speakerImage.url"
              style="position: sticky; top: 0"
            ></v-img>
          </v-col>
          <v-col cols="12" md="7">
            <v-card-title class="position-fixed" style="top: 0; right: 0">
              <v-btn
                icon
                variant="tonal"
                color="white"
                @click="isActive.value = false"
              >
                <v-icon icon>
                  <Icon icon="mdi:close" />
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-card-title class="pt-10">
              <div class="text-h2" v-text="speaker.name"></div>
            </v-card-title>
            <v-card-title v-text="speaker.position"></v-card-title>
            <v-card-text class="pb-0">
              <v-btn icon variant="tonal" color="white">
                <v-icon>
                  <Icon icon="fa6-brands:facebook" />
                </v-icon>
              </v-btn>
            </v-card-text>
            <v-card-text v-text="speaker.description"></v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>
