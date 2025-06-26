<script setup lang="ts">
import AppButton from '@/components/ui-kit/AppButton.vue';
import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();
const { todo, editModal } = todosStore;

</script>

<template>
  <form class="form" @submit.prevent >
    <textarea class="form__input-field" name="input-field" id="input-field" placeholder="some new task ..." v-model="todo.task"></textarea>

    <fieldset class="form__params params">
      <select class="params__item" name="param-status" id="param-status" v-model="todo.status">
        <option value="incoming" selected>Входящие</option>
        <option value="day">День</option>
        <option value="week">Неделя</option>
      </select>
      <label class="params__item" for="param-important">
        <input class="params__item-input" type="checkbox" name="param-important" id="param-important" v-model="todo.important"/>
        Важная
      </label>
      <select class="params__item" name="param-tag" id="param-tag" v-model="todo.tag">
        <option value="пусто">пусто</option>
        <option value="work">work</option>
        <option value="self">self</option>
      </select>
    </fieldset>

    <div class="form__controls controls">

      <!-- добавление задачи -> закрытие окна -> сброс формы -->
      <AppButton class="controls__item" @click="todosStore.saveTodo(todo)">
        {{ editModal ? 'Сохранить' : 'Добавить' }}
      </AppButton> 

      <!-- завершение задачи -> закрытие окна -> сброс формы -->
      <AppButton class="controls__item" @click="todosStore.doneTodo(todo.id)">
        {{ todo.done ? 'В работу' : 'Завершить' }}
      </AppButton>

      <!-- удаление задачи -> закрытие окна -> сброс формы -->
      <AppButton class="controls__item" @click="todosStore.removeTodo(todo.id)">
        Удалить
      </AppButton>

      <!-- закрытие окна -> сброс формы -->
      <AppButton class="controls__item" @click="todosStore.closeModal">
        Отмена
      </AppButton>

    </div>
  </form>
</template>


<style lang="scss" scoped>

.form {

  &__input-field {
    width: 100%;
    height: 100px;
    resize: none;
    border: none;
    font: inherit;
  
    &:focus {
      outline: none;
    }
  }
}

.params {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  border: none;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__item {
    padding-block: 10px;
  }
}

</style>