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
  <section>
    <v-parallax
      :height="mdAndDown ? 800 : 400"
      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    >
      <div class="w-100 h-100" style="background-color: rgba(0, 0, 0, 0.8)">
        <v-container class="h-100">
          <v-row justify="center" class="h-100">
            <template v-for="(stat, i) in stats">
              <v-col cols="12" md="3" :class="mdAndDown ? '' : 'h-100'">
                <div class="d-flex h-100 w-100 justify-center align-center">
                  <div class="text-center">
                    <v-card-title class="text-h1 d-flex align-start">
                      <ClientOnly>
                        <count-up
                          :options="countDownOptions"
                          :end-val="stat.number"
                        >
                          <template #suffix> </template>
                        </count-up>
                      </ClientOnly>
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
          </v-row>
        </v-container>
      </div>
    </v-parallax>
  </section>
</template>
