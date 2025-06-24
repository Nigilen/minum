<script setup lang="ts">


</script>

<template>
  <button class="button">
    <slot/>
  </button>
</template>

<style scoped lang="scss">

  .button {
    background-color: var(--bg-color-primary);
    display: flex;
    color: inherit;
    border: none;
    cursor: pointer;
    padding: 0;
    align-items: center;
    justify-content: center;
  }

</style>