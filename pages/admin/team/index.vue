<script setup>
import { Icon } from "@iconify/vue";

const team = useTeam();
const role = useRole();

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

// Roles Scripts
const roleLoading = ref(true);
const loadRoles = async ({ page, itemsPerPage }) => {
  roleLoading.value = true;
  await role.getAllRoles(page, itemsPerPage);
  roleLoading.value = false;
};

const form = reactive({
  title: "",
  level: null,
  status: "Draft",
});

const addRole = async (isActive) => {
  roleLoading.value = true;
  const { success } = await role.create(form);
  console.log(success);
  if (success) {
    // console.log(res);
    isActive.value = false;
    roleLoading.value = false;
    await loadRoles({ page: 1, itemsPerPage: 10 });
  } else {
    roleLoading.value = false;
    return 0;
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">Team Members</div>
      </v-col>
      <v-col cols="12" md="8">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length">
            <v-btn
              icon
              rounded="lg"
              variant="tonal"
              height="48"
              class="mr-3"
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
                rounded="lg"
                variant="tonal"
                height="48"
                class="text-capitalize mr-3"
              >
                <v-icon start>
                  <Icon icon="mdi:account-sync" />
                </v-icon>
                Team Roles
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card border>
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
                  Team Roles
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
                        Add New Role
                      </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card title="Add New Role">
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
                        <v-form @submit.prevent="addRole(isActive)">
                          <v-card-text class="pb-0">
                            <v-text-field
                              v-model="form.title"
                              label="Role Title"
                            ></v-text-field>
                            <v-text-field
                              v-model="form.level"
                              label="Role Priority Number"
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
                  v-model:items-per-page="role.pagination.itemsPerPage"
                  :headers="role.headers"
                  :items="role.roles"
                  :loading="roleLoading"
                  :items-length="role.pagination.totalItems"
                  item-value="id"
                  @update:options="loadRoles"
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
                        <v-card title="Delete Team Member">
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
                              @click="role.remove(item.id)"
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
            to="/admin/team/create"
          >
            <v-icon start><Icon icon="mdi:plus" /></v-icon>
            Add Team Member
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border elevation="0" rounded="lg">
          <v-data-table-server
            show-select
            v-model="selected"
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
                <v-img
                  cover
                  class="w-100 h-100 rounded-lg"
                  :src="item.memberImage?.url"
                ></v-img>
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
                    {{ item.role?.title }}
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
                height="48"
                rounded="lg"
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
                  <v-btn
                    v-bind="props"
                    icon
                    color="error"
                    height="48"
                    rounded="lg"
                    variant="tonal"
                  >
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
