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
  <v-dialog persistent scrim="black" width="1000">
    <template v-slot:activator="{ props }">
      <v-card flat :ripple="false" color="transparent" class="pt-5">
        <div class="d-flex justify-center w-100">
          <v-card
            v-tilt
            border
            rounded="xl"
            width="250"
            height="250"
            v-bind="props"
          >
            <v-img
              cover
              class="w-100 h-100"
              :src="speaker.speakerImage?.url"
            ></v-img>
          </v-card>
        </div>
        <template
          v-if="
            speaker.facebook?.length |
              speaker.twitter?.length |
              speaker.linkedin?.length
          "
        >
          <div class="w-100 d-flex justify-center mt-n5">
            <v-card elevation="0" rounded="lg">
              <v-card-text class="py-0">
                <template v-if="speaker.facebook?.length">
                  <v-btn
                    icon
                    rounded="0"
                    variant="text"
                    size="small"
                    target="_blank"
                    :href="speaker.facebook"
                  >
                    <v-icon>
                      <Icon icon="fa6-brands:facebook-f" />
                    </v-icon>
                  </v-btn>
                </template>
                <template v-if="speaker.twitter?.length">
                  <v-btn icon rounded="0" variant="text" size="small">
                    <v-icon>
                      <Icon icon="fa6-brands:twitter" />
                    </v-icon>
                  </v-btn>
                </template>
                <template v-if="speaker.linkedin?.length">
                  <v-btn icon rounded="0" variant="text" size="small">
                    <v-icon>
                      <Icon icon="fa6-brands:linkedin" />
                    </v-icon>
                  </v-btn>
                </template>
              </v-card-text>
            </v-card>
          </div>
        </template>
        <v-card-title
          class="text-center text-h5 mt-3"
          v-text="speaker.name"
          style="white-space: unset"
        ></v-card-title>
        <v-card-text class="text-center text-primary">
          [ {{ speaker.position }} ]
        </v-card-text>
      </v-card>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card border>
        <v-row no-gutters>
          <v-col cols="12" md="5">
            <v-img
              cover
              height="500"
              :src="speaker.speakerImage?.url"
              style="position: sticky; top: 0"
            ></v-img>
          </v-col>
          <v-col cols="12" md="7">
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
            <v-card-title class="pt-10" style="white-space: unset">
              <div class="text-h2" v-text="speaker.name"></div>
            </v-card-title>
            <v-card-title v-text="speaker.position"></v-card-title>
            <template
              v-if="
                speaker.facebook?.length |
                  speaker.twitter?.length |
                  speaker.linkedin?.length
              "
            >
              <v-divider></v-divider>
              <div
                class="position-sticky"
                style="top: 0; background-color: rgb(33, 33, 33)"
              >
                <v-card-title>
                  <template v-if="speaker.facebook?.length">
                    <v-btn
                      icon
                      height="48"
                      rounded="lg"
                      class="me-3"
                      variant="tonal"
                      size="large"
                      target="_blank"
                      :href="speaker.facebook"
                    >
                      <v-icon>
                        <Icon icon="fa6-brands:facebook-f" />
                      </v-icon>
                    </v-btn>
                  </template>
                  <template v-if="speaker.twitter?.length">
                    <v-btn
                      icon
                      height="48"
                      rounded="lg"
                      class="me-3"
                      variant="tonal"
                      size="large"
                      target="_blank"
                      :href="speaker.twitter"
                    >
                      <v-icon>
                        <Icon icon="fa6-brands:twitter" />
                      </v-icon>
                    </v-btn>
                  </template>
                  <template v-if="speaker.linkedin?.length">
                    <v-btn
                      icon
                      height="48"
                      rounded="lg"
                      class="me-3"
                      variant="tonal"
                      size="large"
                      target="_blank"
                      :href="speaker.linkedin"
                    >
                      <v-icon>
                        <Icon icon="fa6-brands:linkedin" />
                      </v-icon>
                    </v-btn>
                  </template>
                </v-card-title>
                <v-divider></v-divider>
              </div>
            </template>
            <v-card-text v-text="speaker.description"></v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>
