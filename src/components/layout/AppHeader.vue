<script setup lang="ts">
import AppLogo from '@/components/ui-kit/AppLogo.vue';
import AppMenu from '@/components/ui-kit/AppMenu.vue';

</script>

<template>
  <header class="header">
    <div class="container wrapper">
      <AppLogo />
      <AppMenu />
    </div>
  </header>
</template>

<style scoped lang="scss">
  .header {
    box-shadow: 0 1px 0 0 #DADCE055;
  }
</style>