<script setup>
const route = useRoute();
const speaker = useSpeaker();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Edit Speaker",
});

onMounted(() => {
  nextTick(() => {
    console.log(speaker);
  });
});

const form = reactive({
  image: null,
  name: "",
  position: "",
  description: "",
  status: "Draft",
});
</script>

<template>
  {{ route.params.id }}
  {{ form }}
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">Edit Speaker</div>
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="Speaker's Name" v-model="form.name"></v-text-field>
        <v-text-field
          label="Speaker's Established Position"
          v-model="form.position"
        ></v-text-field>
        <v-textarea
          label="More About Speaker"
          v-model="form.description"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="4">
        <LazyAdminSharedActions :form="form" after-delete="/admin/speaker" />
        <LazyAdminSharedImageUpload title="Speaker's Image" :form="form" />
      </v-col>
    </v-row>
  </v-container>
</template>
