<script setup lang="ts">
// import ToDoView from '@views/ToDoView.vue';
import AppHeader from '@components/layout/AppHeader.vue';
import MobileView from '@views/MobileView.vue';
import useMobile from '@/hoocks/useMobile.ts';
import { RouterView } from 'vue-router';

const isMobile = useMobile();

</script>

<template>
  <AppHeader v-if="!isMobile" />
  <RouterView v-if="!isMobile" />
  <MobileView v-else />
</template>

<style scoped>
</style>
