<script setup>
import { Icon } from "@iconify/vue";

const contactRequest = useContactRequest();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Contact Form Requests",
});

const headers = [
  {
    title: "Name",
    align: "start",
    key: "name",
  },
  {
    title: "Phone Number",
    align: "start",
    sortable: false,
    key: "phone",
  },
  {
    title: "Email Address",
    align: "start",
    sortable: false,
    key: "email",
  },
  {
    title: "Actions",
    align: "start",
    sortable: false,
    width: 200,
    key: "actions",
  },
];

const loading = ref(true);
const itemsPerPage = ref(10);
// Delete Bulk
const selected = ref([]);
const deleteBulk = async () => {
  await contactRequest.removeBulk(selected.value);
  selected.value = [];
};

const pagination = ref({
  totalPage: 0,
  totalItems: 0,
  itemsPerPage: itemsPerPage.value,
  currentPage: 1,
});

const loadContactFormRequest = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  await contactRequest.getAllContactRequests(page, itemsPerPage, sortBy);
  pagination.value = contactRequest.contactRequests.pagination;
  loading.value = false;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <LazyAdminSharedPageTitle title="Contact Form Requests">
          Contact Form Requests
        </LazyAdminSharedPageTitle>
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex justify-end">
          <template v-if="selected.length">
            <v-btn icon height="40" variant="tonal" @click="deleteBulk">
              <v-icon>
                <Icon icon="mdi:bin-outline" />
              </v-icon>
            </v-btn>
          </template>
        </div>
      </v-col>
      <v-col cols="12">
        <v-card border elevation="0" rounded="lg">
          <v-data-table-server
            show-select
            v-model="selected"
            v-model:items-per-page="pagination.itemsPerPage"
            :headers="headers"
            :items-length="pagination.totalItems"
            :items="contactRequest.contactRequests.requests"
            :loading="loading"
            item-value="id"
            @update:options="loadContactFormRequest"
          >
            <template v-slot:item.actions="{ item }">
              <v-dialog persistent scrim="black" width="500">
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon
                    v-bind="props"
                    size="small"
                    rounded="lg"
                    color="success"
                    variant="tonal"
                    class="mr-2"
                  >
                    <v-icon>
                      <Icon icon="mdi:eye" />
                    </v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card border>
                    <v-card-title
                      class="d-flex justify-space-between align-center"
                    >
                      Contact Request
                    </v-card-title>
                    <v-btn
                      icon
                      rounded="lg"
                      height="48"
                      variant="tonal"
                      class="position-absolute right-0 rounded-t-0 rounded-be-0"
                      @click="isActive.value = false"
                    >
                      <v-icon>
                        <Icon icon="mdi:close" />
                      </v-icon>
                    </v-btn>
                    <v-divider></v-divider>
                    <v-chip rounded="0">{{ item.id }}</v-chip>
                    <v-card-text>
                      <ul class="list-style-none">
                        <li>Name: {{ item.name }}</li>
                        <li>Contact Number: {{ item.phone }}</li>
                        <li>Email Address: {{ item.email }}</li>
                      </ul>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-title class="pb-0">Message</v-card-title>
                    <v-card-text>{{ item.message }}</v-card-text>
                  </v-card>
                </template>
              </v-dialog>
              <!-- Delete Dialog -->
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
                        @click="contactRequest.remove(item.id)"
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
