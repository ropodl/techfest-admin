<script setup>
import { Icon } from "@iconify/vue";

const targetDate = ref(new Date("2023-12-15"));
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const updateCountdown = () => {
  const now = new Date();
  const difference = targetDate.value.getTime() - now.getTime();

  days.value = Math.floor(difference / (1000 * 60 * 60 * 24));
  hours.value = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  minutes.value = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((difference % (1000 * 60)) / 1000);
};

watch(targetDate, updateCountdown);

onMounted(() => {
  setInterval(updateCountdown, 1000);
});
</script>
<template>
  <section
    class="pt-16"
    style="background: linear-gradient(180deg, #1e1e1e 70%, transparent 0)"
  >
    <v-container>
      <v-row class="mb-6">
        <v-col cols="12" md="4">
          <div class="text-h3 font-weight-bold">
            Count
            <span class="text-primary">
              Every<br />
              Second
            </span>
            Until<br />
            the <span class="text-primary">Main Event</span>
          </div>
        </v-col>
        <v-col cols="12" md="1">
          <div class="d-flex justify-center h-100 w-100">
            <v-divider vertical inset style="height: 100%"></v-divider>
          </div>
        </v-col>
        <v-col cols="12" md="7">
          <div class="d-flex align-start justify-space-around w-100 h-100">
            <div class="text-center">
              <div class="text-h2 font-weight-bold mb-3">{{ days }}</div>
              <div class="text-primary">[ Days ]</div>
            </div>
            <span class="text-h3">:</span>
            <div class="text-center">
              <div class="text-h2 font-weight-bold mb-3">{{ hours }}</div>
              <div class="text-primary">[ Hours ]</div>
            </div>
            <span class="text-h3">:</span>
            <div class="text-center">
              <div class="text-h2 font-weight-bold mb-3">{{ minutes }}</div>
              <div class="text-primary">[ Minutes ]</div>
            </div>
            <span class="text-h3">:</span>
            <div class="text-center">
              <div class="text-h2 font-weight-bold mb-3">{{ seconds }}</div>
              <div class="text-primary">[ Seconds ]</div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-dialog persistent scrim="black" width="900">
            <template v-slot:activator="{ props }">
              <v-card border rounded="xl">
                <v-img cover height="450" src="/image/slider/overlay.jpg">
                  <div
                    class="w-100 h-100"
                    style="
                      background-color: rgba(0, 0, 0, 0.4);
                      backdrop-filter: blur(5px);
                    "
                  >
                    <v-container class="h-100 w-100">
                      <v-row align="center" justify="center" class="h-100">
                        <v-col cols="12" md="9">
                          <div class="text-center align-center">
                            <v-card-title
                              class="text-h3"
                              style="
                                line-break: loose;
                                white-space: normal;
                                line-height: normal;
                              "
                              >Platform for innovation.</v-card-title
                            >
                            <v-card-text
                              >A grand platform where visionary young minds
                              converge to spark innovation and flaunt their
                              ingenious talents.</v-card-text
                            >
                            <v-btn
                              icon
                              size="90"
                              v-bind="props"
                              rounded="fab"
                              variant="flat"
                              class="play-button"
                            >
                              <v-icon size="60">
                                <Icon icon="mdi:play" />
                              </v-icon>
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </v-img>
              </v-card>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card border class="overflow-hidden">
                <v-btn
                  icon
                  variant="tonal"
                  color="white"
                  @click="isActive.value = false"
                  class="position-absolute rounded-t-0 rounded-e-0"
                  style="top: 0; right: 0; z-index: 99"
                >
                  <v-icon icon>
                    <Icon icon="mdi:close" />
                  </v-icon>
                </v-btn>
                <video loop controls autoplay>
                  <source
                    :src="
                      isActive.value === false ? '' : '/assets/video/intro.mp4'
                    "
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<style lang="scss">
.play-button {
  background-color: rgb(82, 85, 196);
  box-shadow: 0 0 0 0 rgba(82, 85, 196, 1);
  transform: scale(1);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
