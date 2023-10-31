<script setup>
import { Typed } from "@duskmoon/vue3-typed-js";
import { Icon } from "@iconify/vue";
import { useDisplay } from "vuetify";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

const { platform } = useDisplay();
const { mac, win, linux } = platform;

const options = {
  strings: [
    "Meets Challenges!",
    "Competitions!",
    "Music!",
    "Networking!",
    "Investment Opportunity!",
    "Thrill of Hackathon!",
  ],
  loop: true,
  loopCount: Infinity,
  typeSpeed: 120,
  startDelay: 200,
  backSpeed: 100,
  backDelay: 2500,
  smartBackspace: true,
  shuffle: true,
};

useHead({
  title: "Sagarmatha Tech Fest 2023",
});

const loading = ref(true);
onMounted(() => {
  nextTick(() => {
    const { data, error } = useFetch("http://127.0.0.1:3001/api/v1/home", {
      method: "get",
    });
    if (error.value) {
      loading.value = false;
      return console.log(error.value);
    }
    console.log(data.value);
    loading.value = false;
  });
});
</script>

<template>
  <v-skeleton-loader type="image" height="700" :loading="loading">
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
          <v-container class="h-100" :v-tilt="{ disabled: true }">
            <v-row justify="center" align="center" class="h-100">
              <v-col cols="12" md="8">
                <div
                  class="text-h3 text-md-h2 text-lg-h1 text-center font-weight-bold mb-3"
                  style="text-shadow: 2px 2px rgba(var(--v-theme-surface), 0.6)"
                >
                  Sagarmatha Techfest 2023 {{ mac || win || linux }}
                </div>
                <div
                  class="d-flex flex-wrap justify-center text-h5 font-weight-regular text-center mb-3"
                >
                  Where Innovation Meets
                  <Typed class="d-flex mx-1" :options="options"
                    ><div class="typing text-h5 font-weight-regular"></div
                  ></Typed>
                </div>
                <div class="d-flex flex-wrap justify-center">
                  <v-btn
                    height="55"
                    rounded="lg"
                    class="text-capitalize px-10 mr-4 mb-3"
                    to="/login"
                  >
                    Apply Now
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
  </v-skeleton-loader>
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
      <template v-for="i in 10">
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Prize {{ i }}</v-card-title>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
  <v-container>
    <v-row justify="center" class="py-16">
      <v-col cols="12">
        <div class="text-h4 font-weight-bold text-center text-capitalize">
          Explore Speakers
        </div>
      </v-col>
      <template v-for="i in 3">
        <v-col cols="12" md="3">
          <v-card>
            <v-img
              cover
              height="400"
              src="https://ropodl.vercel.app/image/portfolio/images/2.png"
            ></v-img>
          </v-card>
        </v-col>
      </template>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title>Explore More Speakers</v-card-title>
        </v-card>
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
