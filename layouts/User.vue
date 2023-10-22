<script setup></script>

<template>
  <NuxtLayout name="with-page-title">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card>
            <v-tabs direction="vertical">
              <v-tab rounded="0" class="text-capitalize" to="/user/">
                Dashboard
              </v-tab>
              <v-tab rounded="0" class="text-capitalize" to="/user/profile">
                Profile
              </v-tab>
            </v-tabs>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<style lang="scss"></style>
