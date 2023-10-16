<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: { type: String, required: true },
  form: { type: Object, required: true },
});

// Image Upload
const file = shallowRef();
const url = useObjectUrl(file);

const selectImage = ({ target }) => {
  const { value, files, name } = target;
  if (name === "image") {
    file.value = files[0];
    props.form.image = files[0];
    return;
  }
};
</script>

<template>
  <v-card class="mb-3">
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text
      class="d-flex align-center justify-center position-relative pa-0"
    >
      <template v-if="form.image !== null">
        <v-hover v-slot="{ isHovering, props }">
          <v-img cover v-bind="props" :src="url" height="200">
            <v-overlay
              contained
              :model-value="isHovering"
              content-class="w-100 h-100 d-flex align-center justify-center"
              scrim="black"
            >
              <v-btn icon color="error" @click="form.image = null">
                <Icon icon="mdi:close" />
              </v-btn>
            </v-overlay>
          </v-img>
        </v-hover>
      </template>
      <template v-else>
        <input @change="selectImage" type="file" name="image" class="py-4" />
      </template>
    </v-card-text>
  </v-card>
</template>
