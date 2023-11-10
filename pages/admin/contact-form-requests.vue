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
    title: "Message",
    align: "start",
    sortable: false,
    key: "message",
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
                <v-btn icon v-bind="props" color="success" variant="tonal" class="mr-2">
                  <v-icon>
                    <Icon icon="mdi:eye" />
                  </v-icon>
                </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                  Contact Request
                  <v-btn icon variant="tonal" size="40" @click="isActive.value = false">
                    <v-icon>
                      <Icon icon="mdi:close"/>
                    </v-icon>
                  </v-btn>
                </v-card-title>
              <v-divider></v-divider>
              <v-chip rounded="0">{{ item.id }}</v-chip>
              <v-card-text>
                <ul class="list-style-none">
                  <li>
                    Name: {{ item.name }}
                  </li>
                  <li>
                    Contact Number: {{ item.phone }}
                  </li>
                  <li>
                    Email Address: {{ item.email }}
                  </li>
                </ul>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-title>Message</v-card-title>
              <v-divider></v-divider>
              <v-card-text>{{ item.message }}</v-card-text>
            </v-card>
          </template>
          </v-dialog>
            <!-- Delete Dialog -->
            <v-dialog persistent scrim="black" width="500">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon color="error" variant="tonal">
                  <v-icon>
                    <Icon icon="mdi:delete" />
                  </v-icon>
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card title="Delete Blog">
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
                          @click="contactRequest.remove(item.id)"
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
