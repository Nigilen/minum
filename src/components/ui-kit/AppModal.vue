<script setup lang="ts">
import AppButton from '@/components/ui-kit/AppButton.vue';

import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();
const { todo } = todosStore;

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
          <textarea class="modal-input" name="" id="" placeholder="some new task ..." v-model="todo.task"></textarea>
          <div class="modal-controls">
            <AppButton class="btn btn-primary" @click="todosStore.addTodo(todo.task, todo.status, todo.important, todo.done, todo.tag)">Добавить</AppButton>
            <AppButton class="btn btn-primary" @click="todosStore.saveTodo(todo)">Сохранить</AppButton>
            <label for="item__done-btn">
              <input id="item__done-btn" name="item__done-btn" class="item__done-btn" type="checkbox" v-model="todo.done"/>
              Завершить
            </label>
            <label for="item__important-btn">
              <input id="item__important-btn" name="item__important-btn" class="item__important-btn" type="checkbox" v-model="todo.important"/>
              Важная
            </label>
            <select class="tag" name="tag" id="tag" v-model="todo.tag">
              <option value="work">work</option>
              <option value="self">self</option>
            </select>
            <select class="status" name="status" id="status" v-model="todo.status">
              <option value="incoming" selected>incoming</option>
              <option value="day">day</option>
              <option value="week">week</option>
            </select>
            <AppButton class="item__done-btn">Удалить</AppButton>
            <AppButton class="btn btn-secondary" @click="todosStore.closeModal">Отмена</AppButton>
          </div>
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