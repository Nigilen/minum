import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useTodosStore } from './todos';

export const useModalStore = defineStore('modal', () => {
  const todos = useTodosStore();

  const editModal = ref<boolean>(false);
  const isModalOpen = ref<boolean>(false);

  const openModal = (isEdit: boolean) => {
    isModalOpen.value = true;
    editModal.value = isEdit;
  };
  
  const closeModal = () => {
    isModalOpen.value = false;
    todos.todo = {
      id: Date.now(),
      task: '',
      status: 'incoming',
      tag: '',
      important: false,
      done: false
    };
  };

  return { 
    isModalOpen,
    openModal,
    closeModal,
    editModal
  }
});
