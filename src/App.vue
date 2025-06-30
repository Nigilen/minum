<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import MobileView from '@/views/MobileView.vue';
import useMobile from '@/hooks/useMobile';
import { RouterView } from 'vue-router';

const isMobile = useMobile();

</script>

<template>
  <MobileView v-if="isMobile" />
  <template v-else>
    <AppHeader  />
    <RouterView />
  </template>
</template>
