<script setup>
const sponsor = useSponsor();
const level = useLevel();
const snackbar = useSnackbar();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add Sponsor",
});

onMounted(() => {
  nextTick(async () => {
    await level.getAllLevels(1, -1);
  });
});

const form = reactive({
  image: null,
  name: "",
  priority: null,
  link: "",
  description: "",
  status: "Draft",
});

const loading = ref(false);

const addSponsor = async () => {
  loading.value = true;
  if (form.image == null)
    return snackbar.showSnackbar("Sponsor Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  await sponsor.create(formData);
};
</script>

<template>
  <v-form @submit.prevent="addSponsor">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle
            title="Add New Sponsor"
            back="/admin/sponsor"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="form.name"
            label="Sponsor's Company Name"
          ></v-text-field>
          <v-row align="center">
            <v-col cols="12" md="6" class="sm-pb-0">
              <v-select
                v-model="form.level"
                :items="level.levels"
                item-title="title"
                item-value="id"
                label="Sponsor Level"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.link"
                label="Sponsor's Website link"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
            v-model="form.description"
            label="More Info about Sponsor"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
          <LazyAdminSharedImageUpload title="Sponsor's Image" :form="form" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
