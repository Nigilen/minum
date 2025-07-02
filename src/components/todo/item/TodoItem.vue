<script setup lang="ts">
import AppButton from '@/components/ui-kit/AppButton.vue';
import IconDoneBtn from '@/components/icons/IconDoneBtn.vue';
import IconCloseBtn from '@/components/icons/IconCloseBtn.vue';
import { useTodosStore } from '@/stores/todos';
import type { IColumn } from '@/types/types';

const todosStore = useTodosStore();

interface IColumnProps {
  data: IColumn;
}

const props = withDefaults(defineProps<IColumnProps>(), {
  data: () => ({
    id: Date.now(),
    task: '',
    status: 'incoming',
    done: false,
    tag: '',
    important: false
  })
});

</script>

<template>
  <li class="item" :class="{ 'item--done': props.data.done }">

    <AppButton class="item__done-btn" @click="todosStore.doneTodo(props.data.id)" ariaLabel="Завершить задачу">
      <IconDoneBtn :class="{ 'item__done-btn--important': props.data.important }" />
    </AppButton>

    <p class="item__text" @click="todosStore.editTodo(props.data)" aria-label="Редактировать задачу">
      <span class="item__tag">{{ props.data.tag }}</span>
      <span v-if="props.data.tag" class="item__divider"> | </span>
      {{ props.data.task }}
    </p>

    <AppButton class="item__remove-btn" ariaLabel="Удалить задачу">
      <IconCloseBtn @click="todosStore.removeTodo(props.data.id)" />
    </AppButton>
    
  </li>
</template>

<style scoped lang="scss" src="./TodoItem.scss"></style>
