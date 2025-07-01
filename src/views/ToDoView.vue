<script setup lang="ts">
import TodoColumns from '@/components/todo/TodoColumns.vue';
import AppModal from '@/components/ui-kit/AppModal.vue';
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();

</script>

<template>
  <div class="wrapper container">
    <TodoColumns />
  </div>
  <AppModal v-model="modalStore.isModalOpen" />
</template>

<style scoped lang="scss">

</style>