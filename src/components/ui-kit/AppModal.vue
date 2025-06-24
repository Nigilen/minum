<script setup lang="ts">
import AppButton from '@/components/ui-kit/AppButton.vue';

import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();

const modelValue = defineModel<boolean>();

</script>

<template>
  <Teleport to="body">
    <!-- Обёртка для оверлея -->
    <Transition name="fade">
      <div 
        v-if="modelValue" 
        class="modal-overlay"
        @click.self="todosStore.closeModal"
      >
        <!-- Контент модалки -->
        <div class="modal-content">
          <textarea class="modal-input" name="" id="" placeholder="some new task ..."></textarea>
          <div class="modal-controls">
            <AppButton class="btn btn-primary" @click="() => console.log('save todo')">Сохранить</AppButton>
            <AppButton class="item__done-btn">Done</AppButton>
            <AppButton class="item__done-btn">Imp</AppButton>
            <select class="select" name="tag" id="tag">
              <option value="tag1">work</option>
              <option value="tag2">self</option>
            </select>
            <AppButton class="item__done-btn">Remove</AppButton>
            <AppButton class="btn btn-secondary" @click="todosStore.closeModal">Отмена</AppButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Стили для модалки */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Полупрозрачный чёрный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Выше всех элементов */
}

.modal-content {
  background-color: var(--bg-color-primary);
  padding: 16px;
  border-radius: 10px;
  max-inline-size: 600px;
  inline-size: 100%;
}

.modal-input {
  width: 100%;
  height: 100px;
  resize: none;
  border: none;
  font: inherit;

  &:focus {
    outline: none;
  }
}

.modal-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.select {
  border: none;
  font: inherit;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>