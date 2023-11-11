<script setup>
import { Icon } from "@iconify/vue";

const { admin } = useAdmin();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Dashboard",
});

const counters = ref([]);
onMounted(async () => {
  const { data, error } = await useFetch(
    `${runtimeConfig.public.api_url}/api/v1/dashboard`
  );
  console.log(data.value);
  counters.value = data.value.counter;
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">
          Welcome back, {{ admin.name || "User" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <template v-if="counters.length">
        <template v-for="(counter, i) in counters">
          <v-col cols="12" md="3">
            <v-card>
              <v-card-text
                class="text-h5 font-weight-black pb-0"
                v-text="counter.number"
              />
              <v-card-title v-text="counter.title" />
              <v-icon
                :color="counter.color"
                style="
                  position: absolute;
                  top: 0;
                  right: -20px;
                  font-size: 100px;
                  z-index: -1;
                "
              >
                <Icon :icon="counter.icon" />
              </v-icon>
            </v-card>
          </v-col>
        </template>
      </template>
    </v-row>
  </v-container>
</template>
