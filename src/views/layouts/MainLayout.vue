<template>
  <div class="d-flex ga-5">
    <v-btn color="primary" @click="$router.push({ name: 'home' })"> Home Page </v-btn>
    <v-btn color="secondary" @click="$router.push({ name: 'about' })"> About Page </v-btn>
  </div>
  <RouterView />
</template>
