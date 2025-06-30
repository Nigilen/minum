<script setup lang="ts">
import TodoColumn from '@/components/todo/column/TodoColumn.vue';
import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();

</script>

<template>
  <ul class="columns">
    <TodoColumn :data="todosStore.filteredTodos('day')"/>
    <TodoColumn :data="todosStore.filteredTodos('week')" />
    <TodoColumn :data="todosStore.filteredTodos('incoming')" />
  </ul>
</template>

<style scoped lang="scss">
  .columns {
    display: flex;
    justify-content: space-between;
    inline-size: 100%;
    column-gap: 54px;
    margin-block-start: 50px;
    padding: 0;
  }

</style>