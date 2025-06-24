<script setup lang="ts">
import TodoColumn from '@components/TodoColumn.vue';

</script>

<template>
  <ul class="columns">
    <TodoColumn />
    <TodoColumn />
    <TodoColumn isLastCol />
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