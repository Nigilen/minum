<script setup lang="ts">

defineProps<{
  label?: string;
}>();

</script>



<template>
  <button class="button">
    {{ label }}
    <slot />
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