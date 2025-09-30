<script setup></script>
<template>
  <v-app>
    <v-app-bar elevation="1">
      <v-app-bar-title>Diet Foods</v-app-bar-title>
      <v-spacer />
      <!-- v-btn works with router when :to / to is used -->
      <v-btn to="/store" variant="text">Store</v-btn>
      <v-btn to="/admin" variant="text">Admin</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
