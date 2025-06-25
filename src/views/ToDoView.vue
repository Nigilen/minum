<script setup lang="ts">
import TodoColumns from '@/components/TodoColumns.vue';
import AppModal from '@/components/ui-kit/AppModal.vue';
import { storeToRefs } from 'pinia';

import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();

const { todos } = todosStore;
const { isModalOpen } = storeToRefs(todosStore); 
// NOTE: Без storeToRefs при деструктуризации const { isModalOpen } = todosStore теряется реактивность. Pinia автоматически оборачивает состояния в reactive, но при деструктуризации свойства становятся обычными значениями. 
// NOTE: storeToRefs: Преобразует каждое свойство хранилища в ref, сохраняя реактивность. Позволяет безопасно деструктурировать состояние без потери реактивности.
// NOTE: Когда использовать storeToRefs: Для состояний (ref/reactive), которые нужно деструктурировать.
// NOTE: Альтернатива без storeToRefs: 
// const todosStore = useTodosStore();
// <div v-if="todosStore.isModalOpen">...</div>
// Правила Pinia
// Плохо (теряет реактивность):
// const { isModalOpen } = useTodosStore();
// Хорошо:
//const { isModalOpen } = storeToRefs(useTodosStore());

</script>

<template>
  <div class="wrapper container">
    <TodoColumns :data="todos"/>
  </div>
  <AppModal v-model="isModalOpen" />
</template>

<style scoped lang="scss">

</style>