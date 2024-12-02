<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Navbar />
  <router-view :key="$route.path"></router-view> 
  <Footer />
</template>

<style scoped>
</style>