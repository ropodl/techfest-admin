<script setup>
import { Typed } from "@duskmoon/vue3-typed-js";
import { Icon } from "@iconify/vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

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

const tiltOptions = reactive({
  disabled: true,
});

const speakers = ref([]);

const loading = ref(true);
onMounted(() => {
  nextTick(async () => {
    const { data, error } = await useFetch(
      "http://127.0.0.1:3001/api/v1/frontend/home"
    );
    if (error.value) {
      loading.value = false;
      return console.log(error.value);
    }
    console.log(data.value);
    speakers.value = data.value.speakers;
    loading.value = false;
    // test
    getPrizes();
  });
});

const prizes = ref([]);
const getPrizes = async () => {
  const { data, error } = await useFetch(
    "https://api.kuhackfest.com/cms/prizes/"
  );
  if (error.value) console.log(error.value);
  prizes.value = data.value.results;
  console.log(data.value.results);
};
</script>
<template>
  <v-skeleton-loader type="image" height="700" :loading="loading">
    <ClientOnly>
      <video-background src="/assets/video/intro.mp4" style="height: 700px">
        <v-overlay
          persistent
          contained
          :model-value="true"
          scrim="black"
          class="hero-overlay"
          content-class="w-100 h-100"
        >
          <v-container class="h-100">
            <v-row justify="center" align="center" class="h-100">
              <v-col cols="12" md="8">
                <div
                  class="text-h3 text-md-h2 text-lg-h1 text-center font-weight-bold mb-3"
                  style="text-shadow: 2px 2px rgba(var(--v-theme-surface), 0.6)"
                >
                  Sagarmatha Techfest 2023
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
    </ClientOnly>
  </v-skeleton-loader>
  <section>
    <v-container>
      <v-row class="pt-16">
        <v-col cols="12">
          <LazySharedSectionTitle
            title="Our Sponsors"
            subtitle="These companies help us organize"
          />
        </v-col>
        <v-col cols="12">
          <v-row justify="center">
            <template v-for="i in 10">
              <v-col cols="12">
                <div class="text-h5 font-weight-bold text-center">
                  Gold Sponsor
                </div>
              </v-col>
              <v-col cols="12" md="2" v-for="i in 4">
                <v-card color="transparent" to="/">
                  <v-img
                    height="100"
                    src="https://api.kuhackfest.com/media/sponsors/Group_26_ff4E2Re.png"
                  ></v-img>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section>
    <v-container>
      <v-row justify="center" class="pt-16">
        <v-col cols="12" md="6">
          <LazySharedSectionTitle
            title="Explore Speakers"
            subtitle="Learn from experienced"
          />
        </v-col>
      </v-row>
      <v-row>
        <template v-for="(speaker, i) in speakers">
          <v-col cols="12" md="3">
            <LazyAdminSharedHomeSpeaker :speaker="speaker" />
          </v-col>
        </template>
      </v-row>
      <v-row class="pt-6" justify="center">
        <v-col cols="12" md="8">
          <div class="d-flex justify-center align-center">
            <v-divider></v-divider>
            <v-btn
              variant="outlined"
              class="text-capitalize"
              color="rgba(255,255,255,0.3)"
            >
              Explore More Speakers
            </v-btn>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section>
    <v-container>
      <v-row class="pt-16">
        <v-col cols="12">
          <LazySharedSectionTitle
            title="Explore Prizes"
            subtitle="Earn rewards for your contributions"
          />
        </v-col>
        <template v-for="(prize, i) in prizes">
          <v-col cols="12" md="4">
            <LazyAdminSharedHomePrize :prize="prize" />
          </v-col>
        </template>
      </v-row>
      <v-row class="pt-6" justify="center">
        <v-col cols="12" md="8">
          <div class="d-flex justify-center align-center">
            <v-divider></v-divider>
            <v-btn
              variant="outlined"
              class="text-capitalize"
              color="rgba(255,255,255,0.3)"
            >
              Explore More Prizes
            </v-btn>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section>
    <v-container>
      <v-row class="pt-16">
        <v-col cols="12">
          <LazySharedSectionTitle
            title="Explore Resources"
            subtitle="Learn about various protocol and positions"
          />
        </v-col>
        <template v-for="i in 10">
          <v-col cols="12" md="3">
            <v-card :title="`Resource number ${i}`" />
          </v-col>
        </template>
      </v-row>
      <v-row class="pt-6" justify="center">
        <v-col cols="12" md="8">
          <div class="d-flex justify-center align-center">
            <v-divider></v-divider>
            <v-btn
              variant="outlined"
              class="text-capitalize"
              color="rgba(255,255,255,0.3)"
            >
              Explore More Resources
            </v-btn>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<style lang="scss">
.hero-overlay {
  .v-overlay__scrim {
    opacity: 0.8 !important;
  }
}
</style>
