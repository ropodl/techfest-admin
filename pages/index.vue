<script setup>
import { Icon } from "@iconify/vue";

useHead({
  title: "Sagarmatha Tech Fest 2023",
});

const res = useFetch("http://127.0.0.1:3001/api/v1/test", {});
</script>

<template>
  <client-only>
    <video-background src="/assets/video/intro.mp4" style="height: 700px">
      <v-overlay
        persistent
        contained
        no-click-animation
        :model-value="true"
        scrim="black"
        class="hero-overlay"
        content-class="w-100 h-100"
      >
        <v-container class="h-100">
          <v-row justify="center" align="center" class="h-100">
            <v-col cols="12" md="8">
              <div
                class="text-h1 text-center font-weight-bold mb-3"
                style="text-shadow: 2px 2px rgba(var(--v-theme-surface), 0.6)"
              >
                Explore all the tech has to offer.
              </div>
              <div class="d-flex justify-center">
                <v-btn
                  height="55"
                  rounded="lg"
                  class="text-capitalize px-10 mr-4"
                >
                  Get Started Now
                </v-btn>
                <v-btn
                  height="55"
                  rounded="lg"
                  class="text-capitalize px-10 mr-3"
                >
                  Sponsor Us
                </v-btn>
                <v-btn height="55" rounded="lg" class="text-capitalize px-10">
                  <v-icon start>
                    <Icon icon="fa6-brands:discord" />
                  </v-icon>
                  Join us on Discord
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-overlay>
    </video-background>
  </client-only>
  <v-container>
    <v-row class="py-16">
      <v-col cols="12">
        <div class="text-h4 font-weight-bold text-center text-capitalize">
          Our Sponsors
        </div>
      </v-col>
      <v-col cols="12" md="3">Platinum Sponsor</v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row class="py-16">
      <v-col cols="12">
        <div class="text-h4 font-weight-bold text-center text-capitalize">
          Explore Prizes
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row class="py-16">
      <v-col cols="12">
        <div class="text-h4 font-weight-bold text-center text-capitalize">
          Explore Speakers
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row class="py-16">
      <v-col cols="12">
        <div class="text-h4 font-weight-bold text-center text-capitalize">
          Explore Resources
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.hero-overlay {
  .v-overlay__scrim {
    opacity: 0.8 !important;
  }
}
</style>
