<script setup>
import { Icon } from "@iconify/vue";
import { VDataTableServer } from "vuetify/lib/labs/components.mjs";

const team = useTeams();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Team Members",
});

const loading = ref(true);

const selected = ref([]);

const loadTeam = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  await team.getAllTeams(page, itemsPerPage);
  loading.value = false;
};

const deleteBulk = () => {
  console.log("test");
};
</script>

<template>
  {{ team.teams }}
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">Team Members</div>
      </v-col>
      <v-col cols="12" md="4">
        <!-- {{ searchBlog }}{{ searchItem }} -->
        <!-- <v-autocomplete hide-details hide-no-data v-model="searchItem" @update:modelValue="search" rounded="pill" variant="solo-filled" placeholder="Search Blog" menu-icon="" prepend-inner-icon="mdi-magnify"></v-autocomplete> -->
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn icon variant="tonal" class="mr-3" @click="deleteBulk">
              <v-icon>
                <Icon icon="mdi:bin-outline" />
              </v-icon>
            </v-btn>
          </template>
          <v-btn
            variant="tonal"
            height="40"
            class="text-capitalize"
            to="/admin/team/create"
          >
            <v-icon start><Icon icon="mdi:plus" /></v-icon>
            Add new Team Member
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- v-model="selected" -->
        <!-- :search="search" -->
        <v-data-table-server
          show-select
          v-model:items-per-page="team.pagination.itemsPerPage"
          :headers="team.headers"
          :items="team.teams"
          :loading="loading"
          :items-length="team.pagination.totalItems"
          item-value="id"
          @update:options="loadTeam"
        >
          <template v-slot:item.memberImage="{ item }">
            <div class="py-3" style="width: 150px; height: 100px">
              <v-img class="w-100 h-100" :src="item.memberImage.url"></v-img>
            </div>
          </template>
          <template v-slot:item.name="{ item }">
            <v-list lines="three" width="300">
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  <template v-if="item.status === 'Draft'">
                    <span class="text-warning">{{ item.status }} -</span>
                  </template>
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span v-if="item.leader">Team Leader -</span>
                  {{ item.role }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ item.email }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ item.phone }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              color="success"
              variant="tonal"
              class="mr-2"
              :to="`/admin/team/${item.id}`"
            >
              <v-icon>
                <Icon icon="mdi:pencil" />
              </v-icon>
            </v-btn>
            <v-dialog persistent scrim="black" width="500">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon color="error" variant="tonal">
                  <v-icon>
                    <Icon icon="mdi:delete" />
                  </v-icon>
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card title="Delete Team Member">
                  <v-card-text class="mb-3">
                    Are you sure you want to delete "{{ item.name }}"? This
                    action cannot be undone.
                  </v-card-text>
                  <v-card-text class="pa-0">
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-btn
                          block
                          rounded="0"
                          variant="tonal"
                          color="success"
                          height="50"
                          text="Cancel"
                          class="text-capitalize"
                          @click="isActive.value = false"
                        ></v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn
                          block
                          rounded="0"
                          variant="tonal"
                          color="error"
                          height="50"
                          text="Delete"
                          class="text-capitalize"
                          @click="team.remove(item.id)"
                        ></v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>
