import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useModalStore } from './modal';
import type { IColumn } from '@/types/types';

const loadTodos = () => {
  try {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  } catch {
    return [];
  }
};

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<IColumn[]>(loadTodos()); 
  const todo = ref<IColumn>({
    id: Date.now(),
    task: '',
    status: 'incoming',
    tag: '',
    important: false,
    done: false
  });

  watch(
    todos, 
    (newTodos) => { 
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }, 
    { deep: true }
  );

  const modal = useModalStore();
  
  const filteredTodos = (status: string) => todos.value.filter(todo => todo.status === status);

  const addTodo = (task: IColumn) => {
    todos.value.push(task);
    modal.closeModal();
  };

  const editTodo = (task: IColumn) => {
    todo.value = {
      ...task,
    };
    modal.openModal(true);
  };

  const saveTodo = (task: IColumn) => {
    const index = todos.value.findIndex(t => t.id === todo.value.id);
    if (index !== -1) {
      todos.value[index] = task;
    } else {
      todos.value.push(task);
    }
    modal.closeModal();
  };

  const doneTodo = (id: number) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.value[index].done = !todos.value[index].done;
      localStorage.setItem('todos', JSON.stringify(todos.value));
    };
    if (modal.isModalOpen) modal.closeModal();
  };

  const removeTodo = (id: number) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1); // Удаляем элемент без переприсваивания
      localStorage.setItem('todos', JSON.stringify(todos.value));
    };
    if (modal.isModalOpen) modal.closeModal();
  };
  
  return { 
    todos,
    filteredTodos,
    addTodo, 
    removeTodo,
    saveTodo,
    doneTodo,
    todo,
    editTodo,
  }
})
