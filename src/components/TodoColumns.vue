<script setup lang="ts">
import TodoColumn from '@components/TodoColumn.vue';
import { computed, defineProps } from 'vue';

const props = defineProps<{
  data: {
    id: number;
    task: string;
    status: string;
    done: boolean;
  }[];
}>();

// NOTE: простая фильтрация массива props.data напрямую (например, props.data.filter(...)), не даст Vue остлеживать изменения в исходном массиве. При добавлении новой задачи в todosStore.todos реактивность "ломалась", потому что фильтрация создавала новый массив при каждом рендере, но не реагировала на изменения в исходных данных
// NOTE: хотя props в Vue реактивны по умолчанию, их производные значения (например, отфильтрованные списки) не обновляются автоматически, если не использовать computed
// NOTE: computed — это реактивная зависимость
// NOTE: Он кэширует результат и пересчитывает его только при изменении исходных данных (в данном случае — props.data)
// NOTE: Когда todos в хранилище обновляется → props.data меняется → computed автоматически пересчитывает отфильтрованный список → Vue перерисовывает компонент

const dataColumnIncoming = computed(() => props.data.filter(item => item.status === 'incoming')); 
const dataColumnDay = computed(() => props.data.filter(item => item.status === 'day'));
const dataColumnWeek = computed(() => props.data.filter(item => item.status === 'week'));

</script>

<template>
  <ul class="columns">
    <TodoColumn :data="dataColumnDay"/>
    <TodoColumn :data="dataColumnWeek" />
    <TodoColumn :data="dataColumnIncoming" isLastCol />
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