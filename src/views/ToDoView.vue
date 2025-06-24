<script setup lang="ts">
import TodoColumns from '@components/TodoColumns.vue';
import data from '@/utils/data.json';

</script>

<template>
  <div class="wrapper container">
    <TodoColumns :data="data"/>
  </div>
</template>

<style scoped lang="scss">

</style>