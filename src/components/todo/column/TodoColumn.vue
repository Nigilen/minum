<script setup lang="ts">
import TodoItem from '@/components/todo/item/TodoItem.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import AppButton from '@/components/ui-kit/AppButton.vue';
import { useModalStore } from '@/stores/modal';
import type { IColumn } from '@/types/types';

const modalStore = useModalStore();

const { openModal } = modalStore;

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
    <ul class="column__list">
      <TodoItem v-for="(item, index) in props.data" :key="index" :data="item" />
    </ul>
    <AppButton class="column__add-btn" @click="openModal(false)">
      <IconAdd />
    </AppButton>
  </div>
</template>

<style scoped lang="scss" src="./TodoColumns.scss"></style>
