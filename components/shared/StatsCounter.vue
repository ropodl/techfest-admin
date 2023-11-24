<script setup>
import CountUp from "vue-countup-v3";
import { useDisplay } from "vuetify";

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

const countDownOptions = {
  duration: 5,
  enableScrollSpy: true,
  scrollSpyOnce: true,
};
</script>
<template>
  <section class="position-relative" style="background-color: #1e1e1e">
    <v-container>
      <v-row class="py-16" justify="center">
        <v-col cols="12" sm="6" md="3">
          <div class="d-flex h-100 w-100 justify-center align-center">
            <div class="text-center">
              <v-card-title class="text-h1 d-flex align-start">
                <ClientOnly>
                  <count-up
                    :options="countDownOptions"
                    :end-val="21"
                  ></count-up>
                </ClientOnly>
                <span class="text-h4 font-weight-bold text-primary">+</span>
              </v-card-title>
              <v-card-text class="text-uppercase">
                skilled speakers
              </v-card-text>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div class="d-flex h-100 w-100 justify-center align-center">
            <div class="text-center">
              <v-card-title class="text-h1 d-flex align-start">
                <ClientOnly>
                  <count-up
                    :options="countDownOptions"
                    :end-val="15000"
                  ></count-up>
                </ClientOnly>
                <span class="text-h4 font-weight-bold text-primary">+</span>
              </v-card-title>
              <v-card-text class="text-uppercase">
                expected visitors
              </v-card-text>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <div class="d-flex h-100 w-100 justify-center align-center">
            <div class="text-center">
              <v-card-title class="text-h1 d-flex align-start">
                <ClientOnly>
                  <count-up
                    :options="countDownOptions"
                    :end-val="42"
                  ></count-up>
                </ClientOnly>
                <span class="text-h4 font-weight-bold text-primary">+</span>
              </v-card-title>
              <v-card-text class="text-uppercase">Mega Events</v-card-text>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="d-flex h-100 w-100 justify-center align-center">
            <div class="text-center">
              <v-card-title class="text-h1 d-flex align-start">
                <ClientOnly>
                  <count-up
                    :options="countDownOptions"
                    :end-val="17"
                  ></count-up>
                </ClientOnly>
                <span class="text-h4 font-weight-bold text-primary">+</span>
              </v-card-title>
              <v-card-text class="text-uppercase">Pre Events</v-card-text>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
