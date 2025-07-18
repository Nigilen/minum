<script setup lang="ts">
import type { Component } from 'vue';

withDefaults(defineProps<{
  icon: Component;
  size?: number;
}>(), {
  size: 18,
});

</script>

<template>
  <component 
    :is="icon"
    :width="size"
    :height="size"  
  />
</template>


