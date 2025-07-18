import { defineStore } from 'pinia';
import { onUnmounted, ref } from 'vue';
import { computed } from 'vue';

type ModalMode = 'add' | 'edit' | null;

export const useModalStore = defineStore('modal', () => {
  const modalMode = ref<ModalMode>(null);

  const isOpen = computed(() => modalMode.value !== null);
  const isAddMode = computed(() => modalMode.value === 'add');
  const isEditMode = computed(() => modalMode.value === 'edit');

  const closeModalEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  };

  const openModal = (mode: ModalMode) => {
    if (mode === null) return;

    modalMode.value = mode;
    window.addEventListener('keydown', closeModalEscape);
  };


  const closeModal = () => {
    if (isOpen.value === null) return;

    modalMode.value = null;
    window.removeEventListener('keydown', closeModalEscape);
  };
  
  onUnmounted(closeModal);

  return { 
    openModal,
    closeModal,
    modalMode,
    isOpen,
    isAddMode,
    isEditMode
  }
});
