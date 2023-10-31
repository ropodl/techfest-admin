<template>
  <v-main>
    <LazyLayoutNavbar />
    <div v-auto-animate>
      <slot />
    </div>
    <LazyLayoutFooter />
  </v-main>
</template>
