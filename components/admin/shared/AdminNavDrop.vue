<script setup>
const admin = useAdmin();

defineProps({
  routes: {
    type: Array,
  },
});

const logout = () => {
  nextTick(() => {
    admin.logout();
  });
};
</script>
<template>
  <v-menu width="200">
    <template v-slot:activator="{ props }">
      <v-btn
        rounded="0"
        variant="tonal"
        color="transparent"
        height="60"
        width="40"
        v-bind="props"
      >
        <v-avatar size="35">
          <v-img src="/image/logo.png"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item>
        <v-list-item-title>{{ admin.admin.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ admin.admin.email }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item v-for="(item, index) in routes" :to="item['to']">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item title="Sign Out" @click="logout"></v-list-item>
    </v-list>
  </v-menu>
</template>
