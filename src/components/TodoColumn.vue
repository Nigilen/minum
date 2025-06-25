<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import AppButton from '@/components/ui-kit/AppButton.vue';

import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();

const { openModal } = todosStore;


const props = defineProps<{
  isLastCol?: boolean;
  data?: {
    id: number,
    task: string,
    status: string,
    done: boolean
  }[];
}>();

// const mockTodo = {
//   id: 1,
//   task: 'Learn Vue',
//   status: 'day',
//   done: false
// };

</script>

<template>
  <div class="column">
    <h2 class="column__title">{{ props.data[0]?.status }}</h2>
    <ul class="column__list">
      <TodoItem v-for="(item, index) in props.data" :key="index" :data="item" />
    </ul>
    <AppButton v-if="props.isLastCol" class="column__add-btn" @click="openModal">
      <IconAdd />
    </AppButton>
  </div>
</template>

<style scoped lang="scss">
  .column {
    display: flex;
    flex-direction: column;
    inline-size: 100%;
    max-inline-size: 500px;

    &__title {
      font-size: var(--text-size-secondary);
      font-weight: 600;
      text-transform: uppercase;
      margin-block-end: 40px;
    }
  
    &__list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-block-end: 20px;
    }

    &__add-btn {
      text-align: center;
      padding-block: 5px;
      border-radius: 3px;
      border: 1px solid var(--text-color-secondary);
      opacity: 0.2;
      transition-duration: .1s;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
