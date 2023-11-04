<script setup>
import { Icon } from "@iconify/vue";

const route = useRoute();
const speaker = useSpeaker();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Edit Speaker",
});

const form = reactive({
  image: null,
  name: "",
  position: "",
  description: "",
  facebook: "",
  twitter: "",
  status: "Draft",
});

onMounted(() => {
  nextTick(async () => {
    const res = await speaker.getSpeaker(route.params.id);
    console.log(res);
    if (res.id) {
      form.image = res.speakerImage.url;
      form.name = res.name;
      form.position = res.position;
      form.facebook = res.facebook;
      form.twitter = res.twitter;
      form.description = res.description;
      form.status = res.status;
    }
  });
});

const updateSpeaker = () => {
  if (form.image == null)
    return snackbar.showSnackbar("Speaker Image is missing", "error");
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  speaker.updateSpeaker(formData, route.params.id);
};
</script>

<template>
  <v-form @submit.prevent="updateSpeaker">
    <v-container>
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle
            title="Edit Speaker"
            back="/admin/speaker"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            label="Speaker's Name"
            v-model="form.name"
          ></v-text-field>
          <v-text-field
            label="Speaker's Established Position"
            v-model="form.position"
          ></v-text-field>
          <v-textarea
            label="More About Speaker"
            v-model="form.description"
          ></v-textarea>
          <v-card-title>Social Links</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.facebook" label="Facebook" >
                  <template v-slot:prepend-inner>
                    <v-icon>
                      <Icon icon="fa6-brands:facebook" />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.twitter" label="Twitter">
                  <template v-slot:prepend-inner>
                    <v-icon>
                      <Icon icon="fa6-brands:twitter" />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions
            :form="form"
            after-delete="/admin/speaker"
            @remove="speaker.remove(route.params.id)"
          />
          <LazyAdminSharedImageUpload title="Speaker's Image" :form="form" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>