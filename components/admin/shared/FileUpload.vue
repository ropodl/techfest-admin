<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  single: {
    type: Boolean,
    required: true,
    default: true,
  },
  model: {
    type: null,
    required: true,
  },
  type: {
    type: String,
  },
});

const dropZoneRef = ref();
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

function onDrop(files) {
  console.log("onDrop");
  console.log(files);
  // called when files are dropped on zone
}

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*", // Set to accept only image files
});

const file = shallowRef();
const url = useObjectUrl(file);

onChange((files) => {
  console.log(props.single);
  if (props.single)
    return {
      // props.model =
    };
});
</script>
<template>
  {{ single }}{{ url }}{{ typeof model }}
  <v-card class="mb-3">
    <v-card-title>{{ title }}</v-card-title>
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
        <div>
          <div>
            <v-icon size="50">
              <Icon icon="mdi:cloud-upload" />
            </v-icon>
          </div>
          <v-card-text> Drag & Drop a file here or click </v-card-text>
        </div>
        <v-overlay
          contained
          content-class="d-flex align-center justify-center w-100 h-100"
          :model-value="isOverDropZone"
          scrim="black"
        >
          {{ title }}
        </v-overlay>
      </v-card-text>
    </v-hover>
  </v-card>
</template>
<style lang="scss"></style>
