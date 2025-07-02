<script setup lang="ts">

defineProps<{
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}>();

</script>

<template>
  <button 
    class="button"
    :disabled="disabled"
    :type="type || 'button'"
    :ariaLabel="ariaLabel" 
  >
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

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
</style>