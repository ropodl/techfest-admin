<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  // single: {
  //   type: Boolean,
  //   required: true,
  //   default: true,
  // },
  form: {
    type: Object,
    required: true,
  },
  accept: {
    type: String,
    default: "image/*",
  },
});

const dropZoneRef = ref();
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

function onDrop(files) {
  if (form.file) {
    return (props.form.file = files[0]);
  }
  if (form.image) {
    return (props.form.image = files[0]);
  }
}

const { files, open, reset, onChange } = useFileDialog({
  accept: props.accept, // Set to accept only image files
});

const file = shallowRef();
const url = useObjectUrl(file);

onChange((files) => {
  if (form.file) {
    return (props.form.file = files[0]);
  }
  if (form.image) {
    return (props.form.image = files[0]);
  }
});
</script>
<template>
  <v-card class="mb-3">
    <v-card-title v-text="title"></v-card-title>
    <v-divider></v-divider>
    <v-hover v-slot="{ isHovering, props }">
      <v-card-text
        v-bind="props"
        ref="dropZoneRef"
        class="d-flex align-center justify-center text-center position-relative"
        :class="[isHovering ? 'animate' : '']"
        style="height: 200px"
        @click="open"
      >
        <template v-if="isOverDropZone">
          <v-overlay
            contained
            content-class="d-flex align-center justify-center w-100 h-100"
            :model-value="isOverDropZone"
            scrim="black"
          >
            Please drop the file, now.
          </v-overlay>
        </template>
        <div v-else>
          <div>
            <v-icon size="50">
              <Icon icon="mdi:cloud-upload" />
            </v-icon>
          </div>
          <v-card-text>Drag & Drop a file here or click.</v-card-text>
        </div>
      </v-card-text>
    </v-hover>
  </v-card>
</template>
<style lang="scss"></style>
