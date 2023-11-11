<script setup>
import { Icon } from "@iconify/vue";

const user = useUser();
const runtimeConfig = useRuntimeConfig();
const snackbar = useSnackbar();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Workshops",
});

onMounted(() => {
  nextTick(() => {
    getAllWorkshops();
  });
});

const workshops = ref([]);
const loading = ref(true);
const getAllWorkshops = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/workshop"
  );
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  workshops.value = data.value;
  loading.value = false;
};

const registerLoading = ref(false);
const register = async (id) => {
  console.log(id);
  if (!user.data?.id?.length) {
    navigateTo("/login");
    return snackbar.showSnackbar("Login to register for the event", "warning");
  }

  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/register-workshop",
    {
      method: "POST",
      body: {
        workshopId: id,
        email: user.data.email,
      },
    }
  );
  if (error.value) return snackbar.showSnackbar(error.value, "error");
  console.log(data.value);
  snackbar.showSnackbar(
    data.value.message,
    data.value.success ? "success" : "error"
  );
  if (data.value.success) {
    registered.push(id);
  }
};
const registered = reactive([]);
const userWorkshops = computed(() => {
  // let workshops = [];
  user.data?.workshops?.map((item) => {
    registered.push(item.id);
  });
  return workshops;
});
</script>

<template>
  <v-container>
    <v-row>
      <template v-if="loading">
        <v-col cols="12" md="3" v-for="i in 12">
          <v-skeleton-loader type="image" height="400"></v-skeleton-loader>
        </v-col>
      </template>
      <template v-else>
        <template v-if="workshops.length">
          <v-col cols="12" md="3" v-for="(workshop, i) in workshops">
            <v-dialog persistent height="500" scrim="black" width="1000">
              <template v-slot:activator="{ props: dialog }">
                <v-hover v-slot="{ isHovering, props: hover }">
                  <v-card v-bind="{ ...dialog, ...hover }">
                    <v-img
                      cover
                      height="400"
                      class="align-end"
                      :class="isHovering ? 'zoom-image' : ''"
                      :src="workshop.workshopImage.url"
                      :alt="workshop.workshopImage.name"
                      gradient="180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(var(--v-theme-primary),1) 100%"
                    >
                      <v-tooltip
                        text="Click to learn more"
                        content-class="primary"
                        location="bottom"
                      >
                        <template v-slot:activator="{ props }">
                          <v-btn
                            icon
                            size="small"
                            v-bind="props"
                            variant="tonal"
                            class="position-absolute rounded-t-0 rounded-e-0"
                            style="top: 0; right: 0"
                          >
                            <v-icon>
                              <Icon icon="mdi:arrow-top-right" />
                            </v-icon>
                          </v-btn>
                        </template>
                      </v-tooltip>
                      <v-card flat color="transparent">
                        <v-card-title
                          class="text-h5 line-clamp-3"
                          v-text="workshop.title"
                        ></v-card-title>
                      </v-card>
                    </v-img>
                  </v-card>
                </v-hover>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-row no-gutters>
                    <v-col cols="12" md="5">
                      <v-img
                        cover
                        height="500"
                        :src="workshop.workshopImage.url"
                        :alt="workshop.workshopImage.name"
                        style="position: sticky; top: 0"
                      ></v-img>
                    </v-col>
                    <v-col cols="12" md="7" class="position-relative">
                      <v-btn
                        icon
                        variant="tonal"
                        color="white"
                        class="position-absolute right-0 rounded-t-0 rounded-e-0"
                        @click="isActive.value = false"
                      >
                        <v-icon icon>
                          <Icon icon="mdi:close" />
                        </v-icon>
                      </v-btn>
                      <v-card-title
                        v-text="workshop.title"
                        class="pt-10 text-h3"
                        style="line-height: normal; white-space: unset"
                      ></v-card-title>
                      <v-divider></v-divider>
                      <v-banner
                        lines="one"
                        :icon="
                          registered.includes(workshop.id)
                            ? 'mdi-check'
                            : 'mdi-lock'
                        "
                        :color="
                          registered.includes(workshop.id) ? 'success' : 'error'
                        "
                        sticky
                      >
                        <v-banner-text>
                          {{
                            registered.includes(workshop.id)
                              ? "You are registered."
                              : "Not Registered, yet?"
                          }}
                        </v-banner-text>
                        <template v-slot:actions>
                          <template v-if="!registered.includes(workshop.id)">
                            <v-btn
                              color="white"
                              variant="tonal"
                              class="text-capitalize px-10"
                              :loading="registerLoading"
                              :disabled="registerLoading"
                              @click="register(workshop.id)"
                            >
                              Register Now
                            </v-btn>
                          </template>
                        </template>
                      </v-banner>
                      <v-card-text>
                        <LazySharedDynamicContent
                          :content="workshop.description"
                        />
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="12">
            <v-card>
              <v-card-text>Content not available.</v-card-text>
            </v-card>
          </v-col>
        </template>
      </template>
    </v-row>
  </v-container>
</template>
