<script setup>
const route = useRoute();
const level = useLevel();
const sponsor = useSponsor();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Edit Sponsor",
});

onMounted(() => {
  nextTick(async () => {
    await level.getAllLevels(1, -1);
    const res = await sponsor.getSponsor(route.params.id);
    form.image = res.sponsorImage.url;
    form.name = res.name;
    form.level = res.level;
    form.link = res.link;
    form.description = res.description;
    form.status = res.status;
    console.log(res);
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

const updateSponsor = async () => {
  if (form.image == null)
    return snackbar.showSnackbar("Sponsor Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  sponsor.updateSponsor(formData, route.params.id);
};
</script>

<template>
  <v-form @submit.prevent="updateSponsor">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle
            title="Edit Sponsor"
            back="/admin/sponsor"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="form.name"
            label="Sponsor's Company Name"
          ></v-text-field>
          <v-row>
            <v-col cols="12" md="6">
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
