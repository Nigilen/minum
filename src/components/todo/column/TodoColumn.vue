<script setup lang="ts">
import TodoItem from '@/components/todo/item/TodoItem.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import AppButton from '@/components/ui-kit/AppButton.vue';
import { useModalStore } from '@/stores/modal';
import type { IColumn } from '@/types/types';

const modalStore = useModalStore();

interface IColumnProps {
  data: IColumn[];
}

const props = withDefaults(defineProps<IColumnProps>(), {
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
    <!-- FIXME: странное какое-то решение по назначению имени заголовка  -->
    <h2 class="column__title">{{ props.data[0]?.status }}</h2> 
    <TransitionGroup class="column__list" name="list" tag="ul" appear>
      <TodoItem v-for="item in props.data" :key="item.id" :data="item" class="item" />
    </TransitionGroup>
    <AppButton class="column__add-btn" @click="modalStore.openModal(false)" ariaLabel="Добавить задачу">
      <IconAdd />
    </AppButton>
  </div>
</template>

<style scoped lang="scss" src="./TodoColumns.scss"></style>
