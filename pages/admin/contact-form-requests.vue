<script setup>
import { Icon } from "@iconify/vue";
import { VDataTableServer } from "vuetify/labs/VDataTable";

const contactForm = useContactRequest();

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
  await contactForm.removeBulk(selected.value);
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
  await contactForm.getAllContactRequests(page, itemsPerPage, sortBy);
  pagination.value = contactForm.contactRequests.pagination;
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
          <template v-if="selected.value">
            <v-btn icon height="40" variant="tonal">
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
          :items="contactForm.contactRequests.requests"
          :loading="loading"
          item-value="id"
          @update:options="loadContactFormRequest"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon color="success" variant="tonal" class="mr-2">
              <v-icon>
                <Icon icon="mdi:eye" />
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
                <v-card title="Delete Blog">
                  <v-card-text class="mb-3">
                    Are you sure you want to delete "{{ item.title }}"? This
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
                        ></v-btn>
                        <!-- @click="blog.remove(item.id)" -->
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
