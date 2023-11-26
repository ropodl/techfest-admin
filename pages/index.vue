<script setup>
import { Icon } from "@iconify/vue";

const runtimeConfig = useRuntimeConfig();

const { start, isPending } = useTimeoutFn(() => {
  current.value = items.value[Math.floor(Math.random() * 6)];
}, 6000);

useHead({
  title: "Sagarmatha Tech Fest 2023",
});

useSeoMeta({
  description:
    "Sagarmatha Tech-Fest, a grand platform where visionary young minds converge to spark innovation and flaunt their ingenious talents! Discover brilliance at Sagarmatha Tech-Fest! A profound journey of growth, wisdom, and boundless innovation, where minds unite and memories are woven. Embrace greatness!",
  ogTitle: "Sagarmatha Tech Fest 2023",
  ogDescription:
    "Sagarmatha Tech-Fest, a grand platform where visionary young minds converge to spark innovation and flaunt their ingenious talents!",
  ogImage: "[insert image URL here]",
  ogUrl: "[insert URL here]",
  twitterTitle: "Sagarmatha Tech Fest 2023",
  twitterDescription:
    "Sagarmatha Tech-Fest, a grand platform where visionary young minds converge to spark innovation and flaunt their ingenious talents!",
  twitterImage: "[insert image URL here]",
  twitterCard: "summary",
});

const speakers = ref([]);
const speakerShowing = ref(4);

const prizes = ref([]);
const prizeShowing = ref(3);

const levels = ref([]);
const sponsors = ref([]);

const loading = ref(true);
onMounted(() => {
  nextTick(async () => {
    const { data, error } = await useFetch(
      runtimeConfig.public.api_url + "/frontend/home"
    );
    if (error.value) {
      loading.value = false;
      return console.log(error.value);
    }
    speakers.value = data.value.speakers;
    prizes.value = data.value.prizes;
    levels.value = data.value.levels;
    sponsors.value = data.value.sponsors;
    loading.value = false;
  });
});

const items = ref([
  "Challenges",
  "Competitions",
  "Music",
  "Networking",
  "Investment Opportunity",
  "Thrill of Hackathon",
]);
const current = ref("Challenges");

watch(isPending, () => {
  start();
});

const tiltOptions = {
  gyroscope: false,
  scale: 0,
  reverse: false, // reverse the tilt direction
  max: 20, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
  speed: 300, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: "x", // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  glare: false, // if it should have a 'glare' effect
  "max-glare": 0.1, // the maximum 'glare' opacity (1 = 100%, 0.5 = 50%)
  "glare-prerender": false,
};
</script>
<template>
  <template v-if="loading">
    <v-skeleton-loader type="image" height="700" :loading="loading" />
  </template>
  <template v-else>
    <v-card flat width="100%" rounded="0" color="transparent" height="700">
      <div
        class="position-absolute w-100 h-100"
        style="
          mask-image: radial-gradient(circle, #fff, transparent);
          opacity: 0.1;
        "
      >
        <svg aria-hidden="true" class="position-absolute w-100 h-100">
          <defs>
            <pattern
              id=":Rem:"
              width="128"
              height="128"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="100%"
            >
              <path d="M0 128V.5H128" fill="none" stroke="currentColor"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#:Rem:)"></rect>
        </svg>
      </div>
      <div
        class="d-flex position-absolute justify-end align-center h-100 hidden-xs"
        style="
          right: 0;
          opacity: 0.4;
          z-index: 0 !important;
          pointer-events: none;
        "
      >
        <ClientOnly>
          <Vue3Lottie :height="500" animationLink="/lottie/tech.json" />
        </ClientOnly>
      </div>
      <div class="w-100 h-100">
        <v-container class="h-100">
          <v-row align="center" class="h-100">
            <v-col cols="12" md="8">
              <div
                class="text-h3 text-md-h2 text-lg-h1 font-weight-bold mb-6"
                style="transition: all 100ms linear"
              >
                Sagarmatha<br />
                <span class="text-primary">Techfest </span>
                2023
              </div>
              <div
                class="d-flex flex-wrap text-h5 font-weight-regular mb-9 w-100"
              >
                <div>
                  Where Innovation Meets
                  <!-- <br /> -->
                  <span class="text-primary font-weight-bold"
                    >New
                    <template v-for="item in items">
                      <template v-if="item === current"> {{ item }}! </template>
                    </template>
                  </span>
                </div>
              </div>
              <v-row dense justify="start">
                <v-col cols="12" sm="4" md="5" lg="4">
                  <v-btn
                    block
                    color="primary"
                    variant="flat"
                    height="48"
                    rounded="lg"
                    class="text-capitalize px-10 mr-3 mb-3"
                    to="/pre-events"
                  >
                    Register For Pre Events
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="4" md="5" lg="4">
                  <v-hover v-slot="{ isHovering, props }">
                    <v-btn
                      block
                      color="primary"
                      v-bind="props"
                      variant="flat"
                      rounded="lg"
                      height="48"
                      class="text-capitalize px-10"
                      to="/main-events"
                    >
                      Explore Main Events
                      <v-icon
                        end
                        color="white"
                        :class="isHovering ? 'ml-4' : 'ml-2'"
                        style="transition: all 100ms linear"
                      >
                        <Icon icon="mdi:arrow-right" />
                      </v-icon>
                    </v-btn>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-card>
    <v-divider class="mb-16"></v-divider>
  </template>
  <section class="mb-16">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazySharedSectionTitle
            section="sponsors"
            title="how is this possible?"
            subtitle="Brought to you By"
            text="we thank these companies helping us host this event"
          />
        </v-col>
        <v-col cols="12">
          <v-row justify="center">
            <template v-for="(level, i) in levels">
              <template v-if="level.count">
                <v-col cols="12">
                  <div
                    class="text-h5 font-weight-bold text-center text-capitalize"
                  >
                    {{ level.title }}
                  </div>
                </v-col>
              </template>
              <template v-for="(sponsor, i) in sponsors">
                <template v-if="sponsor.level.title === level.title">
                  <v-col cols="12" sm="4" md="2">
                    <NuxtLink :href="sponsor.link" target="_blank">
                      <v-img
                        height="120"
                        :src="sponsor.sponsorImage.url"
                      ></v-img>
                    </NuxtLink>
                  </v-col>
                </template>
              </template>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <LazySharedCountDown class="mb-16" />

  <template v-if="speakers.length">
    <section class="mb-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <LazySharedSectionTitle
              section="speakers"
              title="Who's Speaking?"
              subtitle="Learn from experienced"
              text="Hear inspiring talks, meet the best, industry leading people"
            />
          </v-col>
        </v-row>
        <v-row justify="center" v-auto-animate>
          <template v-if="loading">
            <template v-for="i in 4">
              <v-col cols="12" md="3">
                <v-skeleton-loader
                  rounded="lg"
                  type="image"
                  height="400"
                ></v-skeleton-loader>
              </v-col>
            </template>
          </template>
          <template v-else>
            <template v-for="(speaker, i) in speakers">
              <template v-if="i < speakerShowing">
                <v-col cols="12" sm="6" md="4" lg="3">
                  <LazySharedHomeSpeaker :speaker="speaker" />
                </v-col>
              </template>
            </template>
          </template>
        </v-row>
        <template v-if="speakers.length > 4">
          <v-row class="pt-6 pb-6" justify="center">
            <v-col cols="12" md="6">
              <div class="d-flex justify-center align-center">
                <v-divider></v-divider>
                <template v-if="speakerShowing < 5">
                  <v-btn
                    variant="outlined"
                    class="text-capitalize"
                    color="rgba(255,255,255,0.3)"
                    @click="
                      {
                        speakerShowing = speakers.length + 1;
                      }
                    "
                  >
                    View All Speakers
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn
                    variant="outlined"
                    class="text-capitalize"
                    color="rgba(255,255,255,0.3)"
                    @click="
                      {
                        speakerShowing = 4;
                      }
                    "
                  >
                    View Less Speakers
                  </v-btn>
                </template>
                <v-divider></v-divider>
              </div>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </section>
  </template>

  <LazySharedStatsCounter :class="prizes.length ? 'mb-16' : ''" />

  <template v-if="prizes.length">
    <section class="mb-16">
      <v-container>
        <v-row justify="center" v-auto-animate>
          <v-col cols="12">
            <LazySharedSectionTitle
              section="Prizes"
              title="will i get anything?"
              subtitle="Earn rewards for your contributions"
              text="take part in various workshop and events to win many prizes"
            />
          </v-col>
          <template v-for="(prize, i) in prizes">
            <template v-if="i < prizeShowing">
              <v-col cols="12" sm="6" md="4">
                <LazySharedHomePrize :prize="prize" />
              </v-col>
            </template>
          </template>
        </v-row>
        <template v-if="prizes.length > 3">
          <v-row class="pt-6 pb-6" justify="center">
            <v-col cols="12" md="6">
              <div class="d-flex justify-center align-center">
                <v-divider></v-divider>
                <template v-if="prizeShowing < 4">
                  <v-btn
                    variant="outlined"
                    class="text-capitalize"
                    color="rgba(255,255,255,0.3)"
                    @click="prizeShowing = prizes.length + 1"
                  >
                    View All Prizes
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn
                    variant="outlined"
                    class="text-capitalize"
                    color="rgba(255,255,255,0.3)"
                    @click="prizeShowing = 3"
                  >
                    View Less Prizes
                  </v-btn>
                </template>
                <v-divider></v-divider>
              </div>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </section>
  </template>
  <LazySharedHomeImageMarquee />
</template>
