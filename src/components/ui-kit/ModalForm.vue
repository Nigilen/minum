<script setup lang="ts">
import AppButton from '@/components/ui-kit/AppButton.vue';
import { useTodosStore } from '@/stores/todos';
import { useModalStore } from '@/stores/modal';
const todosStore = useTodosStore();
const modalStore = useModalStore();

defineProps<{
  task?: string;
  status?: string;
  important?: boolean;
  tag?: string;
}>();

const { todo } = todosStore;

</script>

<template>
  <form class="form" @submit.prevent>
    <textarea 
      class="form__input-field" 
      name="input-field" 
      id="input-field" 
      placeholder="some new task ..." 
      v-model="todo.task"
    >
    </textarea>

    <fieldset class="form__params params">
      <select 
        class="params__item" 
        name="param-status" 
        id="param-status" 
        v-model="todo.status"
      >
        <option value="incoming" selected>Входящие</option>
        <option value="day">День</option>
        <option value="week">Неделя</option>
      </select>
      <label class="params__item" for="param-important">
        <input 
          class="params__item-input" 
          type="checkbox" 
          name="param-important" 
          id="param-important" 
          v-model="todo.important"
        />
        Важная
      </label>
      <select 
        class="params__item" 
        name="param-tag" 
        id="param-tag" 
        v-model="todo.tag"
      >
        <option value="">без тега</option>
        <option value="work">work</option>
        <option value="self">self</option>
      </select>
    </fieldset>

    <div class="form__controls controls">
      <AppButton 
        class="controls__item" 
        @click="$emit('save', todo)" 
        :label="modalStore.editModal ? 'Сохранить' : 'Добавить'" 
      />
      <AppButton 
        class="controls__item" 
        @click="$emit('done', todo.id)" 
        :label="todo.done ? 'В работу' : 'Завершить'"
      />
      <AppButton class="controls__item" @click="$emit('remove', todo.id)" label="Удалить" />
      <AppButton class="controls__item" @click="modalStore.closeModal" label="Отмена" />
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