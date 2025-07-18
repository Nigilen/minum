<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import { useTodosStore } from '@/stores/todos';


const modalStore = useModalStore();
const todosStore = useTodosStore();

const handleCloseModal = () => {
  todosStore.resetTodo();
  modalStore.closeModal();
};
// NOTE: добавлены ARIA-атрибуты
// NOTE: закрытие по escape (в хранилище)
// NOTE: глобальное управление z-index можно добавить - интересно
// NOTE: добавил фокусировку на поле ввода при открытии окна (в ModalForm.vue)
// NOTE: открытие окна можно вынести в отдельную composable функцию, но еще дойду это этого



</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="modalStore.isOpen" 
        class="modal-overlay"
        @click.self="handleCloseModal"
      >
        <div 
          class="modal-content"
          role="dialog"
          aria-modal="true"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>

.modal-overlay {
  --modal-max-width: 600px;
  --modal-overlay-bg: rgba(0, 0, 0, 0.5);
  --modal-content-padding: 1rem;
  --modal-content-radius: 0.625rem;
  --modal-content-bg: var(--bg-color-primary);

  position: fixed;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  background: var(--modal-overlay-bg);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding-inline: 10px;
}

.modal-content {
  max-inline-size: var(--modal-max-width);
  background: var(--modal-content-bg);
  padding: var(--modal-content-padding);
  border-radius: var(--modal-content-radius);
  inline-size: 100%;
  transition: transform 0.3s ease;
}

.modal-fade-enter-active, 
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, 
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .modal-content {
  transform: translateY(-20px);
}

.modal-fade-leave-to .modal-content {
  transform: translateY(20px);
}

</style>