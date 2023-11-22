<script setup>
import CountUp from "vue-countup-v3";
import { useDisplay } from "vuetify";
const { smAndDown, mdAndDown } = useDisplay();

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
        <template v-for="(stat, i) in stats">
          <v-col cols="12" md="3">
            <div class="d-flex h-100 w-100 justify-center align-center">
              <div class="text-center">
                <v-card-title class="text-h1 d-flex align-start">
                  <ClientOnly>
                    <count-up
                      :options="countDownOptions"
                      :end-val="stat.number"
                    ></count-up>
                  </ClientOnly>
                  <span class="text-h4 font-weight-bold text-primary">+</span>
                </v-card-title>
                <v-card-text class="text-uppercase">
                  {{ stat.name }}
                </v-card-text>
              </div>
            </div>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </section>
</template>
