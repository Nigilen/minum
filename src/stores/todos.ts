import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

interface ITodo {
  id: number;
  task: string;
  status: string;
  done: boolean;
}

export const useTodosStore = defineStore('todos', () => {
  const isModalOpen = ref<boolean>(false);
  const openModal = () => {
    isModalOpen.value = !isModalOpen.value;
    console.log(isModalOpen.value)
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  // NOTE: внимание на обработкe ошибок для localStorage
  const loadTodos = () => {
    try {
      return JSON.parse(localStorage.getItem('todos') || '[]');
    } catch {
      return [];
    }
  };
  const todos = ref<ITodo[]>(loadTodos()); // NOTE: заменил reactive на ref так как он лучше работает с переприсваиванием
  // ref позволяет перезаписывать значение (например, через filter).
  // reactive требует мутаций, что не всегда удобно.
  // В Pinia/Vue 3 ref — стандартный выбор для примитивов и массивов.
  watch(
    todos, 
    (newTodos) => { 
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }, 
    { deep: true }
  );

  const addTodo = (todo: ITodo) => {
    todos.value.push(todo);
  }

  const saveTodo = (todo: ITodo) => {
    const index = todos.value.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      todos.value[index] = todo;
    } else {
      todos.value.push(todo);
    }
  };

  // const removeTodo = (id: number) => {
  //   todos.value = todos.value.filter(todo => todo.id !== id);
  // };

  // NOTE: вариант 2 — мутируем массив
  // NOTE: splice решил проблему с реактивностью, а перезапись массива (filter) — нет
  // NOTE: Vue 3 (и Pinia) используют Proxy для реактивности. Когда вы объявляете реактивный массив (через ref или reactive), Vue оборачивает его в Proxy, который перехватывает операции: push, pop, splice, shift, unshift — мутирующие методы (Vue их отслеживает). Прямая перезапись (arr = newArr) — не вызывает реактивность, потому что Proxy теряется.
  // NOTE: filter возвращает новый массив, а не изменяет старый. При присваивании todos.value = ... вы заменяете реактивный Proxy новым массивом. Дочерние компоненты не узнают об этом, потому что: Они подписаны на старый Proxy (который вы только что отбросили). Новый массив не имеет связи с предыдущей реактивностью.
  // NOTE: splice изменяет исходный массив, а не создаёт новый.Vue/Pinia видят эту мутацию через Proxy и запускают обновление интерфейса. Все подписчики (компоненты, computed-свойства) получают изменения.

  const removeTodo = (id: number) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1); // Удаляем элемент без переприсваивания
      localStorage.setItem('todos', JSON.stringify(todos.value));
    }
  };
  
  return { 
    todos,
    addTodo, 
    removeTodo,
    isModalOpen,
    openModal,
    closeModal,
    saveTodo
  }
})
