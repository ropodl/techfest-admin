<script setup>
import { Icon } from "@iconify/vue";

const admin = useAdmin();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Admins",
});

const loading = ref(true);
// Search
const search = ref("");
// Table item select / delete
const selected = ref([]);
const deleteBulk = async () => {
  await blog.removeBulk(selected.value);
  selected.value = [];
};
const loadAdmins = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  await admin.getAllAdmins(page, itemsPerPage);
  loading.value = false;
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <LazyAdminSharedPageTitle title="All Admins" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex justify-end">
          <v-btn
            height="48"
            rounded="lg"
            variant="tonal"
            class="text-capitalize"
            to="/admin/create"
          >
            <v-icon start>
              <Icon icon="mdi:plus" />
            </v-icon>
            Add New Admin
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border elevation="0" rounded="lg">
          <v-data-table-server
            v-model:items-per-page="admin.pagination.itemsPerPage"
            :headers="admin.headers"
            :items="admin.admins"
            :loading="loading"
            :items-length="admin.pagination.totalItems"
            item-value="id"
            @update:options="loadAdmins"
          >
            <template v-slot:item.name="{ item }">
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-text>{{ item.email }}</v-card-text>
            </template>
            <template v-slot:item.actions="{ item }">
              <!-- <v-btn
                icon
                rounded="lg"
                height="48"
                color="success"
                variant="tonal"
                class="mr-2"
                :to="`/admin/blog/${item.id}`"
              >
                <v-icon>
                  <Icon icon="mdi:pencil" />
                </v-icon>
              </v-btn> -->
              <v-dialog persistent scrim="black" width="500">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    rounded="lg"
                    height="48"
                    color="error"
                    variant="tonal"
                  >
                    <v-icon>
                      <Icon icon="mdi:delete" />
                    </v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card border title="Delete Blog">
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
                        height="50"
                        text="Cancel"
                        class="text-capitalize px-10"
                        @click="isActive.value = false"
                      ></v-btn>
                      <v-btn
                        rounded="lg"
                        variant="tonal"
                        color="error"
                        height="50"
                        text="Delete"
                        class="text-capitalize px-10"
                        @click="admin.remove(item.id)"
                      ></v-btn>
                    </v-card-actions>
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

<style></style>
