import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useModalStore } from './modal'
import type { IColumn } from '@/types/types'

const loadTodos = () => {
  try {
    return JSON.parse(localStorage.getItem('todos') || '[]')
  } catch {
    return []
  }
};

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<IColumn[]>(loadTodos())
  const todo = ref<IColumn>({
    id: Date.now(),
    task: '',
    status: 'incoming',
    tag: '',
    important: false,
    done: false,
  });

  watch(
    todos,
    (newTodos) => {
      localStorage.setItem('todos', JSON.stringify(newTodos))
    },
    { deep: true },
  )

  const modal = useModalStore();

  const sortedTodos = computed(() => 
    [...todos.value].sort((a, b) => Number(a.done) - Number(b.done))
  );

  const filteredTodos = (status: string) => sortedTodos.value.filter((todo) => todo.status === status)

  const addTodo = (task: IColumn) => {
    todos.value.push(task)
    if (modal.isOpen) {
      modal.closeModal()
      resetTodo()
    }
  }

  const editTodo = (task: IColumn) => {
    todo.value = {
      ...task,
    }
    modal.openModal('edit')
  }

  const updateTodo = (task: IColumn) => {
    const index = todos.value.findIndex((t) => t.id === todo.value.id)
    if (index !== -1) {
      todos.value[index] = task
    } else {
      todos.value.push(task)
    }
    if (modal.isOpen) {
      modal.closeModal()
      resetTodo()
    }
  };

  const toggleTodoDone = (id: number) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value[index].done = !todos.value[index].done
      localStorage.setItem('todos', JSON.stringify(todos.value))
    }
    if (modal.isOpen) {
      modal.closeModal()
      resetTodo()
    }
  };

  const deleteTodo = (id: number) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1) // Удаляем элемент без переприсваивания
      localStorage.setItem('todos', JSON.stringify(todos.value))
    }
    if (modal.isOpen) {
      modal.closeModal()
      resetTodo()
    }
  };

  const resetTodo = () => {
    todo.value = {
      id: Date.now(),
      task: '',
      status: 'incoming',
      tag: '',
      important: false,
      done: false,
    }
  };

  return {
    todos,
    filteredTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodoDone,
    todo,
    editTodo,
    resetTodo
  };
});
