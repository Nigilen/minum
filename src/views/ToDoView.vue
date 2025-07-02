<script setup lang="ts">
import TodoColumns from '@/components/todo/TodoColumns.vue';
import AppModal from '@/components/ui-kit/AppModal.vue';
import ModalForm from '@/components/ui-kit/ModalForm.vue';
import { useTodosStore } from '@/stores/todos';
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

const todoStore = useTodosStore();

const { todo } = storeToRefs(todoStore);
const modalStore = useModalStore();

</script>

<template>
  <div class="wrapper container">
    <TodoColumns />
  </div>
  <AppModal v-model="modalStore.isModalOpen" >
    <ModalForm 
      @save="todoStore.saveTodo"
      @done="todoStore.doneTodo"
      @remove="todoStore.removeTodo"

      :id="todo.id"
      :done="todo.done"
      :todo="todo"
      
      v-model:task="todo.task"
      v-model:status="todo.status"
      v-model:important="todo.important"
      v-model:tag="todo.tag"
    />
  </AppModal>
</template>

<style scoped lang="scss">

</style>