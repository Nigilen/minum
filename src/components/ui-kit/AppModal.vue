<script setup lang="ts">
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();

</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="modalStore.isModalOpen" 
        class="modal-overlay"
        @click.self="modalStore.closeModal"
      >
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--bg-color-primary);
  padding: 16px;
  border-radius: 10px;
  max-inline-size: 600px;
  inline-size: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>