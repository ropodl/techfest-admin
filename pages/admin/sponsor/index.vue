<script setup>
import { Icon } from "@iconify/vue";

const sponsor = useSponsor();
const role = useRole();
const level = useLevel();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Sponsors",
});

const loading = ref(true);
const itemsPerPage = ref(10);
const selected = ref([]);

const deleteBulk = async () => {
  await sponsor.removeBulk(selected.value);
  selected.value = [];
};

const loadSpeakers = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  await sponsor.getAllSponsors(page, itemsPerPage);
  loading.value = false;
};
// Sponsor level
const levelForm = ref();
const levelLoading = ref(true);
const loadLevels = async ({ page, itemsPerPage }) => {
  levelLoading.value = true;
  await level.getAllLevels(page, itemsPerPage);
  levelLoading.value = false;
};

const form = reactive({
  title: "",
  priority: "",
  status: "Draft",
});
const addSponsorLevel = async (isActive) => {
  levelLoading.value = true;
  await level.create(form);
  isActive.value = false;
  levelLoading.value = false;
};
</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">Sponsors</div>
      </v-col>
      <v-col cols="12" md="4"></v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn
              icon
              variant="tonal"
              class="mr-3"
              :loading="refresh"
              @click="deleteBulk"
            >
              <v-icon>
                <Icon icon="mdi:bin-outline" />
              </v-icon>
            </v-btn>
          </template>
          <v-dialog persistent scrim="black" width="700">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="tonal"
                rounded="lg"
                height="48"
                class="text-capitalize mr-3"
              >
                <v-icon start>
                  <Icon icon="mdi:elevation-decline" />
                </v-icon>
                Sponsor Level
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card>
                <v-btn
                  icon
                  variant="tonal"
                  @click="isActive.value = false"
                  class="position-absolute rounded-t-0 rounded-e-0"
                  style="top: 0; right: 0; z-index: 99"
                >
                  <v-icon icon>
                    <Icon icon="mdi:close" />
                  </v-icon>
                </v-btn>
                <v-card-title>
                  Sponsor Level
                  <v-dialog persistent scrim="black" width="400">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        variant="tonal"
                        rounded="lg"
                        class="text-capitalize ml-3"
                      >
                        <v-icon start>
                          <Icon icon="mdi:plus" />
                        </v-icon>
                        Add New Level
                      </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card title="Add New Level">
                        <v-btn
                          icon
                          variant="tonal"
                          @click="isActive.value = false"
                          class="position-absolute rounded-t-0 rounded-e-0"
                          style="top: 0; right: 0; z-index: 99"
                        >
                          <v-icon icon>
                            <Icon icon="mdi:close" />
                          </v-icon>
                        </v-btn>
                        <v-form
                          ref="levelForm"
                          @submit.prevent="addSponsorLevel(isActive)"
                        >
                          <v-card-text class="pb-0">
                            <v-text-field
                              v-model="form.title"
                              label="Sponsor Level Title"
                            ></v-text-field>
                            <v-text-field
                              v-model="form.priority"
                              label="Sponsor Level Priority Number"
                            ></v-text-field>
                            <v-select
                              label="Status"
                              v-model="form.status"
                              :items="['Draft', 'Published']"
                            ></v-select>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              type="submit"
                              height="48"
                              rounded="lg"
                              variant="tonal"
                              text="Save"
                              class="px-10"
                            ></v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table-server
                  v-model:items-per-page="level.pagination.itemsPerPage"
                  :headers="level.headers"
                  :items="level.levels"
                  :loading="levelLoading"
                  :items-length="level.pagination.totalItems"
                  item-value="id"
                  @update:options="loadLevels"
                >
                  <template v-slot:item.title="{ item }">
                    <span
                      class="text-warning font-weight-bold"
                      v-if="item.status === 'Draft'"
                      >Draft -</span
                    >
                    {{ item.title }}
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      icon
                      rounded="lg"
                      size="small"
                      color="success"
                      variant="tonal"
                      class="mr-2"
                    >
                      <v-icon>
                        <Icon icon="mdi:pencil" />
                      </v-icon>
                    </v-btn>
                    <v-dialog persistent scrim="black" width="500">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          icon
                          rounded="lg"
                          size="small"
                          color="error"
                          variant="tonal"
                        >
                          <v-icon>
                            <Icon icon="mdi:delete" />
                          </v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card title="Delete Sponsor Level">
                          <v-card-text class="mb-3">
                            Are you sure you want to delete "{{ item.title }}"?
                            This action cannot be undone.
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              rounded="lg"
                              variant="tonal"
                              color="success"
                              height="48"
                              text="Cancel"
                              class="text-capitalize px-10"
                              @click="isActive.value = false"
                            ></v-btn>
                            <v-btn
                              rounded="lg"
                              variant="tonal"
                              color="error"
                              height="48"
                              text="Delete"
                              class="text-capitalize px-10"
                              @click="level.remove(item.id)"
                            ></v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </template>
                </v-data-table-server>
              </v-card>
            </template>
          </v-dialog>
          <v-btn
            rounded="lg"
            variant="tonal"
            height="48"
            class="text-capitalize"
            to="/admin/sponsor/create"
          >
            <v-icon start><Icon icon="mdi:plus" /></v-icon>
            Add new Sponsor
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table-server
          show-select
          v-model="selected"
          v-model:items-per-page="itemsPerPage"
          :headers="sponsor.headers"
          :items="sponsor.sponsors"
          :loading="false"
          :items-length="10"
          item-value="id"
          @update:options="loadSpeakers"
        >
          <template v-slot:item.image="{ item }">
            <div class="py-3" style="width: 150px; height: 100px">
              <v-img
                cover
                class="w-100 h-100 rounded-lg"
                :src="item.sponsorImage.url"
              ></v-img>
            </div>
          </template>
          <template v-slot:item.title="{ item }">
            <v-list lines="three" width="300">
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </template>
          <template v-slot:item.level="{ item }">
            {{ item.level?.title }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              height="48"
              rounded="lg"
              color="success"
              variant="tonal"
              class="mr-2"
              :to="`/admin/sponsor/${item.id}`"
            >
              <v-icon>
                <Icon icon="mdi:pencil" />
              </v-icon>
            </v-btn>
            <v-dialog persistent scrim="black" width="500">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon
                  height="48"
                  rounded="lg"
                  color="error"
                  variant="tonal"
                >
                  <v-icon>
                    <Icon icon="mdi:delete" />
                  </v-icon>
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card title="Delete Sponsor">
                  <v-card-text>
                    Are you sure you want to delete "{{ item.name }}"? This
                    action cannot be undone.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      rounded="lg"
                      variant="tonal"
                      color="success"
                      height="48"
                      text="Cancel"
                      class="text-capitalize px-10"
                      @click="isActive.value = false"
                    ></v-btn>
                    <v-btn
                      rounded="lg"
                      variant="tonal"
                      color="error"
                      height="48"
                      text="Delete"
                      class="text-capitalize px-10"
                      @click="sponsor.remove(item.id)"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>
