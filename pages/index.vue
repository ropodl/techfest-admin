<script setup>
import CountUp from "vue-countup-v3";
import { Icon } from "@iconify/vue";
import { useTheme } from "vuetify/lib/framework.mjs";

const user = useUser();
const theme = useTheme();
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
const prizes = ref([]);

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
    prizes.value = data.value.prizes;
    loading.value = false;
  });
});

const stats = [
  {
    number: "21",
    name: "skilled speakers",
  },
  {
    number: "15000",
    name: "Expected Visitors",
  },
  {
    number: "42",
    name: "workshops",
  },
  {
    number: "17",
    name: "pre events",
  },
];

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
  max: 2, // max tilt rotation (degrees)
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
const normal = ref(true);
</script>
<template>
  <v-skeleton-loader type="image" height="700" :loading="loading">
    <ClientOnly>
      <v-card flat width="100%" rounded="0" color="transparent" height="700">
        <div class="rounded-lg" style="position: absolute; left: 0; top: 100px">
          <ul>
            <li>
              <v-btn
                class="text-capitalize"
                style="
                  width: 40px;
                  height: 40px;
                  background-color: #5357c4;
                  z-index: 10000;
                "
                @click="normal = !normal"
                >{{ normal }}</v-btn
              >
            </li>
          </ul>
        </div>

        <template v-if="normal">
          <v-container class="h-100">
            <v-row justify="center" align="center" class="h-100">
              <v-col cols="12" md="6">
                <div
                  class="text-h3 text-md-h2 text-lg-h2 text-left font-weight-bold mb-6"
                  style="
                    /* text-shadow: 20px 20px rgba(var(--v-theme-surface), 1); */
                    transition: all 100ms linear;
                  "
                >
                  Sagarmatha<br />
                  <span class="text-primary">Techfest </span>
                  2023
                </div>
                <div
                  class="d-flex flex-wrap justify-start text-h5 font-weight-regular text-center mb-9"
                >
                  Where Innovation Meets&nbsp;<span class="text-primary">{{
                    current
                  }}</span
                  >!
                </div>
                <div v-auto-animate class="d-flex flex-wrap justify-start">
                  <template v-if="!user.data?.id?.length">
                    <v-btn
                      variant="tonal"
                      height="48"
                      rounded="lg"
                      class="text-capitalize px-10 mr-3 mb-3"
                      to="/login"
                    >
                      Get Involved Now
                    </v-btn>
                  </template>
                  <v-hover v-slot="{ isHovering, props }">
                    <v-btn
                      v-bind="props"
                      variant="tonal"
                      rounded="lg"
                      height="48"
                      class="text-capitalize px-10"
                      to="/workshops"
                    >
                      Explore Workshops
                      <v-icon
                        end
                        :class="isHovering ? 'ml-4' : 'ml-2'"
                        style="transition: all 100ms linear"
                      >
                        <Icon icon="mdi:arrow-right" />
                      </v-icon>
                    </v-btn>
                  </v-hover>
                  <!-- <v-btn
                    color="#1093df"
                    variant="tonal"
                    height="48"
                    rounded="lg"
                    class="text-capitalize px-10"
                    target="_blank"
                    href="https://www.instagram.com/sagarmatha_tech_fest"
                  >
                    <span class="text-white">
                      <v-icon start>
                        <Icon icon="fa6-brands:instagram" />
                      </v-icon>
                      Join us on Instagram
                    </span>
                  </v-btn> -->
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <ClientOnly>
                  <Vue3Lottie animationLink="/lottie/tech.json" />
                </ClientOnly>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-else>
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
                    class="d-flex flex-wrap justify-center text-h5 font-weight-regular text-center mb-9"
                  >
                    Where Innovation Meets&nbsp;{{ current }}!
                  </div>
                  <div v-auto-animate class="d-flex flex-wrap justify-center">
                    <template v-if="!user.data?.id?.length">
                      <v-btn
                        variant="tonal"
                        height="48"
                        rounded="lg"
                        class="text-capitalize px-10 mr-3 mb-3"
                        to="/login"
                      >
                        Register Now
                      </v-btn>
                    </template>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        variant="tonal"
                        rounded="lg"
                        height="48"
                        class="text-capitalize px-10"
                        to="/workshops"
                      >
                        Explore Workshops
                        <v-icon
                          end
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
        </template>

        <v-img
          eager
          class="position-absolute w-100"
          src="/image/divider.png"
          style="bottom: 0; z-index: 10; pointer-events: none"
        ></v-img>
      </v-card>
    </ClientOnly>
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
      <v-row>
        <v-col cols="12" md="6">
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-card rounded="xl" v-bind="props">
                <v-img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHRlY2glMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D"
                ></v-img>
              </v-card>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Dialog">
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    text="Close Dialog"
                    @click="isActive.value = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <section>
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
            <v-col cols="12" sm="6" md="4" lg="3">
              <LazyAdminSharedHomeSpeaker :speaker="speaker" />
            </v-col>
          </template>
        </template>
      </v-row>
      <v-row class="pt-6" justify="center">
        <v-col cols="12" md="8">
          <div class="d-flex justify-center align-center">
            <v-divider></v-divider>
            <v-btn
              variant="outlined"
              class="text-capitalize"
              :color="isDark ? 'rgba(255,255,255,0.3)' : ''"
            >
              View All Speakers
            </v-btn>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section>
    <v-parallax
      height="300"
      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    >
      <div class="w-100 h-100" style="background-color: rgba(0, 0, 0, 0.8)">
        <v-container class="h-100">
          <v-row class="h-100">
            <ClientOnly>
              <template v-for="(stat, i) in stats">
                <v-col cols="12" md="3" class="h-100">
                  <div class="d-flex h-100 w-100 justify-center align-center">
                    <div class="text-center">
                      <v-card-title class="text-h1 d-flex align-start">
                        <!-- {{ stat.number }} -->
                        <count-up
                          :options="{
                            duration: 5,
                            enableScrollSpy: true,
                            scrollSpyOnce: true,
                          }"
                          :end-val="stat.number"
                        >
                          <template #suffix> </template>
                        </count-up>
                        <span class="text-h4 font-weight-bold text-primary"
                          >+</span
                        >
                      </v-card-title>
                      <v-card-text class="text-uppercase">
                        {{ stat.name }}
                      </v-card-text>
                    </div>
                  </div>
                </v-col>
              </template>
            </ClientOnly>
          </v-row>
        </v-container>
      </div>
    </v-parallax>
  </section>
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
<style lang="scss">
.hero-overlay {
  .v-overlay__scrim {
    opacity: 0.8 !important;
  }
}
</style>
