<script setup lang="ts">
import TodoColumn from '@/components/todo/column/TodoColumn.vue';
import { useTodosStore } from '@/stores/todos';
import { computed } from 'vue';

const todosStore = useTodosStore();

const columnsData = computed(() => {
  return {
    day: {
      title: 'День',
      data: todosStore.filteredTodos('day')
    },
    week: {
      title: 'Неделя',
      data: todosStore.filteredTodos('week')
    },
    incoming: {
      title: 'Входящие',
      data: todosStore.filteredTodos('incoming')
    }
  }
})

</script>

<template>
  <ul class="columns">
    <TodoColumn 
      v-for="(value) in columnsData" 
      :title="value.title" 
      :data="value.data" 
      :key="value.title"
    />
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
    padding-inline: 5px;

    @media (width < 768px) {
      flex-direction: column;
      row-gap: 80px;
      align-items: center;

    }
  }
</style>
