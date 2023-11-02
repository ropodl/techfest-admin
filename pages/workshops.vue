<script setup>
import { Icon } from "@iconify/vue";

const { status, user } = useAuth();
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
const getAllWorkshops = async () => {
  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/workshop"
  );
  if (error.value) return console.log(error.value);
  workshops.value = data.value;
};

const registerLoading = ref(false);
const register = async (id) => {
  if (status.value === "unauthenticated") {
    navigateTo("/login");
    return snackbar.showSnackbar("Login to register for event", "warning");
  }

  const { data, error } = await useFetch(
    runtimeConfig.public.api_url + "/frontend/register-workshop",
    {
      method: "POST",
      body: {
        workshopId: id,
        email: user.value.email,
      },
    }
  );
  if (error.value) return snackbar.showSnackbar(error.value, "error");
  console.log(data.value);
  snackbar.showSnackbar(
    data.value.message,
    data.value.success ? "success" : "error"
  );
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" v-for="(workshop, i) in workshops">
        <v-dialog persistent height="500" scrim="black" width="1000">
          <template v-slot:activator="{ props }">
            <v-card v-bind="props">
              <v-img
                cover
                height="400"
                class="align-end"
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
                  <v-card-title class="position-fixed" style="top: 0; right: 0">
                    <v-btn
                      icon
                      variant="tonal"
                      color="white"
                      @click="isActive.value = false"
                    >
                      <v-icon icon>
                        <Icon icon="mdi:close" />
                      </v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-title
                    v-text="workshop.title"
                    class="pt-10 text-h3"
                    style="line-height: normal; white-space: unset"
                  ></v-card-title>
                  <v-card flat color="transparent" class="pb-0">
                    <v-card-text
                      class="d-flex align-center justify-space-between"
                    >
                      <div>
                        <v-icon start size="small">
                          <Icon icon="mdi:check" />
                        </v-icon>
                        <span class="font-weight-bold">Already Registered</span>
                        <span class="font-weight-bold">
                          Still not Registered
                        </span>
                      </div>
                      <v-btn
                        color="white"
                        variant="tonal"
                        class="text-capitalize px-10"
                        height="40"
                        :loading="registerLoading"
                        :disabled="registerLoading"
                        @click="register(workshop._id)"
                      >
                        Register Now
                      </v-btn>
                    </v-card-text>
                  </v-card>
                  <v-card-text>
                    <LazySharedDynamicContent :content="workshop.description" />
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
