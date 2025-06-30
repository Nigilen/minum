<script setup lang="ts">
import TodoColumns from '@/components/todo/TodoColumns.vue';
import AppModal from '@/components/ui-kit/AppModal.vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
const modalStore = useModalStore();

const { isModalOpen } = storeToRefs(modalStore);  // NOTE: 10. при деструктуризации, свойства становятся обычными значениями. storeToRefs преобразует каждое свойство хранилища в ref, сохраняя реактивность, позволяя безопасно деструктурировать состояние без потери реактивности. Альтернатива без storeToRefs — вызов свойств без десктруктуризации (пример: todosStore.isModalOpen)

</script>

<template>
  <div class="wrapper container">
    <TodoColumns />
  </div>
  <AppModal v-model="isModalOpen" />
</template>

<style scoped lang="scss">

</style>