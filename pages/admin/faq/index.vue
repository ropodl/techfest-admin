<script setup>
import { Icon } from "@iconify/vue";

const faq = useFaq();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All FAQs",
});

const loading = ref(true);
const selected = ref([]);

const loadFaqs = async ({ page, itemsPerPage }) => {
  loading.value = true;
  await faq.getAllFaqs(page, itemsPerPage);
  loading.value = false;
};

const deleteBulk = async () => {
  loading.value = true;
  await faq.removeBulk(selected.value);
  selected.value = [];
  loading.value = false;
};
</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="6" md="6">
        <div class="text-h4 font-weight-bold">All FAQs</div>
      </v-col>
      <v-col cols="6" md="6">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn
              icon
              rounded="lg"
              variant="tonal"
              class="mr-3"
              :loading="loading"
              @click="deleteBulk"
            >
              <v-icon>
                <Icon icon="mdi:bin-outline" />
              </v-icon>
            </v-btn>
          </template>
          <v-btn
            height="48"
            rounded="lg"
            variant="tonal"
            class="text-capitalize"
            to="/admin/faq/create"
          >
            <v-icon start><Icon icon="mdi:plus" /></v-icon>
            Add new FAQ
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
            v-model:items-per-page="faq.pagination.itemsPerPage"
            :headers="faq.headers"
            :items="faq.faqs"
            :loading="false"
            :items-length="faq.pagination.totalItems"
            item-value="id"
            @update:options="loadFaqs"
          >
            <template v-slot:item.title="{ item }">
              <v-list lines="three" width="300">
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.content
                  }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                rounded="lg"
                height="48"
                color="success"
                variant="tonal"
                class="mr-2"
                :to="`/admin/faq/${item.id}`"
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
                      Are you sure you want to delete "{{ item.title }}"? This
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
                        @click="faq.remove(item.id)"
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
