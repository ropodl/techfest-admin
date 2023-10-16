<script setup>
const speaker = useSpeaker();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add Speaker",
});

const form = reactive({
  image: null,
  name: "",
  position: "",
  description: "",
  status: "Draft",
  visibility: "Public",
});

// Image Upload
const file = shallowRef();
const url = useObjectUrl(file);
// temporary for thumbnail
const selectSpeakerImage = ({ target }) => {
  const { value, files, name } = target;
  if (name === "image") {
    file.value = files[0];
    form.image = files[0];
    return;
  }
};

const addSpeaker = async () => {
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  speaker.create(formData);
};
</script>

<template>
  <v-container>
    <v-form @submit.prevent="addSpeaker">
      <v-row>
        <v-col cols="12">
          <LazyAdminSharedPageTitle
            title="Add New Speaker"
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
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" afterDelete="/admin/speaker" />
          <LazyAdminSharedImageUpload title="Speaker's Image" :form="form" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
