<script setup lang="ts">
import TodoColumn from '@components/TodoColumn.vue';

const props = defineProps<{
  data: {
    id: number;
    task: string;
    status: string;
    done: false;
  }[];
}>();

const dataColumnIncoming = props.data.filter(item => item.status === 'incoming');
const dataColumnDay = props.data.filter(item => item.status === 'day');
const dataColumnWeek = props.data.filter(item => item.status === 'week');

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