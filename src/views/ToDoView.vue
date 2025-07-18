<script setup lang="ts">
import TodoColumns from '@/components/todo/TodoColumns.vue'
import AppModal from '@/components/ui-kit/AppModal.vue'
import { useTodosStore } from '@/stores/todos'
import { useModalStore } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'
import IconAdd from '@/components/icons/IconAdd.vue';
import AppButton from '@/components/ui-kit/AppButton.vue';

// NOTE: ленивая загрузка модалки

const ModalForm = defineAsyncComponent(() => import('@/components/ui-kit/ModalForm.vue'))

const todoStore = useTodosStore()
const modalStore = useModalStore()

const { todo } = storeToRefs(todoStore)
const { modalMode } = storeToRefs(modalStore)

const { updateTodo, toggleTodoDone, deleteTodo } = todoStore

// NOTE: добавил проверку на ошибки для метода handleSave

const handleSave = async () => {
  try {
    await updateTodo(todo.value)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="wrapper container">
    <TodoColumns />
    <AppButton class="button-add" @click="modalStore.openModal('add')" ariaLabel="Добавить задачу">
      <IconAdd />
    </AppButton>
  </div>

  <AppModal v-model="modalMode">
    <ModalForm
      :id="todo.id"
      :done="todo.done"
      :todo="todo"
      v-model:task="todo.task"
      v-model:status="todo.status"
      v-model:important="todo.important"
      v-model:tag="todo.tag"
      @save="handleSave"
      @done="toggleTodoDone"
      @remove="deleteTodo"
    />
  </AppModal>
</template>


<style scoped lang="scss">
  .wrapper {
    display: flex;
    justify-content: space-between;
  }

  .button-add {
    position: fixed;
    bottom: 50px;
    right: 50px;
    text-align: center;
    padding: 20px;
    border-radius: 50%;
    border: 1px solid var(--text-color-secondary);
    opacity: 0.2;
    transition-duration: .1s;
    z-index: 9;

    &:hover {
      opacity: 1;
    }
    @media (width < 768px) {
      bottom: 20px;
      right: 20px;
    }
  }

</style>