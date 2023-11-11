<script setup>
import { Icon } from "@iconify/vue";
import { useTheme } from "vuetify/lib/framework.mjs";

const theme = useTheme();
const runtimeConfig = useRuntimeConfig();

const { start, isPending } = useTimeoutFn(() => {
  current.value = items.value[Math.floor(Math.random() * 6)];
}, 6000);

const isDark = computed(() => theme.global.current.value.dark);

useHead({
  title: "Sagarmatha Tech Fest 2023",
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/image/logo.png",
    },
  ],
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
const prizeShowing = ref(4);

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
    console.log(data.value);
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
  <v-skeleton-loader type="image" height="700" :loading="loading">
    <v-card flat width="100%" rounded="0" color="transparent" height="700">
      <div
        class="w-100 h-100"
        style="
          position: absolute;
          display: flex;
          justify-items: center;
          align-items: center;
          opacity: 0.1;
          z-index: 0;
          pointer-events: none;
        "
      >
        <ClientOnly>
          <Vue3Lottie :height="500" animationLink="/lottie/tech.json" />
        </ClientOnly>
      </div>
      <div class="w-100 h-100" v-tilt="tiltOptions">
        <v-container class="h-100">
          <v-row justify="center" align="center" class="h-100">
            <v-col cols="12" md="8">
              <div
                class="text-h3 text-md-h2 text-lg-h1 text-center font-weight-bold mb-6"
                style="transition: all 100ms linear"
              >
                Sagarmatha
                <span class="text-primary">Techfest </span>
                2023
              </div>
              <div
                class="d-flex flex-wrap justify-center text-h5 font-weight-regular text-center mb-9 line-clamp-1 w-100"
              >
                <div v-auto-animate>
                  Where Innovation Meets&nbsp;
                  <template v-for="item in items">
                    <template v-if="item === current">
                      {{ item }}
                    </template>
                  </template>
                </div>
                !
              </div>
              <div v-auto-animate class="d-flex flex-wrap justify-center">
                <v-btn
                  variant="flat"
                  height="48"
                  rounded="lg"
                  class="text-capitalize px-10 mr-3 mb-3"
                  to="/pre-events"
                >
                  Register For Pre Events
                </v-btn>
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn
                    v-bind="props"
                    variant="flat"
                    rounded="lg"
                    height="48"
                    class="text-capitalize px-10"
                    to="/workshops"
                  >
                    Explore Workshops
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
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-img
        eager
        class="position-absolute w-100"
        src="/image/divider.png"
        style="bottom: 0; z-index: 10; pointer-events: none"
      ></v-img>
    </v-card>
  </v-skeleton-loader>
  <section>
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
                  <v-col cols="12" md="2">
                    <NuxtLink href="https://facebook.com" target="_blank">
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

  <LazySharedCountDown />

  <section class="pb-16">
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
                <LazyAdminSharedHomeSpeaker :speaker="speaker" />
              </v-col>
            </template>
          </template>
        </template>
      </v-row>
      <v-row class="pt-6" justify="center">
        <v-col cols="12" md="8">
          <div class="d-flex justify-center align-center">
            <v-divider></v-divider>
            <template v-if="speakerShowing < 5">
              <v-btn
                variant="outlined"
                class="text-capitalize"
                :color="isDark ? 'rgba(255,255,255,0.3)' : ''"
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
    </v-container>
  </section>
  <LazySharedStatsCounter />
  <section>
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
          <v-col cols="12" md="4">
            <LazyAdminSharedHomePrize :prize="prize" />
          </v-col>
        </template>
      </v-row>
      <v-row class="pt-6" justify="center">
        <v-col cols="12" md="8">
          <div class="d-flex justify-center align-center">
            <v-divider></v-divider>
            <template v-if="speakerShowing < 5">
              <v-btn
                variant="outlined"
                class="text-capitalize"
                :color="isDark ? 'rgba(255,255,255,0.3)' : ''"
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
            section="resource"
            title="Explore Resources"
            subtitle="Learn about various protocol and positions"
            text="some thing"
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
