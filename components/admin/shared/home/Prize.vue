<script setup>
import { Icon } from "@iconify/vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const isDark = computed(() => theme.global.current.value.dark);
console.log(isDark);

defineProps({
  prize: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <v-dialog persistent scrim="black" width="1200">
    <template v-slot:activator="{ props }">
      <v-card v-bind="props">
        <v-img
          cover
          height="250"
          class="align-end"
          :src="prize.prizeImage?.url"
          >
          <!-- gradient="180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 100%" -->
          <v-tooltip
            :theme="isDark?'light':'dark'"
            text="Click to learn more"
            content-class="primary"
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                size="small"
                v-bind="props"
                variant="tonal"
                class="position-absolute rounded-t-0 rounded-e-0"
                style="top: 0; right: 0"
              >
                <v-icon>
                  <Icon icon="mdi:arrow-top-right" />
                </v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-card rounded="0">
            <v-card-title class="line-clamp-2">
              {{ prize.title }}
            </v-card-title>
          </v-card>
        </v-img>
      </v-card>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card height="400">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-img
              cover
              height="400"
              :src="prize.prizeImage?.url"
              style="position: sticky; top: 0"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-title class="position-absolute" style="top: 0; right: 0">
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
              <div class="text-h2" v-text="prize.title"></div>
            </v-card-title>
            <v-card-text class="pt-10" v-html="prize.description"></v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>
