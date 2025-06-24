<script setup lang="ts">
// import ToDoView from '@views/ToDoView.vue';
import AppHeader from '@components/layout/AppHeader.vue';
import MobileView from '@views/MobileView.vue';
import useMobile from '@/hoocks/useMobile.ts';
import { RouterView } from 'vue-router';

const isMobile = useMobile();

</script>

<template>
  <MobileView v-if="isMobile" />
  <AppHeader v-if="!isMobile" />
  <RouterView />
  <!-- <ToDoView v-if="!isMobile" /> -->
</template>

<style scoped>
</style>
