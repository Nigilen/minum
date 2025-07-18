<script setup lang="ts">
import TodoItem from '@/components/todo/item/TodoItem.vue';
import type { IColumn } from '@/types/types';

interface IColumnProps {
  title: string;
  data: IColumn[];
}

const props = withDefaults(defineProps<IColumnProps>(), {
  title: '',
  data: () => [{
    id: Date.now(),
    task: '',
    status: 'incoming',
    done: false,
    tag: '',
    important: false
  }]
});

</script>

<template>
  <div class="column">
    <h2 class="column__title">{{ title }}</h2> 
    <TransitionGroup class="column__list" name="list" tag="ul" appear>
      <TodoItem v-for="item in props.data" :key="item.id" :data="item" class="item" />
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss" src="./TodoColumn.scss"></style>
