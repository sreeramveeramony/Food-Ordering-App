<script setup></script>

<template>
  <v-app>
    <v-app-bar flat color="surface">
      <v-app-bar-title class="font-weight-medium">Diet Foods</v-app-bar-title>
      <v-spacer />
      <v-btn to="/store" variant="text">Store</v-btn>
      <v-btn to="/admin" variant="text">Admin</v-btn>
    </v-app-bar>

    <v-main class="bg">
      <v-container class="py-8" style="max-width: 1100px">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.bg { background: linear-gradient(180deg, #f9fafb, #ffffff); }
</style>
