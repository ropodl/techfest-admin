<script setup>
import { VDataTableServer } from "vuetify/labs/VDataTable";

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
    sortable: false,
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
    title: "Description",
    align: "start",
    sortable: false,
    key: "desc",
  },
];

const requests = [
  {
    name: "Saroj Poudel",
    phone: "9849808471",
    email: "sarox14@gmail.com",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, assumenda. Doloremque porro architecto soluta voluptates delectus reiciendis provident, molestias recusandae animi libero fuga? Aut illo officiis exercitationem possimus necessitatibus nobis nemo reiciendis quo magnam quibusdam officia alias vitae minus fuga, ad debitis rem, natus laborum! Ducimus nulla amet, magni mollitia dolor excepturi recusandae, eaque vel nisi culpa ab voluptatum ut? Quos quaerat repellat, veniam exercitationem odio ad vero. Ut laborum natus quidem facilis, atque porro ratione hic neque necessitatibus at harum sint ipsum aliquid, repudiandae eveniet illo incidunt? Enim facere molestiae omnis laudantium illo laboriosam quae nostrum repudiandae harum nisi!",
  },
];
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <div class="text-h4 font-weight-bold">Contact Form Requests</div>
      </v-col>
      <v-col cols="12">
        <v-data-table-server
          :headers="headers"
          :items="requests"
          :items-length="10"
        >
          <template v-slot:item.desc="{ item }">
            <v-list lines="three" width="300">
              <v-list-item class="pa-0">
                <v-list-item-subtitle>{{ item.desc }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>
